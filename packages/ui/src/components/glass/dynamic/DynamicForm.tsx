import React from 'react';
import { DynamicFieldRenderer } from './DynamicFieldRenderer';

export interface DynamicFormProps {
  schema: any; // Ideally typed according to backend schema structure
  formData: Record<string, any>;
  onChange: (fieldId: string, value: any) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const DynamicForm: React.FC<DynamicFormProps> = ({ schema, formData, onChange, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {schema?.attributes?.map((attr: any) => (
        <DynamicFieldRenderer
          key={attr.name}
          fieldId={attr.name}
          label={attr.name} // Assuming name acts as label for now
          uiComponent={attr.ui_component || 'text'}
          value={formData[attr.name]}
          onChange={onChange}
        />
      ))}
      <button
        type="submit"
        className="w-full relative overflow-hidden bg-white/20 hover:bg-white/30 dark:bg-white/10 dark:hover:bg-white/15 border border-white/30 dark:border-white/15 backdrop-blur-md text-foreground shadow-sm transition-all duration-200 active:scale-95 py-2 px-4 rounded-md font-medium"
      >
        Save
      </button>
    </form>
  );
};
