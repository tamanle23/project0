import type {
  AttributeDefinition,
  EntityRecord,
  EntityType,
  PageResponse,
  PageRequestParams,
} from '../api/types';

export const initialMockEntityTypes: EntityType[] = [
  {
    id: '1',
    name: 'Customer Account',
    systemName: 'customer_account',
    description: 'Profiles, corporate identities, and billing configurations for enterprise customers.',
    createdDate: new Date('2026-01-10').toISOString(),
    updatedDate: new Date('2026-03-15').toISOString(),
  },
  {
    id: '2',
    name: 'Cloud Resource Specification',
    systemName: 'cloud_resource_spec',
    description: 'Hardware, topology, and regional availability for managed virtual clusters.',
    createdDate: new Date('2026-01-15').toISOString(),
    updatedDate: new Date('2026-03-20').toISOString(),
  },
  {
    id: '3',
    name: 'Deployment Policy',
    systemName: 'deployment_policy',
    description: 'Governance rules, canary thresholds, and cluster isolation directives.',
    createdDate: new Date('2026-02-01').toISOString(),
    updatedDate: new Date('2026-03-25').toISOString(),
  },
];

export const initialMockAttributes: Record<string, AttributeDefinition[]> = {
  '1': [
    {
      id: '101',
      entityTypeId: '1',
      name: 'Account Legal Name',
      systemName: 'legal_name',
      dataType: 'STRING',
      uiComponent: 'text',
      isRequired: true,
      defaultValue: '',
      options: { placeholder: 'e.g. Acme International Corp' },
    },
    {
      id: '102',
      entityTypeId: '1',
      name: 'Primary Contact Email',
      systemName: 'contact_email',
      dataType: 'STRING',
      uiComponent: 'text',
      isRequired: true,
      options: { placeholder: 'admin@acme.com', pattern: '^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$' },
    },
    {
      id: '103',
      entityTypeId: '1',
      name: 'Subscription Tier',
      systemName: 'subscription_tier',
      dataType: 'STRING',
      uiComponent: 'select',
      isRequired: true,
      defaultValue: 'Enterprise',
      options: { choices: ['Starter', 'Professional', 'Enterprise', 'Strategic'] },
    },
    {
      id: '104',
      entityTypeId: '1',
      name: 'Max Compute Allocation (vCPU)',
      systemName: 'max_vcpu_quota',
      dataType: 'INTEGER',
      uiComponent: 'number',
      isRequired: false,
      defaultValue: '64',
      options: { min: 1, max: 2048 },
    },
    {
      id: '105',
      entityTypeId: '1',
      name: 'Multi-Region High Availability',
      systemName: 'is_multi_region_ha',
      dataType: 'BOOLEAN',
      uiComponent: 'switch',
      isRequired: false,
      defaultValue: 'true',
    },
    {
      id: '106',
      entityTypeId: '1',
      name: 'Contract Effective Date',
      systemName: 'contract_effective_date',
      dataType: 'DATE',
      uiComponent: 'datepicker',
      isRequired: false,
    },
    {
      id: '107',
      entityTypeId: '1',
      name: 'Operational Notes',
      systemName: 'operational_notes',
      dataType: 'STRING',
      uiComponent: 'textarea',
      isRequired: false,
      options: { placeholder: 'Special routing rules or custom SLA requirements...' },
    },
  ],
  '2': [
    {
      id: '201',
      entityTypeId: '2',
      name: 'Resource Codename',
      systemName: 'resource_code',
      dataType: 'STRING',
      uiComponent: 'text',
      isRequired: true,
      options: { placeholder: 'e.g. g4-highmem-32' },
    },
    {
      id: '202',
      entityTypeId: '2',
      name: 'vCPU Cores',
      systemName: 'vcpu_cores',
      dataType: 'INTEGER',
      uiComponent: 'number',
      isRequired: true,
      defaultValue: '16',
      options: { min: 1, max: 256 },
    },
    {
      id: '203',
      entityTypeId: '2',
      name: 'RAM (GiB)',
      systemName: 'ram_gib',
      dataType: 'DECIMAL',
      uiComponent: 'number',
      isRequired: true,
      defaultValue: '64.0',
      options: { min: 0.5, max: 2048 },
    },
    {
      id: '204',
      entityTypeId: '2',
      name: 'GPU Enabled',
      systemName: 'gpu_enabled',
      dataType: 'BOOLEAN',
      uiComponent: 'switch',
      isRequired: false,
      defaultValue: 'false',
    },
    {
      id: '205',
      entityTypeId: '2',
      name: 'Hardware Architecture',
      systemName: 'architecture',
      dataType: 'STRING',
      uiComponent: 'select',
      isRequired: true,
      defaultValue: 'arm64',
      options: { choices: ['x86_64', 'arm64', 'riscv64'] },
    },
  ],
  '3': [
    {
      id: '301',
      entityTypeId: '3',
      name: 'Policy Identifier',
      systemName: 'policy_id',
      dataType: 'STRING',
      uiComponent: 'text',
      isRequired: true,
    },
    {
      id: '302',
      entityTypeId: '3',
      name: 'Rollout Strategy',
      systemName: 'rollout_strategy',
      dataType: 'STRING',
      uiComponent: 'select',
      isRequired: true,
      defaultValue: 'Canary',
      options: { choices: ['Rolling', 'Blue-Green', 'Canary', 'Recreate'] },
    },
    {
      id: '303',
      entityTypeId: '3',
      name: 'Strict Zero-Downtime Guarantee',
      systemName: 'strict_zero_downtime',
      dataType: 'BOOLEAN',
      uiComponent: 'switch',
      isRequired: false,
      defaultValue: 'true',
    },
  ],
};

