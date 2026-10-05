import { z } from 'zod';
import { createFileRoute } from '@tanstack/react-router';
import { Metadata } from '@/features/metadata';

const metadataSearchSchema = z.object({
  model: z.string().optional(),
  tab: z.enum(['schema', 'data']).optional(),
});

export const Route = createFileRoute('/_authenticated/metadata/')({
  validateSearch: metadataSearchSchema,
  component: Metadata,
});
