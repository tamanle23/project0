import {
  useEntityTypes as useEntityTypesPage,
  useAttributeDefinitions as useAttributeDefinitionsPage,
  useEntityRecords as useEntityRecordsPage,
} from '@/features/metadata';

// Re-export modern metadata types and hooks
export * from '@/features/metadata';

/**
 * Backward compatibility wrapper returning raw arrays for legacy components
 */
export const useEntityTypes = () => {
  const query = useEntityTypesPage();
  return {
    ...query,
    data: query.data?.content || [],
  };
};

export const useAttributeDefinitions = (entityTypeId: string | number) => {
  const query = useAttributeDefinitionsPage(entityTypeId);
  return {
    ...query,
    data: query.data?.content || [],
  };
};

export const useEntityRecords = (entityTypeId: string | number) => {
  const query = useEntityRecordsPage(entityTypeId);
  return {
    ...query,
    data: query.data?.content || [],
  };
};
