import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const api = axios.create({
  baseURL: '/api/v1/metadata',
});

export const useEntityTypes = () => {
  return useQuery({
    queryKey: ['entity-types'],
    queryFn: async () => {
      const res = await api.get('/entity-types');
      return res.data.content || [];
    },
  });
};

export const useAttributeDefinitions = (entityTypeId: string) => {
  return useQuery({
    queryKey: ['attributes', entityTypeId],
    queryFn: async () => {
        const res = await api.get(`/entity-types/${entityTypeId}/attributes`);
        return res.data.content || [];
    },
    enabled: !!entityTypeId,
  });
};

export const useEntityRecords = (entityTypeId: string) => {
  return useQuery({
    queryKey: ['entity-records', entityTypeId],
    queryFn: async () => {
        const res = await api.get(`/entity-types/${entityTypeId}/records`);
        return res.data.content || [];
    },
    enabled: !!entityTypeId,
  });
};
