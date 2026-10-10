import { createFileRoute } from '@tanstack/react-router';
import { BillingPanel } from '@/features/settings/billing';

export const Route = createFileRoute('/_authenticated/settings/billing')({
  component: BillingPanel,
});
