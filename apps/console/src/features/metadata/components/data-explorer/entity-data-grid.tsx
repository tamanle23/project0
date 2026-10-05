import React, { useMemo, useState } from 'react';
import {
  useEntityRecords,
  useAttributeDefinitions,
  useEntityType,
} from '../../api/metadata-api';
import { useMetadataUiStore } from '../../store/use-metadata-ui-store';
import type { AttributeDefinition, EntityRecord } from '../../api/types';
import { RecordEditorDialog } from './record-editor-dialog';
import { RecordDeleteDialog } from './record-delete-dialog';
import { RawJsonDialog } from './raw-json-dialog';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Plus,
  Search,
  Download,
  MoreVertical,
  Edit2,
  Trash2,
  Code,
  ChevronLeft,
  ChevronRight,
  Database,
} from 'lucide-react';

interface Props {
  entityTypeId: string | number;
}

const columnHelper = createColumnHelper<EntityRecord>();

export const EntityDataGrid: React.FC<Props> = ({ entityTypeId }) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchFilter, setSearchFilter] = useState('');
  const [inspectingRecord, setInspectingRecord] = useState<EntityRecord | null>(null);

  const { data: recordsResponse, isLoading: recordsLoading } = useEntityRecords(
    entityTypeId,
    { number: page, size: pageSize }
  );
  const { data: attributesResponse, isLoading: schemaLoading } =
    useAttributeDefinitions(entityTypeId);
  const { data: entityType } = useEntityType(entityTypeId);

  const {
    openCreateRecordDialog,
    openEditRecordDialog,
    openDeleteRecordDialog,
  } = useMetadataUiStore();

  const attributes = useMemo(() => {
    return attributesResponse?.content || [];
  }, [attributesResponse]);

  const rawRecords = useMemo(() => {
    return recordsResponse?.content || [];
  }, [recordsResponse]);

  // Client-side text filter over currently loaded records
  const filteredRecords = useMemo(() => {
    if (!searchFilter.trim()) return rawRecords;
    const query = searchFilter.toLowerCase();
    return rawRecords.filter((record) => {
      if (String(record.id).toLowerCase().includes(query)) return true;
      if (record.tenantId && record.tenantId.toLowerCase().includes(query)) return true;
      return Object.values(record.attributes || {}).some((val) =>
        String(val).toLowerCase().includes(query)
      );
    });
  }, [rawRecords, searchFilter]);

  const columns = useMemo(() => {
    const baseCols = [
      columnHelper.accessor('id', {
        header: 'ID',
        cell: (info) => (
          <code className="font-mono text-xs text-muted-foreground bg-muted/60 dark:bg-white/5 px-1.5 py-0.5 rounded">
            #{String(info.getValue())}
          </code>
        ),
      }),
    ];

    const dynamicCols = attributes
      .filter((attr) => !attr.isArchived)
      .map((attr: AttributeDefinition) =>
        columnHelper.accessor(
          (row) => row.attributes?.[attr.systemName],
          {
            id: attr.systemName,
            header: attr.name,
            cell: (info) => {
              const val = info.getValue();
              if (val === null || val === undefined || val === '') {
                return <span className="text-muted-foreground/60 text-xs">-</span>;
              }

              if (typeof val === 'boolean') {
                return (
                  <Badge
                    variant={val ? 'secondary' : 'outline'}
                    className={`text-[10px] ${
                      val ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' : ''
                    }`}
                  >
                    {val ? 'True' : 'False'}
                  </Badge>
                );
              }

              if (Array.isArray(val)) {
                return (
                  <div className="flex flex-wrap gap-1 max-w-xs">
                    {val.map((item, i) => (
                      <span
                        key={i}
                        className="text-[10px] px-1.5 py-0.5 rounded bg-muted/50 border border-white/10"
                      >
                        {String(item)}
                      </span>
                    ))}
                  </div>
                );
              }

              if (typeof val === 'object') {
                return (
                  <code className="text-[10px] font-mono text-muted-foreground truncate max-w-[120px] inline-block">
                    {JSON.stringify(val)}
                  </code>
                );
              }

              return (
                <span className="text-xs text-foreground truncate max-w-xs inline-block">
                  {String(val)}
                </span>
              );
            },
          }
        )
      );

    const actionCol = columnHelper.display({
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <div className="flex items-center justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                <MoreVertical className="h-3.5 w-3.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="text-xs">
              <DropdownMenuItem
                onClick={() => openEditRecordDialog(row.original)}
                className="gap-2"
              >
                <Edit2 className="h-3.5 w-3.5" /> Edit Record
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setInspectingRecord(row.original)}
                className="gap-2"
              >
                <Code className="h-3.5 w-3.5" /> View Raw JSON
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => openDeleteRecordDialog(row.original)}
                className="gap-2 text-destructive focus:text-destructive"
              >
                <Trash2 className="h-3.5 w-3.5" /> Delete Record
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    });

    return [...baseCols, ...dynamicCols, actionCol];
  }, [attributes, openEditRecordDialog, openDeleteRecordDialog]);

  const table = useReactTable({
    data: filteredRecords,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleExportJson = () => {
    const dataStr =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify(rawRecords, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute(
      'download',
      `${entityType?.systemName || 'records'}_export_${Date.now()}.json`
    );
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const totalRecords = recordsResponse?.totalElements ?? rawRecords.length;
  const totalPages = recordsResponse?.totalPages ?? (Math.ceil(totalRecords / pageSize) || 1);

  if (recordsLoading || schemaLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-muted-foreground gap-3">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        <span className="text-sm">Loading records and schema...</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Action Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl bg-white/45 dark:bg-slate-900/45 backdrop-blur-xl border border-white/30 dark:border-white/10 shadow-lg shadow-black/5 dark:shadow-black/25">
        <div className="flex items-center gap-2">
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Search records..."
              className="pl-8 h-9 text-xs bg-white/50 dark:bg-white/5 border-white/20"
            />
          </div>
          <Badge variant="secondary" className="text-xs">
            {totalRecords} {totalRecords === 1 ? 'Record' : 'Records'}
          </Badge>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleExportJson}
            disabled={rawRecords.length === 0}
            className="h-9 gap-1.5 text-xs bg-white/40 dark:bg-white/5 border-white/20"
          >
            <Download className="h-4 w-4" />
            <span>Export JSON</span>
          </Button>

          <Button
            size="sm"
            onClick={openCreateRecordDialog}
            className="h-9 gap-1.5 text-xs shadow-md shadow-primary/20"
          >
            <Plus className="h-4 w-4" />
            <span>New Record</span>
          </Button>
        </div>
      </div>

      {/* Table Canvas */}
      <div className="rounded-2xl bg-white/45 dark:bg-slate-900/45 backdrop-blur-xl border border-white/30 dark:border-white/10 shadow-lg shadow-black/5 dark:shadow-black/25 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr
                  key={headerGroup.id}
                  className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-md border-b border-border"
                >
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="p-3 font-semibold text-muted-foreground uppercase tracking-wider text-[11px]"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-white/10 hover:bg-white/40 dark:hover:bg-white/5 transition-colors"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="p-3">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
              {table.getRowModel().rows.length === 0 && (
                <tr>
                  <td colSpan={columns.length} className="p-12 text-center text-muted-foreground">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <Database className="h-8 w-8 text-muted-foreground/50 mb-1" />
                      <p className="font-semibold text-sm">No records found</p>
                      <p className="text-xs">
                        {searchFilter
                          ? `No records matching "${searchFilter}".`
                          : 'Create your first entity record using the button above.'}
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 border-t border-white/10 bg-white/30 dark:bg-slate-850/30">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>Show</span>
            <Select
              value={String(pageSize)}
              onValueChange={(val) => {
                setPageSize(Number(val));
                setPage(1);
              }}
            >
              <SelectTrigger className="h-7 w-16 text-xs bg-white/50 dark:bg-white/5 border-white/20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
            <span>per page</span>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="text-muted-foreground">
              Page <span className="font-semibold text-foreground">{page}</span> of{' '}
              <span className="font-semibold text-foreground">{totalPages}</span>
            </span>

            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
                className="h-7 w-7 p-0 bg-white/40 dark:bg-white/5"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page >= totalPages}
                className="h-7 w-7 p-0 bg-white/40 dark:bg-white/5"
              >
                <ChevronRight className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Dialogs */}
      <RecordEditorDialog entityTypeId={entityTypeId} />
      <RecordDeleteDialog entityTypeId={entityTypeId} />
      <RawJsonDialog
        record={inspectingRecord}
        open={Boolean(inspectingRecord)}
        onOpenChange={(open) => !open && setInspectingRecord(null)}
      />
    </div>
  );
};
