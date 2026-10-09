import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { httpMetadataService } from './http-metadata-service';
import type { BlueprintProvisionRequest, BlueprintProvisionResult, BlueprintSummary } from './types';

export function useBlueprintCatalog() {
  return useQuery<BlueprintSummary[]>({
    queryKey: ['blueprints-catalog'],
    queryFn: async () => {
      return await httpMetadataService.getBlueprints();
    },
    staleTime: 1000 * 60 * 30, // 30 minutes
  });
}

export function useProvisionTenant() {
  const queryClient = useQueryClient();
  return useMutation<BlueprintProvisionResult, Error, BlueprintProvisionRequest>({
    mutationFn: async (payload: BlueprintProvisionRequest) => {
      return await httpMetadataService.provisionTenant(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['entity-types'] });
      queryClient.invalidateQueries({ queryKey: ['relationship-types'] });
    },
  });
}
