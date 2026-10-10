import { createFileRoute } from '@tanstack/react-router';
import { WorkspacesPanel } from '@/features/settings/workspaces';

export const Route = createFileRoute('/_authenticated/settings/workspaces')({
  component: WorkspacesPanel,
});