export const initialMockRecords: Record<string, EntityRecord[]> = {
  '1': [
    {
      id: '1001',
      entityTypeId: '1',
      tenantId: 'tenant-us-east-1',
      attributes: {
        legal_name: 'Acme Cloud Services Ltd',
        contact_email: 'ops@acme-cloud.io',
        subscription_tier: 'Strategic',
        max_vcpu_quota: 512,
        is_multi_region_ha: true,
        contract_effective_date: '2026-01-01',
        operational_notes: 'Dedicated direct-connect interconnect via Ashburn DC.',
      },
      createdDate: new Date('2026-01-12').toISOString(),
      updatedDate: new Date('2026-03-01').toISOString(),
    },
    {
      id: '1002',
      entityTypeId: '1',
      tenantId: 'tenant-eu-central-1',
      attributes: {
        legal_name: 'Starlight Telemetry GmbH',
        contact_email: 'infra@starlight.de',
        subscription_tier: 'Enterprise',
        max_vcpu_quota: 256,
        is_multi_region_ha: true,
        contract_effective_date: '2026-02-15',
        operational_notes: 'GDPR strict data locality in Frankfurt zone.',
      },
      createdDate: new Date('2026-02-16').toISOString(),
      updatedDate: new Date('2026-02-20').toISOString(),
    },
    {
      id: '1003',
      entityTypeId: '1',
      tenantId: 'tenant-ap-southeast-1',
      attributes: {
        legal_name: 'CyberWave Logistics Pte',
        contact_email: 'support@cyberwave.sg',
        subscription_tier: 'Professional',
        max_vcpu_quota: 64,
        is_multi_region_ha: false,
        contract_effective_date: '2026-03-01',
        operational_notes: 'Trial sandbox environment awaiting billing conversion.',
      },
      createdDate: new Date('2026-03-02').toISOString(),
      updatedDate: new Date('2026-03-02').toISOString(),
    },
  ],
  '2': [
    {
      id: '2001',
      entityTypeId: '2',
      attributes: {
        resource_code: 'c3-standard-16',
        vcpu_cores: 16,
        ram_gib: 64,
        gpu_enabled: false,
        architecture: 'arm64',
      },
      createdDate: new Date('2026-01-20').toISOString(),
    },
    {
      id: '2002',
      entityTypeId: '2',
      attributes: {
        resource_code: 'g4-gpu-h100-8x',
        vcpu_cores: 96,
        ram_gib: 768,
        gpu_enabled: true,
        architecture: 'x86_64',
      },
      createdDate: new Date('2026-01-22').toISOString(),
    },
  ],
  '3': [
    {
      id: '3001',
      entityTypeId: '3',
      attributes: {
        policy_id: 'POL-PROD-STRICT-001',
        rollout_strategy: 'Canary',
        strict_zero_downtime: true,
      },
      createdDate: new Date('2026-02-05').toISOString(),
    },
  ],
};

