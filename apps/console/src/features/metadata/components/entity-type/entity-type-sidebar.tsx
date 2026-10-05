import React, { useMemo, useState } from 'react';
import { useEntityTypes } from '../../api/metadata-api';
import { useMetadataUiStore } from '../../store/use-metadata-ui-store';
import type { EntityType } from '../../api/types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Database, Plus, Search, MoreVertical, Edit2, Trash2 } from 'lucide-react';

export const EntityTypeSidebar: React.FC = () => {
  const { data: entityTypesResponse, isLoading } = useEntityTypes();
  const {
    selectedEntityTypeId,
    setSelectedEntityTypeId,
    openCreateEntityTypeDialog,
    openEditEntityTypeDialog,
    openDeleteEntityTypeDialog,
  } = useMetadataUiStore();

  const [search, setSearch] = useState('');

  const entityTypes = useMemo(() => {
    return entityTypesResponse?.content || [];
  }, [entityTypesResponse]);

  const filteredEntityTypes = useMemo(() => {
    if (!search.trim()) return entityTypes;
    const query = search.toLowerCase();
    return entityTypes.filter(
      (et) =>
        et.name.toLowerCase().includes(query) ||
        et.systemName.toLowerCase().includes(query)
    );
  }, [entityTypes, search]);

  return (
    <aside className="w-full lg:w-72 shrink-0 flex flex-col gap-4 p-4 rounded-2xl bg-white/45 dark:bg-slate-900/45 backdrop-blur-xl border border-white/30 dark:border-white/10 shadow-lg shadow-black/5 dark:shadow-black/25">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Database className="h-5 w-5 text-primary" />
          <h3 className="font-bold text-foreground text-sm tracking-tight">Entity Models</h3>
        </div>
        <Button
          size="sm"
          variant="outline"
          onClick={openCreateEntityTypeDialog}
          className="h-8 px-2 gap-1 text-xs bg-white/40 dark:bg-white/5 border-white/20"
          title="Create New Entity Model"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>New</span>
        </Button>
      </div>

      {/* Search Filter */}
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter models..."
          className="pl-8 h-8 text-xs bg-white/50 dark:bg-white/5 border-white/20"
        />
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto space-y-1.5 max-h-[calc(100vh-280px)] pr-1">
        {isLoading ? (
          <div className="text-xs text-muted-foreground p-4 text-center">Loading models...</div>
        ) : filteredEntityTypes.length === 0 ? (
          <div className="text-xs text-muted-foreground p-4 text-center">
            {search ? 'No matching models' : 'No entity models yet.'}
          </div>
        ) : (
          filteredEntityTypes.map((et: EntityType) => {
            const isSelected = String(selectedEntityTypeId) === String(et.id);

            return (
              <div
                key={et.id}
                onClick={() => setSelectedEntityTypeId(String(et.id))}
                className={`group relative flex items-center justify-between p-2.5 rounded-xl cursor-pointer text-xs transition-all ${
                  isSelected
                    ? 'bg-primary text-primary-foreground font-semibold shadow-md shadow-primary/20'
                    : 'hover:bg-white/40 dark:hover:bg-white/5 text-muted-foreground hover:text-foreground'
                }`}
              >
                <div className="flex flex-col gap-0.5 truncate pr-2">
                  <span className="truncate">{et.name}</span>
                  <span
                    className={`font-mono text-[10px] truncate ${
                      isSelected ? 'text-primary-foreground/75' : 'text-muted-foreground/80'
                    }`}
                  >
                    {et.systemName}
                  </span>
                </div>

                <div
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => e.stopPropagation()}
                >
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button
                        className={`p-1 rounded hover:bg-white/20 ${
                          isSelected ? 'text-primary-foreground' : 'text-muted-foreground'
                        }`}
                      >
                        <MoreVertical className="h-3.5 w-3.5" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="text-xs">
                      <DropdownMenuItem
                        onClick={() => openEditEntityTypeDialog(et)}
                        className="gap-2"
                      >
                        <Edit2 className="h-3.5 w-3.5" /> Edit Model
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => openDeleteEntityTypeDialog(et)}
                        className="gap-2 text-destructive focus:text-destructive"
                      >
                        <Trash2 className="h-3.5 w-3.5" /> Delete Model
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            );
          })
        )}
      </div>
    </aside>
  );
};
