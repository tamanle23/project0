import { createFileRoute } from '@tanstack/react-router';
import { SettingsDataPrivacy } from '@/features/settings/data-privacy';

export const Route = createFileRoute('/_authenticated/settings/data-privacy')({
  component: SettingsDataPrivacy,
});
