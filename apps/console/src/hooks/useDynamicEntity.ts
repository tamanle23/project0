import { useEntityRecords } from '@/features/metadata';

export const useDynamicEntity = (entityId: string, entityTypeId?: string) => {
  const query = useEntityRecords(entityTypeId || '1');
  const record = query.data?.content.find((r) => String(r.id) === String(entityId));

  return {
    ...query,
    data: record,
  };
};
