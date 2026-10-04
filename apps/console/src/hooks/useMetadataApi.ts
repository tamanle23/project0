import { useQuery } from '@tanstack/react-query';

// Simulated API calls for demonstration
const mockApi = {
  getEntityTypes: async () => [{ id: '1', name: 'Product', systemName: 'product' }],
  getAttributes: async (_entityTypeId: string) => [
    { id: '1', name: 'Title', systemName: 'title', uiComponent: 'text', isRequired: true }
  ],
  getRecords: async (_entityTypeId: string) => [
    { id: '1', attributes: { title: 'Smartphone' } }
  ]
};

export const useEntityTypes = () => {
  return useQuery({
    queryKey: ['entity-types'],
    queryFn: mockApi.getEntityTypes,
  });
};

export const useAttributeDefinitions = (entityTypeId: string) => {
  return useQuery({
    queryKey: ['attributes', entityTypeId],
    queryFn: () => mockApi.getAttributes(entityTypeId),
    enabled: !!entityTypeId,
  });
};

export const useEntityRecords = (entityTypeId: string) => {
  return useQuery({
    queryKey: ['entity-records', entityTypeId],
    queryFn: () => mockApi.getRecords(entityTypeId),
    enabled: !!entityTypeId,
  });
};
