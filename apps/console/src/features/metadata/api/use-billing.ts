import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useMetadataUiStore } from '../store/use-metadata-ui-store';

export interface TenantBillingSummary {
  tenantId: string;
  planTier: 'BASIC' | 'PRO' | 'PRO_MAX';
  billingCadence: 'MONTHLY' | 'YEARLY';
  status: 'ACTIVE' | 'EXPIRED' | 'PENDING';
  amountPaid: number;
  expiresAt: string | null;
  entitledFeatures: string[];
}

export interface CreatePaymentLinkPayload {
  planTier: 'PRO' | 'PRO_MAX';
  cadence: 'MONTHLY' | 'YEARLY';
  returnUrl?: string;
  cancelUrl?: string;
}

export interface CheckoutResponse {
  orderCode: number;
  amount: number;
  description: string;
  checkoutUrl: string;
  qrCode: string;
  status: string;
}

/**
 * Fetch billing & active feature tokens for the active tenant
 */
export function useTenantBilling() {
  const activeTenantId = useMetadataUiStore((s) => s.activeTenantId);

  return useQuery<TenantBillingSummary>({
    queryKey: ['billing-summary', activeTenantId],
    queryFn: async () => {
      const res = await axios.get('/api/v1/billing/summary');
      return res.data?.data || res.data;
    },
    staleTime: 1000 * 60 * 5, // 5 mins
  });
}

/**
 * Create payOS VietQR payment link
 */
export function useCreatePaymentLink() {
  const queryClient = useQueryClient();
  const activeTenantId = useMetadataUiStore((s) => s.activeTenantId);

  return useMutation<CheckoutResponse, Error, CreatePaymentLinkPayload>({
    mutationFn: async (payload) => {
      const res = await axios.post('/api/v1/billing/checkout', payload);
      return res.data?.data || res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['billing-summary', activeTenantId] });
    },
  });
}

/**
 * Simulate Webhook Payment confirmation (for sandbox / dev testing)
 */
export function useSimulatePaymentWebhook() {
  const queryClient = useQueryClient();
  const activeTenantId = useMetadataUiStore((s) => s.activeTenantId);

  return useMutation<boolean, Error, { orderCode: number; amount: number; planTier: string }>({
    mutationFn: async ({ orderCode, amount, planTier }) => {
      const res = await axios.post('/api/v1/billing/payos/webhook', {
        code: '00',
        desc: 'Success',
        signature: 'mock_signature_ok',
        data: {
          orderCode,
          amount,
          description: `UNIPOST ${planTier} PAYMENT`,
        },
      });
      return res.data?.status === 'success';
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['billing-summary', activeTenantId] });
      queryClient.invalidateQueries({ queryKey: ['entity-types'] });
    },
  });
}
