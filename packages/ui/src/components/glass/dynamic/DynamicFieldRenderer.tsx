import React from 'react';

export interface DynamicFieldProps {
  fieldId: string;
  uiComponent: string;
  value: any;
  onChange: (fieldId: string, value: any) => void;
  label: string;
}

export const DynamicFieldRenderer: React.FC<DynamicFieldProps> = ({ fieldId, uiComponent, value, onChange, label }) => {
  switch (uiComponent) {
    case 'text':
      return (
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">{label}</label>
          <input
            type="text"
            value={value || ''}
            onChange={(e) => onChange(fieldId, e.target.value)}
            className="w-full bg-white/20 dark:bg-black/20 border border-white/30 dark:border-white/10 rounded-md p-2 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400"
            placeholder={`Enter ${label}`}
          />
        </div>
      );
    case 'number':
      return (
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">{label}</label>
          <input
            type="number"
            value={value || ''}
            onChange={(e) => onChange(fieldId, e.target.value)}
            className="w-full bg-white/20 dark:bg-black/20 border border-white/30 dark:border-white/10 rounded-md p-2 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400"
            placeholder={`Enter ${label}`}
          />
        </div>
      );
    // Add other component types as needed
    default:
      return (
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">{label}</label>
          <span className="text-sm text-slate-500">Unsupported field type: {uiComponent}</span>
        </div>
      );
  }
};
