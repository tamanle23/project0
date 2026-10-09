import React from 'react';
import { LucideIcon, Truck, Newspaper, Briefcase, Layers, Sparkles, Check } from 'lucide-react';
import type { BlueprintSummary } from '../api/types';

const iconMap: Record<string, LucideIcon> = {
  Truck,
  Newspaper,
  Briefcase,
  Layers,
  Sparkles,
};

export interface BlueprintCardProps {
  blueprint: BlueprintSummary;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onPreview?: (blueprint: BlueprintSummary) => void;
}

export const BlueprintCard: React.FC<BlueprintCardProps> = ({
  blueprint,
  isSelected,
  onSelect,
  onPreview,
}) => {
  const IconComponent = iconMap[blueprint.icon] || Layers;

  return (
    <div
      onClick={() => onSelect(blueprint.id)}
      className={`group relative p-5 rounded-2xl cursor-pointer transition-all duration-300 backdrop-blur-xl border flex flex-col justify-between ${
        isSelected
          ? 'bg-sky-500/15 border-sky-500/60 shadow-lg shadow-sky-500/10 ring-2 ring-sky-500/40 dark:bg-sky-500/20'
          : 'bg-white/60 dark:bg-slate-900/60 border-white/30 dark:border-white/10 hover:border-sky-500/40 hover:bg-white/80 dark:hover:bg-slate-900/80 hover:shadow-md'
      }`}
    >
      <div>
        <div className="flex items-start justify-between">
          <div className="p-3 rounded-xl bg-gradient-to-br from-sky-500/20 to-indigo-500/20 text-sky-600 dark:text-sky-400 group-hover:scale-105 transition-transform">
            <IconComponent className="w-6 h-6" />
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-200/50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300">
              {blueprint.entityTypesCount} Models
            </span>
            {isSelected && (
              <span className="p-1 rounded-full bg-sky-500 text-white">
                <Check className="w-3.5 h-3.5" />
              </span>
            )}
          </div>
        </div>

        <h3 className="mt-4 font-semibold text-slate-900 dark:text-white text-base tracking-tight">
          {blueprint.name}
        </h3>
        <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
          {blueprint.description}
        </p>
      </div>

      <div className="mt-5 pt-3 border-t border-slate-200/40 dark:border-slate-800/40 flex items-center justify-between text-xs text-slate-500">
        <span className="font-mono text-[11px]">{blueprint.relationshipsCount} Graph Edges</span>
        {onPreview ? (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onPreview(blueprint);
            }}
            className="font-medium text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1"
          >
            <span>Preview</span>
          </button>
        ) : (
          <span className="font-medium text-sky-600 dark:text-sky-400 group-hover:translate-x-0.5 transition-transform">
            Select Template →
          </span>
        )}
      </div>
    </div>
  );
};
