import React from 'react';
import type { AttributeDefinition, EntityRecord } from '../../api/types';
import type { AttributeFilterClause } from '../../store/use-metadata-ui-store';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  SlidersHorizontal,
  ChevronDown,
  ChevronRight,
  RotateCcw,
  Sparkles,
  Tag,
  Layers,
  ToggleLeft,
  Globe2,
  CheckCircle2,
} from 'lucide-react';

interface FacetedSearchSidebarProps {
  attributes: AttributeDefinition[];
  records: EntityRecord[];
  activeFilters: AttributeFilterClause[];
  onFilterChange: (filters: AttributeFilterClause[]) => void;
  className?: string;
}

interface FacetGroup {
  field: string;
  name: string;
  dataType: string;
  buckets: Array<{
    value: string;
    label: string;
    count: number;
  }>;
}

export const FacetedSearchSidebar: React.FC<FacetedSearchSidebarProps> = ({
  attributes,
  records,
  activeFilters,
  onFilterChange,
  className = '',
}) => {
  const [collapsedGroups, setCollapsedGroups] = React.useState<Record<string, boolean>>({});

  const toggleGroupCollapse = (field: string) => {
    setCollapsedGroups((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  // Discover categorical & selectable attributes to compute distribution facets
  const facetGroups: FacetGroup[] = React.useMemo(() => {
    const categoricalAttrs = attributes.filter(
      (a) =>
        !a.isArchived &&
        (a.dataType === 'BOOLEAN' ||
          a.uiComponent === 'select' ||
          a.uiComponent === 'multiselect' ||
          a.uiComponent === 'switch' ||
          Boolean((a.options?.choices as string[])?.length))
    );

    const groups: FacetGroup[] = [];

    // 1. Region / Tenant facet (Enterprise Multi-Region Distribution)
    const tenantCounts: Record<string, number> = {};
    records.forEach((r) => {
      if (r.tenantId) {
        tenantCounts[r.tenantId] = (tenantCounts[r.tenantId] || 0) + 1;
      }
    });

    if (Object.keys(tenantCounts).length > 1) {
      groups.push({
        field: 'tenantId',
        name: 'Deployment Region / Tenant',
        dataType: 'STRING',
        buckets: Object.entries(tenantCounts)
          .map(([val, count]) => ({
            value: val,
            label: val.startsWith('tenant-') ? val.replace('tenant-', '').toUpperCase() : val,
            count,
          }))
          .sort((a, b) => b.count - a.count),
      });
    }

    // 2. Attribute-level facets
    categoricalAttrs.forEach((attr) => {
      const counts: Record<string, number> = {};
      const predefinedChoices = (attr.options?.choices as string[]) || [];

      // Initialize choices with 0 counts
      predefinedChoices.forEach((c) => {
        counts[String(c)] = 0;
      });

      records.forEach((r) => {
        const val = r.attributes?.[attr.systemName];
        if (val !== undefined && val !== null && val !== '') {
          const strVal = String(val);
          counts[strVal] = (counts[strVal] || 0) + 1;
        }
      });

      const buckets = Object.entries(counts)
        .map(([val, count]) => {
          let label = val;
          if (attr.dataType === 'BOOLEAN') {
            const isTrue = val === 'true' || val === '1';
            label = isTrue
              ? (attr.options?.trueLabel as string) || 'Yes / Enabled'
              : (attr.options?.falseLabel as string) || 'No / Disabled';
          }

          return {
            value: val,
            label,
            count,
          };
        })
        .filter((b) => b.count > 0 || predefinedChoices.includes(b.value))
        .sort((a, b) => b.count - a.count);

      if (buckets.length > 0) {
        groups.push({
          field: attr.systemName,
          name: attr.name,
          dataType: attr.dataType,
          buckets,
        });
      }
    });

    return groups;
  }, [attributes, records]);

  // Handle checking/unchecking a facet bucket
  const handleToggleFacet = (field: string, value: string) => {
    // Check if this exact filter already exists
    const existingIndex = activeFilters.findIndex(
      (f) => f.field === field && f.operator === 'eq' && f.value === value
    );

    if (existingIndex >= 0) {
      // Uncheck
      const updated = activeFilters.filter((_, idx) => idx !== existingIndex);
      onFilterChange(updated);
    } else {
      // Check
      const newFilter: AttributeFilterClause = {
        id: `facet-${field}-${value}-${Date.now()}`,
        field,
        operator: 'eq',
        value,
      };
      onFilterChange([...activeFilters, newFilter]);
    }
  };

  const handleResetFacets = () => {
    onFilterChange([]);
  };

  const activeFacetCount = activeFilters.length;

  return (
    <aside
      className={`w-64 shrink-0 rounded-2xl bg-white/45 dark:bg-slate-900/45 backdrop-blur-xl border border-white/30 dark:border-white/10 shadow-lg shadow-black/5 dark:shadow-black/25 flex flex-col overflow-hidden transition-all ${className}`}
    >
      {/* Header */}
      <div className="p-3.5 border-b border-white/20 dark:border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-md bg-primary/10 flex items-center justify-center text-primary">
            <SlidersHorizontal className="h-3.5 w-3.5" />
          </div>
          <span className="text-xs font-semibold uppercase tracking-wider text-foreground">
            Faceted Filter
          </span>
          {activeFacetCount > 0 && (
            <Badge variant="default" className="text-[10px] px-1.5 py-0 h-4">
              {activeFacetCount}
            </Badge>
          )}
        </div>

        {activeFacetCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleResetFacets}
            className="h-6 px-1.5 text-[11px] text-muted-foreground hover:text-destructive flex items-center gap-1"
            title="Reset facets"
          >
            <RotateCcw className="h-3 w-3" />
            <span>Reset</span>
          </Button>
        )}
      </div>

      {/* Facet Groups Accordions */}
      <div className="p-3 space-y-4 overflow-y-auto max-h-[calc(100vh-280px)] divide-y divide-white/10 dark:divide-white/5">
        {facetGroups.map((group, gIdx) => {
          const isCollapsed = Boolean(collapsedGroups[group.field]);
          const groupActiveFilters = activeFilters.filter((f) => f.field === group.field);

          return (
            <div key={group.field} className={gIdx > 0 ? 'pt-3.5' : ''}>
              {/* Group Title */}
              <button
                type="button"
                onClick={() => toggleGroupCollapse(group.field)}
                className="w-full flex items-center justify-between text-left group py-1 text-xs font-semibold text-foreground/90 hover:text-primary transition-colors"
              >
                <div className="flex items-center gap-1.5 truncate">
                  {group.field === 'tenantId' ? (
                    <Globe2 className="h-3.5 w-3.5 text-sky-500 shrink-0" />
                  ) : group.dataType === 'BOOLEAN' ? (
                    <ToggleLeft className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                  ) : group.dataType === 'RELATION' ? (
                    <Layers className="h-3.5 w-3.5 text-violet-500 shrink-0" />
                  ) : (
                    <Tag className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                  )}
                  <span className="truncate">{group.name}</span>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  {groupActiveFilters.length > 0 && (
                    <span className="h-2 w-2 rounded-full bg-primary" />
                  )}
                  {isCollapsed ? (
                    <ChevronRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-foreground" />
                  ) : (
                    <ChevronDown className="h-3.5 w-3.5 text-muted-foreground group-hover:text-foreground" />
                  )}
                </div>
              </button>

              {/* Bucket Choices */}
              {!isCollapsed && (
                <div className="mt-2 space-y-1.5 pl-1">
                  {group.buckets.map((bucket) => {
                    const isChecked = activeFilters.some(
                      (f) =>
                        f.field === group.field &&
                        f.operator === 'eq' &&
                        f.value === bucket.value
                    );

                    return (
                      <label
                        key={bucket.value}
                        onClick={() => handleToggleFacet(group.field, bucket.value)}
                        className={`flex items-center justify-between text-xs px-2 py-1.5 rounded-lg cursor-pointer transition-all select-none ${
                          isChecked
                            ? 'bg-primary/15 text-primary font-medium border border-primary/20'
                            : 'hover:bg-white/40 dark:hover:bg-white/5 text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          <Checkbox
                            checked={isChecked}
                            onCheckedChange={() => handleToggleFacet(group.field, bucket.value)}
                            className="h-3.5 w-3.5 pointer-events-none"
                          />
                          <span className="truncate">{bucket.label}</span>
                        </div>

                        <span
                          className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full ${
                            isChecked
                              ? 'bg-primary text-primary-foreground font-semibold'
                              : 'bg-muted/80 text-muted-foreground'
                          }`}
                        >
                          {bucket.count}
                        </span>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}

        {facetGroups.length === 0 && (
          <div className="text-center py-8 text-muted-foreground text-xs space-y-2">
            <Sparkles className="h-4 w-4 mx-auto opacity-40" />
            <p>No categorical facets detected for this model.</p>
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="p-3 border-t border-white/20 dark:border-white/10 text-[10px] text-muted-foreground/80 flex items-center justify-between bg-white/20 dark:bg-black/10">
        <span>PostgreSQL GIN Indexed</span>
        <CheckCircle2 className="h-3 w-3 text-emerald-500" />
      </div>
    </aside>
  );
};
