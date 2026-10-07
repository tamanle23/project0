import type { SandboxRouteHandler, SandboxRequest } from '../types';
import { mockMetadataStore } from '../../../features/metadata/data/mock-metadata';
import { useSandboxStore } from '../store/sandbox-store';

/**
 * MetadataSandboxAdapter: Bridges incoming metadata API requests (/api/metadata/*)
 * to the battle-tested mockMetadataStore while respecting active tenant context.
 */
export const metadataSandboxAdapter: SandboxRouteHandler = {
  id: 'metadata-sandbox-adapter',
  name: 'Metadata Platform Sandbox Adapter',
  description: 'Routes /api/metadata/* queries to mockMetadataStore with tenant context',
  priority: 90,
  matcher: (ctx) => ctx.pathname.startsWith('/api/metadata'),
  handler: async (req: SandboxRequest, ctx) => {
    const { pathname, searchParams } = ctx;
    const activeTenantId = useSandboxStore.getState().activeTenantId;

    // Sub-path after /api/metadata
    const subPath = pathname.replace(/^\/api\/metadata/, '');

    // 1. Entity Types: /api/metadata/entity-types
    if (subPath === '/entity-types' || subPath === '/entity-types/') {
      if (req.method === 'GET') {
        const page = parseInt(searchParams.get('page') || '0', 10);
        const size = parseInt(searchParams.get('size') || '50', 10);
        const data = await mockMetadataStore.getEntityTypes({ page, size });
        return { status: 200, data };
      }
      if (req.method === 'POST') {
        const created = await mockMetadataStore.createEntityType(req.data);
        return { status: 201, data: created };
      }
    }

    // 2. Entity Type Detail / Schema: /api/metadata/entity-types/:id
    const typeMatch = subPath.match(/^\/entity-types\/([^/]+)$/);
    if (typeMatch) {
      const typeId = typeMatch[1];
      if (req.method === 'GET') {
        const entityType = await mockMetadataStore.getEntityTypeById(typeId);
        if (!entityType) return { status: 404, data: { message: 'Entity type not found' } };
        return { status: 200, data: entityType };
      }
      if (req.method === 'PUT') {
        const updated = await mockMetadataStore.updateEntityType(typeId, req.data);
        return { status: 200, data: updated };
      }
      if (req.method === 'DELETE') {
        const deleted = await mockMetadataStore.deleteEntityType(typeId);
        return { status: 200, data: { success: deleted } };
      }
    }

    // 3. Compiled Schema: /api/metadata/entity-types/:id/compiled-schema
    const schemaMatch = subPath.match(/^\/entity-types\/([^/]+)\/compiled-schema$/);
    if (schemaMatch && req.method === 'GET') {
      const compiled = await mockMetadataStore.getCompiledSchema(schemaMatch[1]);
      return { status: 200, data: compiled };
    }

    // 4. Schema Drift Analysis: /api/metadata/entity-types/:id/drift-analysis
    const driftMatch = subPath.match(/^\/entity-types\/([^/]+)\/drift-analysis$/);
    if (driftMatch && req.method === 'GET') {
      const drift = await mockMetadataStore.getSchemaDriftAnalysis(driftMatch[1]);
      return { status: 200, data: drift };
    }

    // 5. Schema Backfill: /api/metadata/entity-types/:id/backfill
    const backfillMatch = subPath.match(/^\/entity-types\/([^/]+)\/backfill$/);
    if (backfillMatch && req.method === 'POST') {
      const batchSize = req.data?.batchSize || 100;
      const res = await mockMetadataStore.executeSchemaBackfill(backfillMatch[1], batchSize);
      return { status: 200, data: res };
    }

    // 6. Entity Records: /api/metadata/entity-types/:id/records
    const recordsMatch = subPath.match(/^\/entity-types\/([^/]+)\/records$/);
    if (recordsMatch) {
      const typeId = recordsMatch[1];
      if (req.method === 'GET') {
        const page = parseInt(searchParams.get('page') || '0', 10);
        const size = parseInt(searchParams.get('size') || '50', 10);
        const sort = searchParams.get('sort') || undefined;
        const tenantId = searchParams.get('tenantId') || activeTenantId;

        // Parse query filters
        const filters: Record<string, any> = {};
        for (const [key, value] of searchParams.entries()) {
          if (!['page', 'size', 'sort', 'tenantId'].includes(key)) {
            if (value.includes(',')) {
              filters[key] = { in: value };
            } else {
              filters[key] = { eq: value };
            }
          }
        }

        const data = await mockMetadataStore.getEntityRecords(typeId, {
          page,
          size,
          sort,
          tenantId,
          filters: Object.keys(filters).length > 0 ? filters : undefined,
        });
        return { status: 200, data };
      }

      if (req.method === 'POST') {
        const created = await mockMetadataStore.createEntityRecord(typeId, {
          ...req.data,
          tenantId: req.data?.tenantId || activeTenantId,
        });
        return { status: 201, data: created };
      }
    }

    // 7. Fallback to generic not found for unregistered metadata paths
    return {
      status: 404,
      statusText: 'Not Found',
      data: { message: `Metadata sandbox endpoint not mapped: ${pathname}` },
    };
  },
};
