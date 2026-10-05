import React, { useMemo } from 'react';
import { useEntityRecords, useAttributeDefinitions } from '../hooks/useMetadataApi';
import type { AttributeDefinition, EntityRecord } from '../features/metadata';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

interface Props {
  entityTypeId: string;
}

const columnHelper = createColumnHelper<EntityRecord>();

export const EntityDataGrid: React.FC<Props> = ({ entityTypeId }) => {
  const { data: records, isLoading: recordsLoading } = useEntityRecords(entityTypeId);
  const { data: schema, isLoading: schemaLoading } = useAttributeDefinitions(entityTypeId);

  const columns = useMemo(() => {
    if (!schema) return [];

    const dynamicCols = schema.map((attr: AttributeDefinition) =>
      columnHelper.accessor(
        (row) => (row.attributes?.[attr.systemName] as string | number | boolean | null | undefined),
        {
          id: attr.systemName,
          header: attr.name,
          cell: (info) => {
            const val = info.getValue();
            if (val === null || val === undefined || val === '') return '-';
            if (typeof val === 'boolean') return val ? 'Yes' : 'No';
            if (typeof val === 'object') return JSON.stringify(val);
            return String(val);
          },
        }
      )
    );

    return [
      columnHelper.accessor('id', {
        header: 'ID',
        cell: (info) => String(info.getValue()),
      }),
      ...dynamicCols,
    ];
  }, [schema]);

  const table = useReactTable({
    data: records || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (recordsLoading || schemaLoading) return <div>Loading data...</div>;

  return (
    <div className="bg-white/30 backdrop-blur-md rounded-lg border border-white/20 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="bg-white/50 border-b">
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="p-3 font-semibold text-sm">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-b hover:bg-white/40">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="p-3 text-sm">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
            {table.getRowModel().rows.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="p-4 text-center text-gray-500">
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
