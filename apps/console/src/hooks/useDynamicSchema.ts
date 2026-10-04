import { useQuery } from '@tanstack/react-query';

// Mocked fetcher for demonstration. In a real app, this calls an API.
const fetchSchema = async (entityTypeId: string) => {
  return {
    entityTypeId,
    fields: [
      { name: 'title', uiComponent: 'text', isRequired: true },
      { name: 'description', uiComponent: 'textarea', isRequired: false },
      { name: 'status', uiComponent: 'select', isRequired: true, options: { choices: ['active', 'inactive'] } }
    ]
  };
};

export const useDynamicSchema = (entityTypeId: string) => {
  return useQuery({
    queryKey: ['schema', entityTypeId],
    queryFn: () => fetchSchema(entityTypeId),
    enabled: !!entityTypeId,
    staleTime: 5 * 60 * 1000, // 5 minutes caching on frontend
  });
};
