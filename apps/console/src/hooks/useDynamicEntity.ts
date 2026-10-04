import { useQuery } from '@tanstack/react-query';

// Dummy fetch function for demonstration purposes
const fetchDynamicEntity = async (entityId: string) => {
  const response = await fetch(`/api/metadata/entities/${entityId}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const useDynamicEntity = (entityId: string) => {
  return useQuery({
    queryKey: ['dynamicEntity', entityId],
    queryFn: () => fetchDynamicEntity(entityId),
    enabled: !!entityId,
  });
};
