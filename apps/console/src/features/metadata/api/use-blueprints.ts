import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import type {
  BlueprintManifest,
  BlueprintSummaryDto,
  TenantProvisioningRequest,
  TenantProvisioningResult,
} from './types';
import { toast } from 'sonner';

export const useBlueprintCatalog = () => {
  return useQuery({
    queryKey: ['metadata', 'blueprints'],
    queryFn: async (): Promise<BlueprintSummaryDto[]> => {
      const res = await axios.get('/api/v1/metadata/blueprints');
      // Unwrap standard ResponseWrapper if present
      return res.data?.data || res.data || [];
    },
    staleTime: 30 * 60 * 1000, // 30 minutes
  });
};

export const useBlueprintDetails = (blueprintId: string | null) => {
  return useQuery({
    queryKey: ['metadata', 'blueprint', blueprintId],
    queryFn: async (): Promise<BlueprintManifest | null> => {
      if (!blueprintId) return null;
      const res = await axios.get(`/api/v1/metadata/blueprints/${blueprintId}`);
      return res.data?.data || res.data || null;
    },
    enabled: Boolean(blueprintId),
    staleTime: 30 * 60 * 1000,
  });
};

export const useProvisionTenantBlueprint = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: TenantProvisioningRequest): Promise<TenantProvisioningResult> => {
      const res = await axios.post('/api/v1/metadata/tenants/provision', payload);
      return res.data?.data || res.data;
    },
    onSuccess: (data) => {
      // Invalidate metadata queries so left rail and relationship graphs update immediately
      queryClient.invalidateQueries({ queryKey: ['metadata', 'entity-types'] });
      queryClient.invalidateQueries({ queryKey: ['metadata', 'relationship-types'] });
      toast.success(
        `Workspace initialized with "${data.blueprintName}" (${data.createdEntityTypesCount} models, ${data.createdAttributesCount} fields)`
      );
    },
    onError: (err: any) => {
      const msg = err.response?.data?.message || err.message || 'Failed to provision blueprint';
      toast.error(`Blueprint provisioning failed: ${msg}`);
    },
  });
};
