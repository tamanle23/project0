import React from 'react';
import { useAttributeDefinitions } from '../hooks/useMetadataApi';
import { Plus, Trash2 } from 'lucide-react';

interface Props {
  entityTypeId: string;
}

export const SchemaBuilder: React.FC<Props> = ({ entityTypeId }) => {
  const { data: attributes, isLoading } = useAttributeDefinitions(entityTypeId);

  if (isLoading) return <div>Loading schema...</div>;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Schema Definition</h3>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Plus size={16} /> Add Field
        </button>
      </div>

      <div className="bg-white/30 backdrop-blur-md rounded-lg border border-white/20 p-4">
        {attributes?.length === 0 ? (
          <div className="text-center text-gray-500 py-8">No fields defined yet.</div>
        ) : (
          <div className="space-y-2">
            {attributes?.map((attr) => (
              <div key={attr.id} className="flex items-center justify-between p-3 bg-white/50 rounded border">
                <div>
                  <span className="font-medium">{attr.name}</span>
                  <span className="text-sm text-gray-500 ml-2">({attr.systemName}) - {attr.uiComponent}</span>
                </div>
                <div className="flex gap-2">
                  <span className={`px-2 py-1 text-xs rounded ${attr.isRequired ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'}`}>
                    {attr.isRequired ? 'Required' : 'Optional'}
                  </span>
                  <button className="p-1 text-red-500 hover:bg-red-50 rounded">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
