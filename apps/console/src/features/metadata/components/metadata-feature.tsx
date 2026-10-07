import React from 'react';
import { useTranslation } from 'react-i18next';
import { useMetadataUiStore } from '../store/use-metadata-ui-store';
import { useEntityType } from '../api/metadata-api';
import { EntityTypeSidebar } from './entity-type';
import { SchemaBuilder } from './schema-builder';
import { EntityDataGrid } from './data-explorer';
import { RelationshipTypesManager } from './relationships';
import { MetadataDialogs } from './metadata-dialogs';
import { Header } from '@/components/layout/header';
import { Main } from '@/components/layout/main';
import { Search } from '@/components/search';
import { LanguageSwitch } from '@/components/language-switch';
import { ThemeSwitch } from '@/components/theme-switch';
import { ConfigDrawer } from '@/components/config-drawer';
import { ProfileDropdown } from '@/components/profile-dropdown';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Layers, Database, Sparkles, GitFork } from 'lucide-react';

export const MetadataFeature: React.FC = () => {
  const { t } = useTranslation('console');
  const { selectedEntityTypeId, activeTab, setActiveTab } = useMetadataUiStore();
  const { data: activeEntity } = useEntityType(selectedEntityTypeId);

  return (
    <>
      <Header fixed>
        <Search />
        <div className="ms-auto flex items-center space-x-4">
          <LanguageSwitch />
          <ThemeSwitch />
          <ConfigDrawer />
          <ProfileDropdown />
        </div>
      </Header>

      <Main fluid className="flex flex-1 flex-col gap-4 sm:gap-6 min-w-0 w-full overflow-hidden">
        {/* Page Title & Intro */}
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              {t('metadata.title', 'Metadata Management')}
            </h2>
            <p className="text-muted-foreground text-xs md:text-sm">
              {t(
                'metadata.description',
                'Architect flexible data schemas, enforce dynamic validation rules, and manage records.'
              )}
            </p>
          </div>
        </div>

        {/* Liquid Glass Split Workspace */}
        <div className="flex flex-col lg:flex-row gap-6 items-start flex-1 w-full min-w-0">
          {/* Left: Entity Models Rail */}
          <EntityTypeSidebar />

          {/* Right: Active Model Workspace */}
          <div className="flex-1 w-full min-w-0 space-y-4">
            {selectedEntityTypeId && activeEntity ? (
              <div className="space-y-4">
                {/* Active Model Banner */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-white/45 dark:bg-slate-900/45 backdrop-blur-xl border border-white/30 dark:border-white/10 shadow-lg shadow-black/5 dark:shadow-black/25">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-base md:text-lg text-foreground">
                        {activeEntity.name}
                      </span>
                      <code className="text-xs font-mono text-muted-foreground bg-muted/60 dark:bg-white/5 px-2 py-0.5 rounded border border-white/20">
                        {activeEntity.systemName}
                      </code>
                    </div>
                    {activeEntity.description && (
                      <p className="text-xs text-muted-foreground max-w-2xl">
                        {activeEntity.description}
                      </p>
                    )}
                  </div>

                  {/* Schema vs Data vs Relationships Tab Selector */}
                  <Tabs
                    value={activeTab}
                    onValueChange={(val) => setActiveTab(val as 'schema' | 'data' | 'relationships')}
                    className="shrink-0"
                  >
                    <TabsList className="bg-white/50 dark:bg-white/5 border border-white/20">
                      <TabsTrigger value="schema" className="gap-1.5 text-xs">
                        <Layers className="h-3.5 w-3.5" />
                        <span>{t('metadata.tabs.schema', 'Schema Builder')}</span>
                      </TabsTrigger>
                      <TabsTrigger value="data" className="gap-1.5 text-xs">
                        <Database className="h-3.5 w-3.5" />
                        <span>{t('metadata.tabs.data', 'Data Explorer')}</span>
                      </TabsTrigger>
                      <TabsTrigger value="relationships" className="gap-1.5 text-xs">
                        <GitFork className="h-3.5 w-3.5" />
                        <span>{t('metadata.tabs.relationships', 'Connected Edges')}</span>
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>

                {/* Tab Views */}
                {activeTab === 'schema' ? (
                  <SchemaBuilder entityTypeId={selectedEntityTypeId} />
                ) : activeTab === 'data' ? (
                  <EntityDataGrid entityTypeId={selectedEntityTypeId} />
                ) : (
                  <RelationshipTypesManager entityTypeId={selectedEntityTypeId} />
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-16 text-center rounded-2xl bg-white/30 dark:bg-slate-900/30 backdrop-blur-md border border-dashed border-white/30 dark:border-white/10 text-muted-foreground">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-3">
                  <Sparkles className="h-6 w-6" />
                </div>
                <h4 className="font-semibold text-foreground mb-1 text-sm md:text-base">
                  No Entity Model Selected
                </h4>
                <p className="text-xs max-w-sm">
                  Select an entity model from the left rail or create a new model to configure its schema and explore data records.
                </p>
              </div>
            )}
          </div>
        </div>
      </Main>

      <MetadataDialogs />
    </>
  );
};
