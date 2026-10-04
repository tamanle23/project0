import { useQuery } from '@tanstack/react-query';

// Mocked fetcher for demonstration.
const fetchEntity = async (entityId: string) => {
  return {
    id: entityId,
    entityTypeId: '123',
    attributes: {
      title: 'Sample Entity',
      status: 'active'
    }
  };
};

export const useDynamicEntity = (entityId: string) => {
  return useQuery({
    queryKey: ['entity', entityId],
    queryFn: () => fetchEntity(entityId),
    enabled: !!entityId,
  });
};
