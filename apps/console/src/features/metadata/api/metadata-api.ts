import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { springApiClient } from '@/features/spring-auth/api-client';
import { mockMetadataStore } from '../data/mock-metadata';
import type {
  AttributeDefinition,
  CreateAttributeDefinitionDto,
  CreateEntityRecordDto,
  CreateEntityTypeDto,
  EntityRecord,
  EntityType,
  PageRequestParams,
  PageResponse,
  UpdateAttributeDefinitionDto,
  UpdateEntityRecordDto,
  UpdateEntityTypeDto,
} from './types';

const BASE_URL = '/v1/metadata';

// ==========================================
// 1. Entity Types
// ==========================================

export const useEntityTypes = (params?: PageRequestParams) => {
  return useQuery({
    queryKey: ['metadata', 'entity-types', params],
    queryFn: async (): Promise<PageResponse<EntityType>> => {
      try {
        const res = await springApiClient.get<PageResponse<EntityType>>(`${BASE_URL}/entity-types`, {
          params: {
            number: params?.number || 1,
            size: params?.size || 10,
            sort: params?.sort,
          },
        });
        return res.data;
      } catch {
        return mockMetadataStore.getEntityTypes(params);
      }
    },
    staleTime: 60 * 1000,
  });
};

export const useEntityType = (id: string | number | null) => {
  return useQuery({
    queryKey: ['metadata', 'entity-type', id],
    queryFn: async (): Promise<EntityType | null> => {
      if (!id) return null;
      try {
        const res = await springApiClient.get<EntityType>(`${BASE_URL}/entity-types/${id}`);
        return res.data;
      } catch {
        const fallback = mockMetadataStore.getEntityTypeById(id);
        return fallback || null;
      }
    },
    enabled: Boolean(id),
  });
};

export const useCreateEntityType = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (dto: CreateEntityTypeDto): Promise<EntityType> => {
      try {
        const res = await springApiClient.post<EntityType>(`${BASE_URL}/entity-types`, dto);
        return res.data;
      } catch {
        return mockMetadataStore.createEntityType(dto);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['metadata', 'entity-types'] });
    },
  });
};

export const useUpdateEntityType = (id: string | number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (dto: UpdateEntityTypeDto): Promise<EntityType> => {
      try {
        const res = await springApiClient.put<EntityType>(`${BASE_URL}/entity-types/${id}`, dto);
        return res.data;
      } catch {
        return mockMetadataStore.updateEntityType(id, dto);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['metadata', 'entity-types'] });
      queryClient.invalidateQueries({ queryKey: ['metadata', 'entity-type', id] });
    },
  });
};

export const useDeleteEntityType = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string | number): Promise<boolean> => {
      try {
        await springApiClient.delete(`${BASE_URL}/entity-types/${id}`);
        return true;
      } catch {
        return mockMetadataStore.deleteEntityType(id);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['metadata', 'entity-types'] });
    },
  });
};

// ==========================================
// 2. Attribute Definitions
// ==========================================

export const useAttributeDefinitions = (
  entityTypeId: string | number | null,
  params?: PageRequestParams
) => {
  return useQuery({
    queryKey: ['metadata', 'attributes', entityTypeId, params],
    queryFn: async (): Promise<PageResponse<AttributeDefinition>> => {
      if (!entityTypeId) {
        return { content: [], totalElements: 0, totalPages: 0, number: 1, size: 10 };
      }
      try {
        const res = await springApiClient.get<PageResponse<AttributeDefinition>>(
          `${BASE_URL}/entity-types/${entityTypeId}/attributes`,
          {
            params: {
              number: params?.number || 1,
              size: params?.size || 50,
              sort: params?.sort,
            },
          }
        );
        return res.data;
      } catch {
        return mockMetadataStore.getAttributeDefinitions(entityTypeId, params);
      }
    },
    enabled: Boolean(entityTypeId),
    staleTime: 30 * 1000,
  });
};