// In-Memory Mutable Sandbox State for offline dev / mock fallback
class MockMetadataStore {
  private entityTypes: EntityType[] = [...initialMockEntityTypes];
  private attributes: Record<string, AttributeDefinition[]> = JSON.parse(
    JSON.stringify(initialMockAttributes)
  );
  private records: Record<string, EntityRecord[]> = JSON.parse(
    JSON.stringify(initialMockRecords)
  );

  getEntityTypes(params?: PageRequestParams): PageResponse<EntityType> {
    const page = params?.number && params.number > 0 ? params.number : 1;
    const size = params?.size && params.size > 0 ? params.size : 10;
    const start = (page - 1) * size;
    const end = start + size;
    const content = this.entityTypes.slice(start, end);

    return {
      content,
      totalElements: this.entityTypes.length,
      totalPages: Math.ceil(this.entityTypes.length / size) || 1,
      number: page,
      size,
    };
  }

  getEntityTypeById(id: string | number): EntityType | undefined {
    return this.entityTypes.find((e) => String(e.id) === String(id));
  }

  createEntityType(dto: Partial<EntityType>): EntityType {
    const newId = String(Date.now());
    const entityType: EntityType = {
      id: newId,
      name: dto.name || 'New Entity Type',
      systemName: dto.systemName || `entity_${newId}`,
      description: dto.description || '',
      createdDate: new Date().toISOString(),
      updatedDate: new Date().toISOString(),
    };
    this.entityTypes.push(entityType);
    this.attributes[newId] = [];
    this.records[newId] = [];
    return entityType;
  }

  updateEntityType(id: string | number, dto: Partial<EntityType>): EntityType {
    const index = this.entityTypes.findIndex((e) => String(e.id) === String(id));
    if (index === -1) {
      throw new Error(`EntityType with id ${id} not found`);
    }
    const updated: EntityType = {
      ...this.entityTypes[index],
      ...dto,
      updatedDate: new Date().toISOString(),
    };
    this.entityTypes[index] = updated;
    return updated;
  }

  deleteEntityType(id: string | number): boolean {
    const strId = String(id);
    const beforeCount = this.entityTypes.length;
    this.entityTypes = this.entityTypes.filter((e) => String(e.id) !== strId);
    delete this.attributes[strId];
    delete this.records[strId];
    return this.entityTypes.length < beforeCount;
  }

  getAttributeDefinitions(
    entityTypeId: string | number,
    params?: PageRequestParams
  ): PageResponse<AttributeDefinition> {
    const strId = String(entityTypeId);
    const attrs = this.attributes[strId] || [];
    const page = params?.number && params.number > 0 ? params.number : 1;
    const size = params?.size && params.size > 0 ? params.size : 10;
    const start = (page - 1) * size;
    const end = start + size;
    const content = attrs.slice(start, end);

    return {
      content,
      totalElements: attrs.length,
      totalPages: Math.ceil(attrs.length / size) || 1,
      number: page,
      size,
    };
  }

