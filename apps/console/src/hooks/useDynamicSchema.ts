import { useQuery } from '@tanstack/react-query';

// Dummy fetch function for demonstration purposes
const fetchDynamicSchema = async (entityTypeId: string) => {
  const response = await fetch(`/api/metadata/schemas/${entityTypeId}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const useDynamicSchema = (entityTypeId: string) => {
  return useQuery({
    queryKey: ['dynamicSchema', entityTypeId],
    queryFn: () => fetchDynamicSchema(entityTypeId),
    enabled: !!entityTypeId,
  });
};
