import { X } from 'lucide-react'
import { type Table } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DataTableFacetedFilter } from './faceted-filter'
import { DataTableViewOptions } from './view-options'
import { useDebounce } from '@/hooks/use-debounce'
import { useEffect, useState } from 'react'

type DataTableToolbarProps<TData> = {
  table: Table<TData>
  searchPlaceholder?: string
  searchKey?: string
  filters?: {
    columnId: string
    title: string
    options: {
      label: string
      value: string
      icon?: React.ComponentType<{ className?: string }>
    }[]
  }[]
}

export function DataTableToolbar<TData>({
  table,
  searchPlaceholder = 'Filter...',
  searchKey,
  filters = [],
}: DataTableToolbarProps<TData>) {
  const isFiltered =
    table.getState().columnFilters.length > 0 || table.getState().globalFilter

  // Initialize local state with table state
  const initialValue = searchKey
    ? (table.getColumn(searchKey)?.getFilterValue() as string) ?? ''
    : table.getState().globalFilter ?? ''

  const [searchValue, setSearchValue] = useState(initialValue)
  const [prevTableFilter, setPrevTableFilter] = useState(initialValue)
  const debouncedSearchValue = useDebounce(searchValue, 300)

  // Sync debounced value to table filter
  useEffect(() => {
    if (searchKey) {
      if (table.getColumn(searchKey)?.getFilterValue() !== debouncedSearchValue) {
        table.getColumn(searchKey)?.setFilterValue(debouncedSearchValue)
      }
    } else {
      if (table.getState().globalFilter !== debouncedSearchValue) {
        table.setGlobalFilter(debouncedSearchValue)
      }
    }
  }, [debouncedSearchValue, searchKey, table])

  // Sync table filter back to local state if reset occurs externally
  const currentColumnFilter = searchKey ? (table.getColumn(searchKey)?.getFilterValue() as string) ?? '' : ''
  const currentGlobalFilter = table.getState().globalFilter ?? ''
  const tableFilterValue = searchKey ? currentColumnFilter : currentGlobalFilter

  if (tableFilterValue !== prevTableFilter) {
    setPrevTableFilter(tableFilterValue)
    setSearchValue(tableFilterValue)
  }

  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2'>
        <Input
          placeholder={searchPlaceholder}
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
          className='h-8 w-[150px] lg:w-[250px]'
        />
        <div className='flex gap-x-2'>
          {filters.map((filter) => {
            const column = table.getColumn(filter.columnId)
            if (!column) return null
            return (
              <DataTableFacetedFilter
                key={filter.columnId}
                column={column}
                title={filter.title}
                options={filter.options}
              />
            )
          })}
        </div>
        {isFiltered && (
          <Button
            variant='ghost'
            onClick={() => {
              table.resetColumnFilters()
              table.setGlobalFilter('')
            }}
            className='h-8 px-2 lg:px-3'
          >
            Reset
            <X className='ms-2 h-4 w-4' />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}
