import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'react-i18next'
import { showSubmittedData } from '@/lib/show-submitted-data'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'

const accountFormSchema = z.object({
  // Add account settings here
})

type AccountFormValues = z.infer<typeof accountFormSchema>

export function AccountForm() {
  const { t } = useTranslation(['console', 'common'])
  
  const isServerSide = false

  const defaultValues: Partial<AccountFormValues> = {}

  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues,
  })

  function onSubmit(data: AccountFormValues) {
    showSubmittedData(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <div className='text-sm text-muted-foreground'>
          Account settings will appear here.
        </div>
        {isServerSide && <Button type='submit'>{t('common:update', 'Update')}</Button>}
      </form>
    </Form>
  )
}
