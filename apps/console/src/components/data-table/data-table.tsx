import { flexRender, type Table as ReactTable } from '@tanstack/react-table'
import { cn } from '@/lib/utils'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

type DataTableProps<TData> = {
  table: ReactTable<TData>
  className?: string
  containerClassName?: string
  noResultsMessage?: React.ReactNode
}

export function DataTable<TData>({
  table,
  className,
  containerClassName,
  noResultsMessage = 'No results.',
}: DataTableProps<TData>) {
  const columnCount = table.getAllColumns().length

  return (
    <div
      className={cn(
        'overflow-hidden rounded-xl border border-white/20 dark:border-white/10 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md shadow-lg shadow-black/5 dark:shadow-black/20',
        containerClassName
      )}
    >
      <Table className={className}>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className='group/row'>
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  colSpan={header.colSpan}
                  className={cn(
                    header.column.columnDef.meta?.className,
                    header.column.columnDef.meta?.thClassName
                  )}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
                className='group/row'
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className={cn(
                      cell.column.columnDef.meta?.className,
                      cell.column.columnDef.meta?.tdClassName
                    )}
                  >
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columnCount}
                className='h-24 text-center'
              >
                {noResultsMessage}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
