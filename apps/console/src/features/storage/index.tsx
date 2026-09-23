import { type ChangeEvent, useState } from 'react'
import { getRouteApi } from '@tanstack/react-router'
import { SlidersHorizontal, ArrowUpAZ, ArrowDownAZ, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { LanguageSwitch } from '@/components/language-switch'
import { toast } from 'sonner'
import { storages } from './data/storages'

const route = getRouteApi('/_authenticated/storage/')

type FilterType = 'all' | 'Archive' | 'CDN'

const filterText = new Map<FilterType, string>([
  ['all', 'All Modes'],
  ['Archive', 'Archive'],
  ['CDN', 'CDN'],
])

export function StorageIntegration() {
  const {
    filter = '',
    type = 'all',
    sort: initSort = 'asc',
  } = route.useSearch()
  const navigate = route.useNavigate()

  const [sort, setSort] = useState(initSort)
  const [filterType, setFilterType] = useState<FilterType>(type as FilterType)
  const [searchTerm, setSearchTerm] = useState(filter)

  const filteredStorages = storages
    .sort((a, b) =>
      sort === 'asc'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    )
    .filter((storage) =>
      filterType === 'all' ? true : storage.storageMode === filterType
    )
    .filter((storage) => storage.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    navigate({
      search: (prev) => ({
        ...prev,
        filter: e.target.value || undefined,
      }),
    })
  }

  const handleTypeChange = (value: FilterType) => {
    setFilterType(value)
    navigate({
      search: (prev) => ({
        ...prev,
        type: value === 'all' ? undefined : value,
      }),
    })
  }

  const handleSortChange = (sort: 'asc' | 'desc') => {
    setSort(sort)
    navigate({ search: (prev) => ({ ...prev, sort }) })
  }

  return (
    <>
      <Header>
        <Search />
        <div className='ms-auto flex items-center gap-4'>
          <LanguageSwitch />
          <ThemeSwitch />
          <ConfigDrawer />
          <ProfileDropdown />
        </div>
      </Header>

      <Main fixed>
        <div>
          <h1 className='text-2xl font-bold tracking-tight'>
            Storage Integrations
          </h1>
          <p className='text-muted-foreground'>
            Manage your Cloud Storage services for @project0/backend file uploads!
          </p>
        </div>
        <div className='my-4 flex items-end justify-between sm:my-0 sm:items-center'>
          <div className='flex flex-col gap-4 sm:my-4 sm:flex-row'>
            <Input
              placeholder='Filter storage...'
              className='h-9 w-40 lg:w-[250px]'
              value={searchTerm}
              onChange={handleSearch}
            />
            <Select value={filterType} onValueChange={handleTypeChange}>
              <SelectTrigger className='w-36'>
                <SelectValue>{filterText.get(filterType)}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>All Modes</SelectItem>
                <SelectItem value='Archive'>Archive</SelectItem>
                <SelectItem value='CDN'>CDN</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Select value={sort} onValueChange={handleSortChange}>
            <SelectTrigger className='w-16'>
              <SelectValue>
                <SlidersHorizontal size={18} />
              </SelectValue>
            </SelectTrigger>
            <SelectContent align='end'>
              <SelectItem value='asc'>
                <div className='flex items-center gap-4'>
                  <ArrowUpAZ size={16} />
                  <span>Ascending</span>
                </div>
              </SelectItem>
              <SelectItem value='desc'>
                <div className='flex items-center gap-4'>
                  <ArrowDownAZ size={16} />
                  <span>Descending</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Separator className='shadow-sm' />
        <ul className='faded-bottom no-scrollbar grid gap-4 overflow-auto pt-4 pb-16 md:grid-cols-2 lg:grid-cols-3'>
          {filteredStorages.map((storage) => (
            <li key={storage.name} className='flex'>
              <Card className='flex w-full flex-col justify-between gap-4 p-5 bg-white/65 dark:bg-slate-900/65 backdrop-blur-xl border border-white/30 dark:border-white/10 shadow-lg shadow-black/5 dark:shadow-black/30 rounded-2xl'>
                <div className='flex items-center justify-between'>
                  <div
                    className='flex size-11 items-center justify-center rounded-xl bg-white/40 dark:bg-white/10 border border-white/30 dark:border-white/10 backdrop-blur-md p-2 shadow-xs'
                  >
                    {storage.logo}
                  </div>
                  <div className='flex items-center gap-2'>
                    {storage.connected ? (
                      <>
                        <Button
                          variant='outline'
                          size='sm'
                          className='liquid-glass-interactive h-8 text-xs relative overflow-hidden bg-white/20 hover:bg-white/30 dark:bg-white/10 dark:hover:bg-white/15 border border-white/30 dark:border-white/15 backdrop-blur-md text-foreground shadow-sm transition-all duration-200 active:scale-95'
                          onClick={() => {
                             toast.info(`Managing ${storage.name}`)
                          }}
                        >
                          Manage
                        </Button>
                        <Button
                          variant='outline'
                          size='sm'
                          disabled
                          className='h-8 border border-emerald-500/40 bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 text-xs font-medium shadow-xs disabled:opacity-100'
                        >
                          <Check className='me-1 size-3.5 stroke-[2.5]' />
                          Connected
                        </Button>
                      </>
                    ) : (
                      <Button
                        variant='outline'
                        size='sm'
                        className='liquid-glass-interactive h-8 text-xs relative overflow-hidden bg-white/20 hover:bg-white/30 dark:bg-white/10 dark:hover:bg-white/15 border border-white/30 dark:border-white/15 backdrop-blur-md text-foreground shadow-sm transition-all duration-200 active:scale-95'
                        onClick={() => {
                           toast.success(`Connecting to ${storage.name}`)
                        }}
                      >
                        Connect
                      </Button>
                    )}
                  </div>
                </div>
                <div>
                  <div className='mb-1 flex items-center gap-2'>
                    <h2 className='font-semibold tracking-tight text-card-foreground'>{storage.name}</h2>
                    <span className={`rounded-md border px-1.5 py-0.5 text-[10px] font-medium ${storage.storageMode === 'CDN' ? 'border-purple-500/30 bg-purple-500/10 text-purple-700 dark:text-purple-300' : 'border-blue-500/30 bg-blue-500/10 text-blue-700 dark:text-blue-300'}`}>
                      {storage.storageMode}
                    </span>
                  </div>
                  <p className='line-clamp-2 text-sm text-muted-foreground'>{storage.desc}</p>
                </div>
              </Card>
            </li>
          ))}
        </ul>
      </Main>
    </>
  )
}