  createAttribute(
    entityTypeId: string | number,
    dto: Partial<AttributeDefinition>
  ): AttributeDefinition {
    const strId = String(entityTypeId);
    if (!this.attributes[strId]) {
      this.attributes[strId] = [];
    }
    const newId = String(Date.now());
    const newAttr: AttributeDefinition = {
      id: newId,
      entityTypeId: strId,
      name: dto.name || 'New Attribute',
      systemName: dto.systemName || `field_${newId}`,
      dataType: dto.dataType || 'STRING',
      uiComponent: dto.uiComponent || 'text',
      isRequired: Boolean(dto.isRequired),
      isArchived: Boolean(dto.isArchived),
      options: dto.options || {},
      defaultValue: dto.defaultValue || '',
      createdDate: new Date().toISOString(),
      updatedDate: new Date().toISOString(),
    };
    this.attributes[strId].push(newAttr);
    return newAttr;
  }

  updateAttribute(
    entityTypeId: string | number,
    attrId: string | number,
    dto: Partial<AttributeDefinition>
  ): AttributeDefinition {
    const strId = String(entityTypeId);
    const list = this.attributes[strId] || [];
    const index = list.findIndex((a) => String(a.id) === String(attrId));
    if (index === -1) {
      throw new Error(`Attribute with id ${attrId} not found`);
    }
    const updated: AttributeDefinition = {
      ...list[index],
      ...dto,
      updatedDate: new Date().toISOString(),
    };
    list[index] = updated;
    return updated;
  }

  deleteAttribute(entityTypeId: string | number, attrId: string | number): boolean {
    const strId = String(entityTypeId);
    const list = this.attributes[strId] || [];
    const beforeCount = list.length;
    this.attributes[strId] = list.filter((a) => String(a.id) !== String(attrId));
    return this.attributes[strId].length < beforeCount;
  }

  getEntityRecords(
    entityTypeId: string | number,
    params?: PageRequestParams
  ): PageResponse<EntityRecord> {
    const strId = String(entityTypeId);
    const recs = this.records[strId] || [];
    const page = params?.number && params.number > 0 ? params.number : 1;
    const size = params?.size && params.size > 0 ? params.size : 10;
    const start = (page - 1) * size;
    const end = start + size;
    const content = recs.slice(start, end);

    return {
      content,
      totalElements: recs.length,
      totalPages: Math.ceil(recs.length / size) || 1,
      number: page,
      size,
    };
  }

  createRecord(
    entityTypeId: string | number,
    dto: Partial<EntityRecord>
  ): EntityRecord {
    const strId = String(entityTypeId);
    if (!this.records[strId]) {
      this.records[strId] = [];
    }
    const newId = String(Date.now());
    const newRec: EntityRecord = {
      id: newId,
      entityTypeId: strId,
      tenantId: dto.tenantId || 'default-tenant',
      attributes: dto.attributes || {},
      createdDate: new Date().toISOString(),
      updatedDate: new Date().toISOString(),
    };
    this.records[strId].unshift(newRec);
    return newRec;
  }

  updateRecord(
    entityTypeId: string | number,
    recordId: string | number,
    dto: Partial<EntityRecord>
  ): EntityRecord {
    const strId = String(entityTypeId);
    const list = this.records[strId] || [];
    const index = list.findIndex((r) => String(r.id) === String(recordId));
    if (index === -1) {
      throw new Error(`Record with id ${recordId} not found`);
    }
    const updated: EntityRecord = {
      ...list[index],
      ...dto,
      attributes: {
        ...list[index].attributes,
        ...(dto.attributes || {}),
      },
      updatedDate: new Date().toISOString(),
    };
    list[index] = updated;
    return updated;
  }

  deleteRecord(entityTypeId: string | number, recordId: string | number): boolean {
    const strId = String(entityTypeId);
    const list = this.records[strId] || [];
    const beforeCount = list.length;
    this.records[strId] = list.filter((r) => String(r.id) !== String(recordId));
    return this.records[strId].length < beforeCount;
  }
}

export const mockMetadataStore = new MockMetadataStore();
