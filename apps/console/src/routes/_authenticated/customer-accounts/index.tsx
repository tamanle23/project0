import { createFileRoute } from '@tanstack/react-router';
import { CustomerAccountsExplorer } from '@/features/metadata/components/customer-accounts-explorer';

export const Route = createFileRoute('/_authenticated/customer-accounts/')({
  component: CustomerAccountsExplorer,
});
