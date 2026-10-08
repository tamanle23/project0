import React from 'react';
import { cn } from '@/lib/utils';
import type { AttributeDefinition } from '../../api/types';
import type { AttributeFilterClause } from '../../store/use-metadata-ui-store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Filter,
  Plus,
  Trash2,
  Sparkles,
  Layers,
} from 'lucide-react';

interface AdvancedFilterPopoverProps {
  attributes: AttributeDefinition[];
  filters: AttributeFilterClause[];
  onChange: (filters: AttributeFilterClause[]) => void;
  /**
   * Optional callback when user clicks a facet in faceted search views.
   * Allows bidirectional sync between Faceted Search sidebars and Filter Popover.
   */
  onFacetSelect?: (field: string, value: string) => void;
}

const OPERATOR_LABELS: Record<string, string> = {
  eq: 'equals (=)',
  ne: 'not equals (≠)',
  contains: 'contains',
  gt: 'greater than (>)',
  gte: 'greater or equal (≥)',
  lt: 'less than (<)',
  lte: 'less or equal (≤)',
  in: 'in list (comma separated)',
};

export const AdvancedFilterPopover: React.FC<AdvancedFilterPopoverProps> = ({
  attributes,
  filters,
  onChange,
}) => {
  const [open, setOpen] = React.useState(false);
  // Staged / Draft state so changes are only applied when user clicks "Apply"
  const [draftRules, setDraftRules] = React.useState<AttributeFilterClause[]>(filters);

  // Sync draft rules whenever popover opens or parent filters change externally
  React.useEffect(() => {
    if (open) {
      setDraftRules(filters);
    }
  }, [open, filters]);

  // Active, non-archived attributes available for filtering
  const filterableAttributes = React.useMemo(() => {
    return attributes.filter((a) => !a.isArchived);
  }, [attributes]);

  const handleAddRule = () => {
    if (filterableAttributes.length === 0) return;
    const defaultAttr = filterableAttributes[0];
    const newRule: AttributeFilterClause = {
      id: `filter-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      field: defaultAttr.systemName,
      operator: 'eq',
      value: '',
    };
    setDraftRules((prev) => [...prev, newRule]);
  };

  const handleUpdateRule = (id: string, updates: Partial<AttributeFilterClause>) => {
    setDraftRules((prev) =>
      prev.map((rule) => {
        if (rule.id !== id) return rule;
        const updated = { ...rule, ...updates };

        // If field changed, adapt operator if current is invalid
        if (updates.field && updates.field !== rule.field) {
          const attr = filterableAttributes.find((a) => a.systemName === updates.field);
          const dataType = attr?.dataType?.toLowerCase() || 'string';
          if (dataType === 'boolean') {
            updated.operator = 'eq';
            updated.value = 'true';
          } else if (dataType === 'number' || dataType === 'decimal' || dataType === 'integer') {
            if (['contains', 'in'].includes(updated.operator)) {
              updated.operator = 'eq';
            }
          }
        }

        return updated;
      })
    );
  };

  const handleRemoveRule = (id: string) => {
    setDraftRules((prev) => prev.filter((rule) => rule.id !== id));
  };

  const handleClearAll = () => {
    setDraftRules([]);
    onChange([]);
    setOpen(false);
  };

  const handleApply = () => {
    // Filter out completely empty rules before applying
    const validRules = draftRules.filter(
      (r) => r.field && r.value !== undefined && r.value !== ''
    );
    onChange(validRules);
    setOpen(false);
  };

  const activeCount = filters.length;
  const draftCount = draftRules.filter((r) => r.field && r.value !== undefined && r.value !== '').length;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={activeCount > 0 ? 'default' : 'outline'}
          size="sm"
          className={cn(
            'h-9 gap-1.5 text-xs transition-all relative font-medium',
            activeCount > 0
              ? 'bg-primary text-primary-foreground shadow-md shadow-primary/25 hover:bg-primary/90'
              : 'bg-white/40 dark:bg-white/5 border-white/20 text-muted-foreground hover:text-foreground'
          )}
        >
          <Filter className="h-3.5 w-3.5" />
          <span>Filters</span>
          {activeCount > 0 && (
            <span className="ml-1 px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-white text-primary dark:bg-slate-900 dark:text-primary leading-none shadow-xs">
              {activeCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        sideOffset={6}
        className="w-[94vw] sm:w-[620px] max-h-[85vh] overflow-y-auto p-4 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-white/30 dark:border-white/10 shadow-2xl space-y-4"
      >
        <div className="flex items-center justify-between border-b border-border/50 pb-3">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <Layers className="h-4 w-4" />
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">
                Advanced Compound Filter
              </h4>
              <p className="text-[11px] text-muted-foreground">
                Faceted JSONB criteria matched server-side via PostgreSQL GIN indexes
              </p>
            </div>
          </div>

          {activeCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearAll}
              className="h-7 px-2 text-xs text-muted-foreground hover:text-destructive transition-colors"
            >
              Clear all
            </Button>
          )}
        </div>

        {/* Rule Rows */}
        <div className="space-y-3">
          {draftRules.length === 0 ? (
            <div className="text-center py-6 border border-dashed border-border/60 rounded-xl space-y-2 bg-muted/20">
              <Sparkles className="h-5 w-5 text-muted-foreground mx-auto opacity-40" />
              <p className="text-xs text-muted-foreground">
                No filter conditions yet. Add rules and click Apply to run filtering.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={handleAddRule}
                disabled={filterableAttributes.length === 0}
                className="h-8 text-xs gap-1.5 bg-white/50 dark:bg-white/5 border-white/20"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Add first filter</span>
              </Button>
            </div>
          ) : (
            draftRules.map((rule) => {
              const currentAttr = filterableAttributes.find(
                (a) => a.systemName === rule.field
              );
              const dataType = currentAttr?.dataType?.toLowerCase() || 'string';
              const choices = currentAttr?.options?.choices as string[] | undefined;

              return (
                <div
                  key={rule.id}
                  className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 p-2.5 rounded-xl bg-slate-500/5 border border-border/40 hover:border-primary/30 transition-colors min-w-0"
                >
                  {/* Field Selector */}
                  <div className="w-full sm:w-[170px] sm:min-w-[170px] shrink-0 min-w-0">
                    <Select
                      value={rule.field}
                      onValueChange={(val) => handleUpdateRule(rule.id, { field: val })}
                    >
                      <SelectTrigger className="w-full h-8 text-xs bg-white/70 dark:bg-white/5 truncate">
                        <SelectValue placeholder="Field" />
                      </SelectTrigger>
                      <SelectContent className="max-h-56">
                        {filterableAttributes.map((attr) => (
                          <SelectItem
                            key={attr.systemName}
                            value={attr.systemName}
                            className="text-xs"
                          >
                            <div className="flex items-center justify-between gap-1.5 w-full min-w-0">
                              <span className="font-medium truncate">{attr.name}</span>
                              <span className="text-[10px] text-muted-foreground opacity-70 shrink-0 font-mono">
                                ({attr.dataType?.toLowerCase()})
                              </span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Operator Selector */}
                  <div className="w-full sm:w-[140px] sm:min-w-[140px] shrink-0 min-w-0">
                    <Select
                      value={rule.operator}
                      onValueChange={(val: any) => handleUpdateRule(rule.id, { operator: val })}
                    >
                      <SelectTrigger className="w-full h-8 text-xs bg-white/70 dark:bg-white/5 truncate">
                        <SelectValue placeholder="Operator" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="eq" className="text-xs">{OPERATOR_LABELS.eq}</SelectItem>
                        <SelectItem value="ne" className="text-xs">{OPERATOR_LABELS.ne}</SelectItem>
                        {dataType !== 'boolean' && dataType !== 'number' && (
                          <SelectItem value="contains" className="text-xs">{OPERATOR_LABELS.contains}</SelectItem>
                        )}
                        {(dataType === 'number' || dataType === 'decimal' || dataType === 'integer') && (
                          <>
                            <SelectItem value="gt" className="text-xs">{OPERATOR_LABELS.gt}</SelectItem>
                            <SelectItem value="gte" className="text-xs">{OPERATOR_LABELS.gte}</SelectItem>
                            <SelectItem value="lt" className="text-xs">{OPERATOR_LABELS.lt}</SelectItem>
                            <SelectItem value="lte" className="text-xs">{OPERATOR_LABELS.lte}</SelectItem>
                          </>
                        )}
                        {dataType !== 'boolean' && (
                          <SelectItem value="in" className="text-xs">{OPERATOR_LABELS.in}</SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Value Input */}
                  <div className="w-full sm:flex-1 min-w-0">
                    {dataType === 'boolean' ? (
                      <Select
                        value={rule.value || 'true'}
                        onValueChange={(val) => handleUpdateRule(rule.id, { value: val })}
                      >
                        <SelectTrigger className="w-full h-8 text-xs bg-white/70 dark:bg-white/5">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="true" className="text-xs">True</SelectItem>
                          <SelectItem value="false" className="text-xs">False</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : choices && choices.length > 0 && rule.operator !== 'in' ? (
                      <Select
                        value={rule.value}
                        onValueChange={(val) => handleUpdateRule(rule.id, { value: val })}
                      >
                        <SelectTrigger className="w-full h-8 text-xs bg-white/70 dark:bg-white/5 truncate">
                          <SelectValue placeholder="Select choice..." />
                        </SelectTrigger>
                        <SelectContent>
                          {choices.map((c) => (
                            <SelectItem key={c} value={c} className="text-xs">
                              {c}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <Input
                        type={dataType === 'number' || dataType === 'integer' || dataType === 'decimal' ? 'number' : 'text'}
                        value={rule.value}
                        onChange={(e) => handleUpdateRule(rule.id, { value: e.target.value })}
                        placeholder={
                          rule.operator === 'in'
                            ? 'e.g. VIP, Early-Adopter'
                            : 'Enter value...'
                        }
                        className="w-full h-8 text-xs bg-white/70 dark:bg-white/5 min-w-0"
                      />
                    )}
                  </div>

                  {/* Remove Rule Button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveRule(rule.id)}
                    className="h-8 w-8 p-0 shrink-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors self-end sm:self-center"
                    title="Remove condition"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          <Button
            variant="outline"
            size="sm"
            onClick={handleAddRule}
            disabled={filterableAttributes.length === 0}
            className="h-8 text-xs gap-1.5 bg-white/50 dark:bg-white/5 border-white/20"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Add condition</span>
          </Button>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setOpen(false)}
              className="h-8 text-xs"
            >
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={handleApply}
              className="h-8 text-xs px-4 shadow-sm"
            >
              Apply Filter {draftCount > 0 ? `(${draftCount})` : ''}
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
