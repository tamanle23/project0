import { useTranslation } from 'react-i18next'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type { StorageProvider } from './data/storages'
import { toast } from 'sonner'
import { Label } from '@/components/ui/label'

interface StorageManageDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  provider: StorageProvider | null
}

export function StorageManageDialog({
  open,
  onOpenChange,
  provider,
}: StorageManageDialogProps) {
  const { t } = useTranslation('console')

  if (!provider) return null

  const handleSave = () => {
    toast.success(t('storage.toasts.saved', 'Settings saved successfully'))
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[425px] bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-xl shadow-black/10'>
        <DialogHeader>
          <DialogTitle>
            {t('storage.manage.title', 'Configure Storage')} - {provider.name}
          </DialogTitle>
          <DialogDescription>
            {t(
              'storage.manage.description',
              'Configure settings for this storage provider.'
            )}
          </DialogDescription>
        </DialogHeader>

        <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='bucketName' className='text-right'>
              Bucket
            </Label>
            <Input
              id='bucketName'
              defaultValue='my-app-storage'
              className='col-span-3'
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='apiKey' className='text-right'>
              API Key
            </Label>
            <Input
              id='apiKey'
              defaultValue='••••••••••••••••'
              className='col-span-3'
              type='password'
            />
          </div>
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
