import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { useEntityTypes } from '../../../hooks/useMetadataApi';
import { SchemaBuilder } from '../../../components/SchemaBuilder';
import { EntityDataGrid } from '../../../components/EntityDataGrid';

export const Route = createFileRoute('/_authenticated/metadata/')({
  component: MetadataManagementPage,
});

function MetadataManagementPage() {
  const { data: entityTypes, isLoading } = useEntityTypes();
  const [selectedTypeId, setSelectedTypeId] = useState<string | null>('1'); // Default to 1 for demo
  const [activeTab, setActiveTab] = useState<'schema' | 'data'>('schema');

  if (isLoading) return <div className="p-8">Loading...</div>;

  return (
    <div className="flex h-screen bg-gray-50/50">
      {/* Sidebar for Entity Types */}
      <div className="w-64 border-r bg-white p-4">
        <h2 className="text-lg font-bold mb-4">Entity Types</h2>
        <ul className="space-y-2">
          {entityTypes?.map((type: any) => (
            <li
              key={type.id}
              onClick={() => setSelectedTypeId(type.id)}
              className={`p-2 rounded cursor-pointer ${selectedTypeId === type.id ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
            >
              {type.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-8 overflow-auto">
        {selectedTypeId ? (
          <div>
            <div className="mb-6 border-b">
              <nav className="flex space-x-4">
                <button
                  onClick={() => setActiveTab('schema')}
                  className={`pb-2 px-1 border-b-2 font-medium ${activeTab === 'schema' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                >
                  Schema Builder
                </button>
                <button
                  onClick={() => setActiveTab('data')}
                  className={`pb-2 px-1 border-b-2 font-medium ${activeTab === 'data' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                >
                  Data Explorer
                </button>
              </nav>
            </div>

            {activeTab === 'schema' ? (
              <SchemaBuilder entityTypeId={selectedTypeId} />
            ) : (
              <EntityDataGrid entityTypeId={selectedTypeId} />
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Select an Entity Type to view its schema and data.
          </div>
        )}
      </div>
    </div>
  );
}
