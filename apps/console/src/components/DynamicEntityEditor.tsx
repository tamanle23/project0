import React, { useEffect, useState } from 'react';
import { useDynamicSchema } from '../hooks/useDynamicSchema';
import { useDynamicEntity } from '../hooks/useDynamicEntity';
import { DynamicFieldRenderer } from './DynamicFieldRenderer';

interface Props {
  entityId?: string;
  entityTypeId: string;
}

export const DynamicEntityEditor: React.FC<Props> = ({ entityId, entityTypeId }) => {
  const { data: schema, isLoading: isSchemaLoading } = useDynamicSchema(entityTypeId);
  const { data: entity, isLoading: isEntityLoading } = useDynamicEntity(entityId || '');
  const [formData, setFormData] = useState<Record<string, any>>({});

  useEffect(() => {
    if (entity && entity.attributes) {
      setFormData(entity.attributes);
    }
  }, [entity]);

  // If no entityId is provided, we're creating a new one, so skip entity loading checks
  if (isSchemaLoading || (entityId && isEntityLoading)) {
    return <div>Loading editor...</div>;
  }

  if (!schema) {
    return <div>Error loading schema</div>;
  }

  const updateField = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    console.log('Submitting data:', formData);
    // Submit logic here
  };

  return (
    <div className="p-6 rounded-xl bg-white/30 backdrop-blur-md border border-white/20 shadow-xl">
      <h2 className="text-2xl font-bold mb-6">{entityId ? 'Edit' : 'Create'} {schema.entityTypeId}</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
        {schema.fields.map((field: any) => (
          <DynamicFieldRenderer
            key={field.name}
            field={field}
            value={formData[field.name] || ''}
            onChange={(val) => updateField(field.name, val)}
          />
        ))}
        <button
          type="submit"
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Save
        </button>
      </form>
    </div>
  );
};
