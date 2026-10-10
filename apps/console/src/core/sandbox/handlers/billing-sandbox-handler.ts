import type { SandboxRouteHandler, SandboxRequest } from '../types';
import { useSandboxStore } from '../store/sandbox-store';

interface TenantBillingRecord {
  tenantId: string;
  planTier: 'BASIC' | 'PRO' | 'PRO_MAX';
  billingCadence: 'MONTHLY' | 'YEARLY';
  status: 'ACTIVE' | 'EXPIRED' | 'PENDING';
  amountPaid: number;
  expiresAt: string | null;
  entitledFeatures: string[];
}

// In-memory tenant billing repository partitioned by tenantId
const mockBillingStore = new Map<string, TenantBillingRecord>();

// Seed default tenant with PRO features in sandbox for seamless testing
mockBillingStore.set('default-tenant', {
  tenantId: 'default-tenant',
  planTier: 'PRO',
  billingCadence: 'MONTHLY',
  status: 'ACTIVE',
  amountPaid: 199000,
  expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
  entitledFeatures: [
    'FEATURE_METADATA_READ',
    'FEATURE_RECORDS_CRUD',
    'FEATURE_SCHEMA_STUDIO',
    'FEATURE_PATTERN_C_GRAPH',
    'FEATURE_DATA_EXPORT',
  ],
});

export const billingSandboxHandler: SandboxRouteHandler = {
  id: 'billing-sandbox-handler',
  name: 'Billing & payOS Sandbox Handler',
  description: 'Simulates payOS VietQR payment links, webhooks, and dynamic tenant feature entitlements',
  priority: 95,
  matcher: (ctx) =>
    ctx.pathname.startsWith('/api/v1/billing') ||
    ctx.pathname.startsWith('/api/billing'),
  handler: async (req: SandboxRequest, ctx) => {
    const { pathname } = ctx;
    const activeTenantId = useSandboxStore.getState().activeTenantId || 'default-tenant';
    const subPath = pathname.replace(/^\/(api\/v1\/billing|api\/billing)/, '');

    // 1. GET /summary
    if (subPath === '/summary' || subPath === '/summary/') {
      if (req.method === 'GET') {
        const record = mockBillingStore.get(activeTenantId) || {
          tenantId: activeTenantId,
          planTier: 'BASIC',
          billingCadence: 'MONTHLY',
          status: 'ACTIVE',
          amountPaid: 0,
          expiresAt: null,
          entitledFeatures: ['FEATURE_METADATA_READ', 'FEATURE_RECORDS_CRUD'],
        };
        return { status: 200, data: record };
      }
    }

    // 2. POST /checkout
    if (subPath === '/checkout' || subPath === '/checkout/') {
      if (req.method === 'POST') {
        const { planTier = 'PRO', cadence = 'MONTHLY' } = req.data || {};
        const orderCode = Date.now();
        const amount =
          planTier === 'PRO_MAX'
            ? cadence === 'YEARLY'
              ? 4990000
              : 499000
            : cadence === 'YEARLY'
            ? 1990000
            : 199000;

        const description = `UNIPOST ${planTier} ${cadence}`;

        return {
          status: 200,
          data: {
            orderCode,
            amount,
            description,
            checkoutUrl: `https://pay.payos.vn/web/${orderCode}`,
            qrCode: `00020101021238540010A00000072701240006970422011003456789100208QRIBFTTA5204${amount}53037045802VN5912UNIPOST CORP6008HANOI62200804${description}6304`,
            status: 'PENDING',
          },
        };
      }
    }

    // 3. POST /payos/webhook
    if (subPath === '/payos/webhook' || subPath === '/payos/webhook/') {
      if (req.method === 'POST') {
        const data = req.data?.data || {};
        const amount = data.amount || 199000;
        const planTier = amount >= 499000 ? 'PRO_MAX' : 'PRO';

        const features =
          planTier === 'PRO_MAX'
            ? [
                'FEATURE_METADATA_READ',
                'FEATURE_RECORDS_CRUD',
                'FEATURE_SCHEMA_STUDIO',
                'FEATURE_PATTERN_C_GRAPH',
                'FEATURE_DATA_EXPORT',
                'FEATURE_AI_AGENT_MCP',
                'FEATURE_STATE_MACHINE',
                'FEATURE_STREAMING_EXPORT',
              ]
            : [
                'FEATURE_METADATA_READ',
                'FEATURE_RECORDS_CRUD',
                'FEATURE_SCHEMA_STUDIO',
                'FEATURE_PATTERN_C_GRAPH',
                'FEATURE_DATA_EXPORT',
              ];

        mockBillingStore.set(activeTenantId, {
          tenantId: activeTenantId,
          planTier,
          billingCadence: 'MONTHLY',
          status: 'ACTIVE',
          amountPaid: amount,
          expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          entitledFeatures: features,
        });

        return {
          status: 200,
          data: { status: 'success', message: 'Webhook simulated and entitlements granted' },
        };
      }
    }

    return null;
  },
};
