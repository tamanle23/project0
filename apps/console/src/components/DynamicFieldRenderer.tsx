import React from 'react';
import type { AttributeDefinitionOptions } from '../features/metadata';

interface FieldSchema {
  name: string;
  uiComponent: string;
  isRequired?: boolean;
  options?: AttributeDefinitionOptions;
}

interface Props {
  field: FieldSchema;
  value: string;
  onChange: (value: string) => void;
}

export const DynamicFieldRenderer: React.FC<Props> = ({ field, value, onChange }) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    onChange(e.target.value);
  };

  switch (field.uiComponent) {
    case 'text':
      return (
        <div className="flex flex-col gap-2 mb-4">
          <label className="text-sm font-medium">
            {field.name} {field.isRequired && '*'}
          </label>
          <input
            type="text"
            value={value}
            onChange={handleChange}
            className="p-2 border rounded bg-white/50 backdrop-blur-sm"
          />
        </div>
      );
    case 'textarea':
      return (
        <div className="flex flex-col gap-2 mb-4">
          <label className="text-sm font-medium">
            {field.name} {field.isRequired && '*'}
          </label>
          <textarea
            value={value}
            onChange={handleChange}
            className="p-2 border rounded bg-white/50 backdrop-blur-sm"
          />
        </div>
      );
    case 'select':
      return (
        <div className="flex flex-col gap-2 mb-4">
          <label className="text-sm font-medium">
            {field.name} {field.isRequired && '*'}
          </label>
          <select
            value={value}
            onChange={handleChange}
            className="p-2 border rounded bg-white/50 backdrop-blur-sm"
          >
            <option value="">Select...</option>
            {field.options?.choices?.map((choice: string) => (
              <option key={choice} value={choice}>
                {choice}
              </option>
            ))}
          </select>
        </div>
      );
    default:
      return (
        <div className="text-red-500">
          Unsupported field type: {field.uiComponent}
        </div>
      );
  }
};
