import { useAttributeDefinitions } from '@/features/metadata';

export const useDynamicSchema = (entityTypeId: string) => {
  const query = useAttributeDefinitions(entityTypeId);

  return {
    ...query,
    data: query.data
      ? {
          entityTypeId,
          fields: query.data.content,
        }
      : undefined,
  };
};
