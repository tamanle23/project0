import { ContentSection } from '../components/content-section';
import { DataPrivacyPanel } from './data-privacy-panel';

export function SettingsDataPrivacy() {
  return (
    <ContentSection
      title="Data & Compliance"
      desc="Export portable tenant data archives (GDPR Art. 20) and perform verified Right-to-be-Forgotten erasures (GDPR Art. 17)."
    >
      <DataPrivacyPanel />
    </ContentSection>
  );
}

export { DataPrivacyPanel };
