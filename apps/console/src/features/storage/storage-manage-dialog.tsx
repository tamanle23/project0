import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Play } from 'lucide-react'
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
  onUpdateProvider?: (provider: StorageProvider) => void
}

export function StorageManageDialog({
  open,
  onOpenChange,
  provider,
  onUpdateProvider,
}: StorageManageDialogProps) {
  const { t } = useTranslation('console')
  const [isTesting, setIsTesting] = useState(false)

  if (!provider) return null

  const handleTestConnection = () => {
    setIsTesting(true)
    setTimeout(() => {
      setIsTesting(false)
      toast.success(t('storage.toasts.connectionSuccess', 'Connection successful!'))
      if (provider.lifecycleStatus === 'Draft' && onUpdateProvider) {
        onUpdateProvider({ ...provider, lifecycleStatus: 'Live' })
      }
    }, 1000)
  }

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

        <DialogFooter className='flex-col sm:flex-row sm:justify-between items-center gap-2'>
          <Button
            variant='secondary'
            onClick={handleTestConnection}
            disabled={isTesting}
            className='w-full sm:w-auto bg-blue-500/10 text-blue-700 hover:bg-blue-500/20 dark:text-blue-300 dark:hover:bg-blue-500/30'
          >
            {isTesting ? (
              <span className='animate-pulse'>{t('storage.actions.testing', 'Testing...')}</span>
            ) : (
              <>
                <Play className='mr-2 size-4' />
                {t('storage.actions.testConnection', 'Test Connection')}
              </>
            )}
          </Button>
          <div className='flex gap-2 w-full sm:w-auto'>
            <Button variant='outline' onClick={() => onOpenChange(false)} className='w-full sm:w-auto'>
              {t('storage.actions.cancel', 'Cancel')}
            </Button>
            <Button onClick={handleSave} className='w-full sm:w-auto'>
              {t('storage.actions.save', 'Save Changes')}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
