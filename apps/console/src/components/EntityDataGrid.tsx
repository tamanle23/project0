import React, { useMemo } from 'react';
import { useEntityRecords, useAttributeDefinitions } from '../hooks/useMetadataApi';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

interface Props {
  entityTypeId: string;
}

export const EntityDataGrid: React.FC<Props> = ({ entityTypeId }) => {
  const { data: records, isLoading: recordsLoading } = useEntityRecords(entityTypeId);
  const { data: schema, isLoading: schemaLoading } = useAttributeDefinitions(entityTypeId);

  const columnHelper = createColumnHelper<any>();

  const columns = useMemo(() => {
    if (!schema) return [];

    const dynamicCols = schema.map((attr: any) =>
      columnHelper.accessor(`attributes.${attr.systemName}`, {
        header: attr.name,
        cell: info => info.getValue() || '-',
      })
    );

    return [
      columnHelper.accessor('id', { header: 'ID', cell: info => info.getValue() }),
      ...dynamicCols
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
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id} className="bg-white/50 border-b">
                {headerGroup.headers.map(header => (
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
            {table.getRowModel().rows.map(row => (
              <tr key={row.id} className="border-b hover:bg-white/40">
                {row.getVisibleCells().map(cell => (
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
