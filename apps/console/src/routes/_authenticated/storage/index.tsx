import z from 'zod'
import { createFileRoute } from '@tanstack/react-router'
import { StorageIntegration } from '@/features/storage'

const storageSearchSchema = z.object({
  type: z
    .enum(['all', 'Archive', 'CDN'])
    .optional()
    .catch(undefined),
  filter: z.string().optional().catch(''),
  sort: z.enum(['asc', 'desc']).optional().catch(undefined),
})

export const Route = createFileRoute('/_authenticated/storage/')({
  validateSearch: storageSearchSchema,
  component: StorageIntegration,
})