export const useCreateAttributeDefinition = (entityTypeId: string | number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (dto: CreateAttributeDefinitionDto): Promise<AttributeDefinition> => {
      try {
        const res = await springApiClient.post<AttributeDefinition>(
          `${BASE_URL}/entity-types/${entityTypeId}/attributes`,
          dto
        );
        return res.data;
      } catch {
        return mockMetadataStore.createAttribute(entityTypeId, dto);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['metadata', 'attributes', entityTypeId] });
    },
  });
};

export const useUpdateAttributeDefinition = (entityTypeId: string | number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      attributeId,
      dto,
    }: {
      attributeId: string | number;
      dto: UpdateAttributeDefinitionDto;
    }): Promise<AttributeDefinition> => {
      try {
        const res = await springApiClient.put<AttributeDefinition>(
          `${BASE_URL}/entity-types/${entityTypeId}/attributes/${attributeId}`,
          dto
        );
        return res.data;
      } catch {
        return mockMetadataStore.updateAttribute(entityTypeId, attributeId, dto);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['metadata', 'attributes', entityTypeId] });
    },
  });
};

export const useDeleteAttributeDefinition = (entityTypeId: string | number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (attributeId: string | number): Promise<boolean> => {
      try {
        await springApiClient.delete(
          `${BASE_URL}/entity-types/${entityTypeId}/attributes/${attributeId}`
        );
        return true;
      } catch {
        return mockMetadataStore.deleteAttribute(entityTypeId, attributeId);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['metadata', 'attributes', entityTypeId] });
    },
  });
};

// ==========================================
// 3. Entity Records
// ==========================================

export const useEntityRecords = (
  entityTypeId: string | number | null,
  params?: PageRequestParams
) => {
  return useQuery({
    queryKey: ['metadata', 'records', entityTypeId, params],
    queryFn: async (): Promise<PageResponse<EntityRecord>> => {
      if (!entityTypeId) {
        return { content: [], totalElements: 0, totalPages: 0, number: 1, size: 10 };
      }
      try {
        const res = await springApiClient.get<PageResponse<EntityRecord>>(
          `${BASE_URL}/entity-types/${entityTypeId}/records`,
          {
            params: {
              number: params?.number || 1,
              size: params?.size || 10,
              sort: params?.sort,
            },
          }
        );
        return res.data;
      } catch {
        return mockMetadataStore.getEntityRecords(entityTypeId, params);
      }
    },
    enabled: Boolean(entityTypeId),
    staleTime: 30 * 1000,
  });
};

export const useCreateEntityRecord = (entityTypeId: string | number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (dto: CreateEntityRecordDto): Promise<EntityRecord> => {
      try {
        const res = await springApiClient.post<EntityRecord>(
          `${BASE_URL}/entity-types/${entityTypeId}/records`,
          dto
        );
        return res.data;
      } catch {
        return mockMetadataStore.createRecord(entityTypeId, dto);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['metadata', 'records', entityTypeId] });
    },
  });
};

export const useUpdateEntityRecord = (entityTypeId: string | number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      recordId,
      dto,
    }: {
      recordId: string | number;
      dto: UpdateEntityRecordDto;
    }): Promise<EntityRecord> => {
      try {
        const res = await springApiClient.put<EntityRecord>(
          `${BASE_URL}/entity-types/${entityTypeId}/records/${recordId}`,
          dto
        );
        return res.data;
      } catch {
        return mockMetadataStore.updateRecord(entityTypeId, recordId, dto);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['metadata', 'records', entityTypeId] });
    },
  });
};

export const useDeleteEntityRecord = (entityTypeId: string | number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (recordId: string | number): Promise<boolean> => {
      try {
        await springApiClient.delete(
          `${BASE_URL}/entity-types/${entityTypeId}/records/${recordId}`
        );
        return true;
      } catch {
        return mockMetadataStore.deleteRecord(entityTypeId, recordId);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['metadata', 'records', entityTypeId] });
    },
  });
};
