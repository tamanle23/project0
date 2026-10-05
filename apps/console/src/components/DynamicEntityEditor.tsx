import React, { useEffect, useState } from 'react';
import { useDynamicSchema } from '../hooks/useDynamicSchema';
import { useDynamicEntity } from '../hooks/useDynamicEntity';
import { DynamicFieldRenderer } from './DynamicFieldRenderer';
import { useCreateEntityRecord, useUpdateEntityRecord } from '../features/metadata';

interface Props {
  entityId?: string;
  entityTypeId: string;
}

export const DynamicEntityEditor: React.FC<Props> = ({ entityId, entityTypeId }) => {
  const { data: schema, isLoading: isSchemaLoading } = useDynamicSchema(entityTypeId);
  const { data: entity, isLoading: isEntityLoading } = useDynamicEntity(entityId || '', entityTypeId);
  const createMutation = useCreateEntityRecord(entityTypeId);
  const updateMutation = useUpdateEntityRecord(entityTypeId);

  const [formData, setFormData] = useState<Record<string, unknown>>({});

  useEffect(() => {
    if (entity && entity.attributes) {
      setFormData(entity.attributes);
    }
  }, [entity]);

  if (isSchemaLoading || (entityId && isEntityLoading)) {
    return <div>Loading editor...</div>;
  }

  if (!schema) {
    return <div>Error loading schema</div>;
  }

  const updateField = (field: string, value: unknown) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (entityId) {
      updateMutation.mutate({
        recordId: entityId,
        dto: { attributes: formData },
      });
    } else {
      createMutation.mutate({
        entityTypeId,
        attributes: formData,
      });
    }
  };

  return (
    <div className="p-6 rounded-xl bg-white/30 backdrop-blur-md border border-white/20 shadow-xl">
      <h2 className="text-2xl font-bold mb-6">
        {entityId ? 'Edit' : 'Create'} {schema.entityTypeId}
      </h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        {schema.fields.map((field) => (
          <DynamicFieldRenderer
            key={field.name}
            field={field}
            value={String(formData[field.name] || '')}
            onChange={(val) => updateField(field.name, val)}
          />
        ))}
        <button
          type="submit"
          disabled={createMutation.isPending || updateMutation.isPending}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          {createMutation.isPending || updateMutation.isPending ? 'Saving...' : 'Save'}
        </button>
      </form>
    </div>
  );
};
