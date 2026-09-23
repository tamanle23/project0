import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Plus } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { useProfile } from '@/context/profile-provider'
import type { StorageProvider, WorkspaceAssignment } from './data/storages'
import { toast } from 'sonner'

interface StorageAssignmentsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  provider: StorageProvider | null
}

export function StorageAssignmentsDialog({
  open,
  onOpenChange,
  provider,
}: StorageAssignmentsDialogProps) {
  const { t } = useTranslation('console')
  const { profiles } = useProfile()
  const [assignments, setAssignments] = useState<WorkspaceAssignment[]>([])

  useEffect(() => {
    if (provider && provider.assignedWorkspaces !== 'all') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setAssignments([...provider.assignedWorkspaces])
    }
  }, [provider, open])

  if (!provider) return null

  const handleAssign = (workspaceId: string) => {
    setAssignments((prev) => [...prev, { workspaceId, enabled: true }])
  }

  const handleToggleEnable = (workspaceId: string, enabled: boolean) => {
    setAssignments((prev) =>
      prev.map((a) => (a.workspaceId === workspaceId ? { ...a, enabled } : a))
    )
  }

  const handleSave = () => {
    toast.success(t('storage.toasts.saved', 'Settings saved successfully'))
    onOpenChange(false)
  }

  const assignedSet = new Set(assignments.map((a) => a.workspaceId))
  const unassignedProfiles = profiles.filter(
    (p) => !assignedSet.has(p.id ?? p.name)
  )
  const assignedProfiles = profiles.filter((p) =>
    assignedSet.has(p.id ?? p.name)
  )

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[500px] bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-xl shadow-black/10'>
        <DialogHeader>
          <DialogTitle>
            {t('storage.assignments.title', 'Workspace Assignments')} -{' '}
            {provider.name}
          </DialogTitle>
          <DialogDescription>
            {t(
              'storage.assignments.description',
              'Assign this storage provider to workspaces and manage its enabled state.'
            )}
          </DialogDescription>
        </DialogHeader>

        <div className='py-4 space-y-6'>
          {assignedProfiles.length > 0 && (
            <div className='space-y-3'>
              <h4 className='text-sm font-medium text-foreground'>
                {t('storage.assignments.assigned', 'Assigned Workspaces')}
              </h4>
              <ul className='space-y-2'>
                {assignedProfiles.map((profile) => {
                  const assignment = assignments.find(
                    (a) => a.workspaceId === (profile.id ?? profile.name)
                  )
                  return (
                    <li
                      key={profile.id ?? profile.name}
                      className='flex items-center justify-between p-3 rounded-lg border border-white/20 bg-background/50 shadow-xs'
                    >
                      <div className='flex items-center gap-3'>
                        <div className='flex size-8 items-center justify-center rounded-md border border-white/20 bg-background/50 shadow-xs'>
                          {profile.logo ? (
                            <profile.logo className='size-4 shrink-0' />
                          ) : null}
                        </div>
                        <span className='text-sm font-medium'>
                          {profile.name}
                        </span>
                      </div>
                      <div className='flex items-center gap-3'>
                        <span className='text-xs text-muted-foreground'>
                          {assignment?.enabled
                            ? t('storage.assignments.enabled', 'Enabled')
                            : t('storage.assignments.disabled', 'Disabled')}
                        </span>
                        <Switch
                          checked={assignment?.enabled ?? false}
                          onCheckedChange={(checked) =>
                            handleToggleEnable(
                              profile.id ?? profile.name,
                              checked
                            )
                          }
                        />
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>
          )}

          {unassignedProfiles.length > 0 && (
            <div className='space-y-3'>
              <h4 className='text-sm font-medium text-foreground'>
                {t('storage.assignments.unassigned', 'Unassigned Workspaces')}
              </h4>
              <ul className='space-y-2'>
                {unassignedProfiles.map((profile) => (
                  <li
                    key={profile.id ?? profile.name}
                    className='flex items-center justify-between p-3 rounded-lg border border-white/20 bg-background/50 shadow-xs'
                  >
                    <div className='flex items-center gap-3'>
                      <div className='flex size-8 items-center justify-center rounded-md border border-white/20 bg-background/50 shadow-xs'>
                        {profile.logo ? (
                          <profile.logo className='size-4 shrink-0' />
                        ) : null}
                      </div>
                      <span className='text-sm font-medium'>
                        {profile.name}
                      </span>
                    </div>
                    <Button
                      variant='outline'
                      size='sm'
                      className='h-7 text-xs'
                      onClick={() => handleAssign(profile.id ?? profile.name)}
                    >
                      <Plus className='mr-1 size-3' />
                      {t('storage.actions.assign', 'Assign')}
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant='outline' onClick={() => onOpenChange(false)}>
            {t('storage.actions.cancel', 'Cancel')}
          </Button>
          <Button onClick={handleSave}>
            {t('storage.actions.save', 'Save Changes')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
