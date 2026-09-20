import { Check, ChevronsUpDown, Plus } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'
import { useProfile, type Profile } from '@/context/profile-provider'
import { cn } from '@/lib/utils'

type ProfileSwitcherProps = {
  profiles?: Profile[]
}

export function ProfileSwitcher({ profiles: propProfiles }: ProfileSwitcherProps) {
  const { isMobile } = useSidebar()
  const { currentProfile, setCurrentProfile, profiles: contextProfiles } = useProfile()
  const availableProfiles = propProfiles ?? contextProfiles
  const activeProfile = currentProfile ?? availableProfiles[0]

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size='lg'
              className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground transition-all duration-200'
            >
              <div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground shadow-sm'>
                {activeProfile?.logo ? (
                  <activeProfile.logo className='size-4' />
                ) : null}
              </div>
              <div className='grid flex-1 text-start text-sm leading-tight'>
                <span className='truncate font-semibold'>
                  {activeProfile?.name}
                </span>
                <span className='truncate text-xs text-muted-foreground'>
                  {activeProfile?.plan}
                </span>
              </div>
              <ChevronsUpDown className='ms-auto size-4 text-muted-foreground' />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className='w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-xl bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-xl shadow-black/10'
            align='start'
            side={isMobile ? 'bottom' : 'right'}
            sideOffset={4}
          >
            <DropdownMenuLabel className='text-xs font-medium text-muted-foreground'>
              Workspaces & Profiles
            </DropdownMenuLabel>
            {availableProfiles.map((profile, index) => {
              const isSelected =
                (profile.id && profile.id === activeProfile?.id) ||
                profile.name === activeProfile?.name
              return (
                <DropdownMenuItem
                  key={profile.id ?? profile.name}
                  onClick={() => setCurrentProfile(profile)}
                  className={cn(
                    'gap-2 p-2 rounded-lg cursor-pointer transition-colors',
                    isSelected && 'bg-accent/60 font-medium'
                  )}
                >
                  <div className='flex size-6 items-center justify-center rounded-md border border-white/20 bg-background/50 shadow-xs'>
                    {profile.logo ? (
                      <profile.logo className='size-3.5 shrink-0' />
                    ) : null}
                  </div>
                  <div className='flex flex-col flex-1 leading-tight'>
                    <span className='text-sm'>{profile.name}</span>
                    {profile.plan && (
                      <span className='text-[10px] text-muted-foreground'>
                        {profile.plan}
                      </span>
                    )}
                  </div>
                  {isSelected ? (
                    <Check className='size-4 text-primary shrink-0' />
                  ) : (
                    <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
                  )}
                </DropdownMenuItem>
              )
            })}
            <DropdownMenuSeparator className='bg-border/60' />
            <DropdownMenuItem className='gap-2 p-2 rounded-lg cursor-pointer text-muted-foreground hover:text-foreground'>
              <div className='flex size-6 items-center justify-center rounded-md border border-dashed border-border bg-background/50'>
                <Plus className='size-3.5' />
              </div>
              <div className='font-medium text-xs'>Add workspace profile</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
