import { describe, it, expect, beforeEach } from 'vitest';
import { mockMetadataStore } from '../data/mock-metadata';

describe('Domain Blueprint Catalog & Provisioning Service', () => {
  beforeEach(() => {
    mockMetadataStore.resetToInitialState();
  });

  it('should list all 4 built-in domain blueprints from catalog', async () => {
    const blueprints = await mockMetadataStore.getBlueprints();

    expect(blueprints).toBeDefined();
    expect(blueprints.length).toBe(4);

    const ids = blueprints.map((b) => b.id);
    expect(ids).toContain('bp_cms_publishing_v1');
    expect(ids).toContain('bp_logistics_v1');
    expect(ids).toContain('bp_crm_billing_v1');
    expect(ids).toContain('bp_blank_v1');
  });

  it('should provision a workspace tenant from selected blueprint manifest', async () => {
    const result = await mockMetadataStore.provisionTenant({
      tenantId: 'tenant-test-beta',
      tenantName: 'Test Beta Corp',
      blueprintId: 'bp_logistics_v1',
    });

    expect(result).toBeDefined();
    expect(result.tenantId).toBe('tenant-test-beta');
    expect(result.tenantName).toBe('Test Beta Corp');
    expect(result.blueprintId).toBe('bp_logistics_v1');
    expect(result.createdEntityTypesCount).toBeGreaterThan(0);
    expect(result.executionTimeMs).toBeLessThan(250);
  });
});
