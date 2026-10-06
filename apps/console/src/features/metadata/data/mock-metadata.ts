import type { MetadataDataSource } from '../api/metadata-data-source';
import type {
  AttributeDefinition,
  CompiledSchema,
  CreateAttributeDefinitionDto,
  CreateEntityRecordDto,
  CreateEntityTypeDto,
  CreateEntityRelationshipDto,
  CreateRelationshipTypeDto,
  EntityRecord,
  EntityRelationship,
  EntityType,
  PageRequestParams,
  PageResponse,
  RelationshipType,
  UpdateAttributeDefinitionDto,
  UpdateEntityRecordDto,
  UpdateEntityTypeDto,
  UpdateRelationshipTypeDto,
} from '../api/types';

export const initialMockEntityTypes: EntityType[] = [
  {
    id: '1',
    name: 'Customer Account',
    systemName: 'customer_account',
    description: 'Profiles, corporate identities, and billing configurations for enterprise customers.',
    schemaVersion: 1,
    version: 1,
    createdDate: new Date('2026-01-10').toISOString(),
    updatedDate: new Date('2026-03-15').toISOString(),
  },
  {
    id: '2',
    name: 'Cloud Resource Specification',
    systemName: 'cloud_resource_spec',
    description: 'Hardware, topology, and regional availability for managed virtual clusters.',
    schemaVersion: 1,
    version: 1,
    createdDate: new Date('2026-01-15').toISOString(),
    updatedDate: new Date('2026-03-20').toISOString(),
  },
  {
    id: '3',
    name: 'Deployment Policy',
    systemName: 'deployment_policy',
    description: 'Governance rules, canary thresholds, and cluster isolation directives.',
    schemaVersion: 1,
    version: 1,
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
      displayOrder: 1,
      version: 1,
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
      displayOrder: 2,
      version: 1,
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
      displayOrder: 3,
      version: 1,
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
      displayOrder: 4,
      version: 1,
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
      displayOrder: 5,
      version: 1,
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
      displayOrder: 6,
      version: 1,
    },
    {
      id: '107',
      entityTypeId: '1',
      name: 'Operational Notes',
      systemName: 'operational_notes',
      dataType: 'STRING',
      uiComponent: 'textarea',
      isRequired: false,
      displayOrder: 7,
      version: 1,
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
      displayOrder: 1,
      version: 1,
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
      displayOrder: 2,
      version: 1,
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
      displayOrder: 3,
      version: 1,
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
      displayOrder: 4,
      version: 1,
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
      displayOrder: 5,
      version: 1,
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
      displayOrder: 1,
      version: 1,
    },
    {
      id: '302',
      entityTypeId: '3',
      name: 'Rollout Strategy',
      systemName: 'rollout_strategy',
      dataType: 'STRING',
      uiComponent: 'select',
      isRequired: true,
      displayOrder: 2,
      version: 1,
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
      displayOrder: 3,
      version: 1,
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
      version: 1,
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
      version: 1,
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
      version: 1,
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
      version: 1,
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
      version: 1,
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
      version: 1,
      attributes: {
        policy_id: 'POL-PROD-STRICT-001',
        rollout_strategy: 'Canary',
        strict_zero_downtime: true,
      },
      createdDate: new Date('2026-02-05').toISOString(),
    },
  ],
};

export const initialMockRelationshipTypes: RelationshipType[] = [
  {
    id: '1',
    name: 'Customer Deployment Policy',
    systemName: 'rel_cust_policy',
    sourceEntityTypeId: '1',
    targetEntityTypeId: '3',
    cardinality: 'ONE_TO_MANY',
    description: 'Binds enterprise customer to active deployment policies',
    version: 1,
    createdDate: new Date('2026-01-15').toISOString(),
  },
  {
    id: '2',
    name: 'Customer Compute Spec',
    systemName: 'rel_cust_compute',
    sourceEntityTypeId: '1',
    targetEntityTypeId: '2',
    cardinality: 'MANY_TO_MANY',
    description: 'Associates compute allocations to accounts',
    version: 1,
    createdDate: new Date('2026-01-18').toISOString(),
  },
];

export const initialMockEntityRelationships: EntityRelationship[] = [
  {
    id: '1',
    relationshipTypeId: '1',
    sourceRecordId: '1001',
    targetRecordId: '3001',
    version: 1,
    createdDate: new Date('2026-02-06').toISOString(),
  },
  {
    id: '2',
    relationshipTypeId: '2',
    sourceRecordId: '1001',
    targetRecordId: '2001',
    version: 1,
    createdDate: new Date('2026-02-08').toISOString(),
  },
];

export class MockMetadataService implements MetadataDataSource {
  private entityTypes: EntityType[] = [...initialMockEntityTypes];
  private attributes: Record<string, AttributeDefinition[]> = JSON.parse(
    JSON.stringify(initialMockAttributes)
  );
  private records: Record<string, EntityRecord[]> = JSON.parse(
    JSON.stringify(initialMockRecords)
  );
  private relationshipTypes: RelationshipType[] = [...initialMockRelationshipTypes];
  private relationships: EntityRelationship[] = [...initialMockEntityRelationships];

  // ==========================================
  // 1. Entity Types
  // ==========================================
  async getEntityTypes(params?: PageRequestParams): Promise<PageResponse<EntityType>> {
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

  async getEntityTypeById(id: string | number): Promise<EntityType | null> {
    const found = this.entityTypes.find((e) => String(e.id) === String(id));
    return found || null;
  }

  async createEntityType(dto: CreateEntityTypeDto): Promise<EntityType> {
    const newId = String(Date.now());
    const entityType: EntityType = {
      id: newId,
      name: dto.name || 'New Entity Type',
      systemName: dto.systemName || `entity_${newId}`,
      description: dto.description || '',
      schemaVersion: 1,
      version: 1,
      createdDate: new Date().toISOString(),
      updatedDate: new Date().toISOString(),
    };
    this.entityTypes.push(entityType);
    this.attributes[newId] = [];
    this.records[newId] = [];
    return entityType;
  }

  async updateEntityType(id: string | number, dto: UpdateEntityTypeDto): Promise<EntityType> {
    const index = this.entityTypes.findIndex((e) => String(e.id) === String(id));
    if (index === -1) {
      throw new Error(`EntityType with id ${id} not found`);
    }

    const current = this.entityTypes[index];
    if (dto.version !== undefined && current.version !== undefined && dto.version !== current.version) {
      const err = new Error(`Optimistic lock conflict: entity type was modified.`);
      (err as any).status = 409;
      throw err;
    }

    const updated: EntityType = {
      ...current,
      ...dto,
      version: (current.version || 1) + 1,
      updatedDate: new Date().toISOString(),
    };
    this.entityTypes[index] = updated;
    return updated;
  }

  async deleteEntityType(id: string | number): Promise<boolean> {
    const strId = String(id);
    const beforeCount = this.entityTypes.length;
    this.entityTypes = this.entityTypes.filter((e) => String(e.id) !== strId);
    delete this.attributes[strId];
    delete this.records[strId];
    return this.entityTypes.length < beforeCount;
  }

  async getCompiledSchema(id: string | number): Promise<CompiledSchema> {
    const entityType = await this.getEntityTypeById(id);
    if (!entityType) {
      throw new Error(`EntityType ${id} not found`);
    }

    const attrs = this.attributes[String(id)] || [];
    const activeAttrs = attrs.filter((a) => !a.isArchived);

    const properties: Record<string, unknown> = {};
    const required: string[] = [];

    activeAttrs.forEach((attr) => {
      let propSchema: Record<string, unknown> = {};
      switch (attr.dataType) {
        case 'INTEGER':
          propSchema = { type: 'integer' };
          break;
        case 'DECIMAL':
          propSchema = { type: 'number' };
          break;
        case 'BOOLEAN':
          propSchema = { type: 'boolean' };
          break;
        case 'JSON':
          propSchema = { type: 'object' };
          break;
        case 'DATE':
          propSchema = { type: 'string', format: 'date' };
          break;
        case 'DATETIME':
          propSchema = { type: 'string', format: 'date-time' };
          break;
        default:
          propSchema = { type: 'string' };
          break;
      }

      if (attr.options?.choices) {
        propSchema.enum = attr.options.choices;
      }
      if (attr.options?.min !== undefined) {
        propSchema.minimum = attr.options.min;
      }
      if (attr.options?.max !== undefined) {
        propSchema.maximum = attr.options.max;
      }
      if (attr.options?.pattern) {
        propSchema.pattern = attr.options.pattern;
      }

      properties[attr.systemName] = propSchema;
      if (attr.isRequired) {
        required.push(attr.systemName);
      }
    });

    const jsonSchema = {
      $schema: 'http://json-schema.org/draft-07/schema#',
      type: 'object',
      properties,
      required,
      additionalProperties: false,
    };

    return {
      entityTypeId: id,
      schemaVersion: entityType.schemaVersion || 1,
      jsonSchema,
      updatedDate: entityType.updatedDate,
    };
  }

  // ==========================================
  // 2. Attribute Definitions
  // ==========================================
  async getAttributeDefinitions(
    entityTypeId: string | number,
    params?: PageRequestParams
  ): Promise<PageResponse<AttributeDefinition>> {
    const strId = String(entityTypeId);
    let attrs = [...(this.attributes[strId] || [])];

    // Sort by displayOrder ascending
    attrs.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));

    const page = params?.number && params.number > 0 ? params.number : 1;
    const size = params?.size && params.size > 0 ? params.size : 50;
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

  async getAttributeDefinition(
    entityTypeId: string | number,
    attrId: string | number
  ): Promise<AttributeDefinition | null> {
    const strId = String(entityTypeId);
    const attrs = this.attributes[strId] || [];
    const found = attrs.find((a) => String(a.id) === String(attrId));
    return found || null;
  }

  async createAttributeDefinition(
    entityTypeId: string | number,
    dto: CreateAttributeDefinitionDto
  ): Promise<AttributeDefinition> {
    const strId = String(entityTypeId);
    if (!this.attributes[strId]) {
      this.attributes[strId] = [];
    }

    const currentAttrs = this.attributes[strId];
    const newId = String(Date.now());
    const newOrder = currentAttrs.length + 1;

    const newAttr: AttributeDefinition = {
      id: newId,
      entityTypeId: strId,
      name: dto.name || 'New Attribute',
      systemName: dto.systemName || `field_${newId}`,
      dataType: dto.dataType || 'STRING',
      uiComponent: dto.uiComponent || 'text',
      isRequired: Boolean(dto.isRequired),
      isArchived: Boolean(dto.isArchived),
      displayOrder: dto.displayOrder || newOrder,
      options: dto.options || {},
      defaultValue: dto.defaultValue || '',
      version: 1,
      createdDate: new Date().toISOString(),
      updatedDate: new Date().toISOString(),
    };

    this.attributes[strId].push(newAttr);
    this.bumpEntityTypeSchemaVersion(strId);
    return newAttr;
  }

  async updateAttributeDefinition(
    entityTypeId: string | number,
    attrId: string | number,
    dto: UpdateAttributeDefinitionDto
  ): Promise<AttributeDefinition> {
    const strId = String(entityTypeId);
    const list = this.attributes[strId] || [];
    const index = list.findIndex((a) => String(a.id) === String(attrId));
    if (index === -1) {
      throw new Error(`Attribute with id ${attrId} not found`);
    }

    const current = list[index];
    if (dto.version !== undefined && current.version !== undefined && dto.version !== current.version) {
      const err = new Error(`Optimistic lock conflict: attribute definition was modified.`);
      (err as any).status = 409;
      throw err;
    }

    const updated: AttributeDefinition = {
      ...current,
      ...dto,
      version: (current.version || 1) + 1,
      updatedDate: new Date().toISOString(),
    };
    list[index] = updated;
    this.bumpEntityTypeSchemaVersion(strId);
    return updated;
  }

  async deleteAttributeDefinition(
    entityTypeId: string | number,
    attrId: string | number,
    _force?: boolean
  ): Promise<boolean> {
    const strId = String(entityTypeId);
    const list = this.attributes[strId] || [];
    const beforeCount = list.length;
    this.attributes[strId] = list.filter((a) => String(a.id) !== String(attrId));
    this.bumpEntityTypeSchemaVersion(strId);
    return this.attributes[strId].length < beforeCount;
  }

  async archiveAttribute(
    entityTypeId: string | number,
    attrId: string | number
  ): Promise<AttributeDefinition> {
    return this.updateAttributeDefinition(entityTypeId, attrId, { isArchived: true });
  }

  async unarchiveAttribute(
    entityTypeId: string | number,
    attrId: string | number
  ): Promise<AttributeDefinition> {
    return this.updateAttributeDefinition(entityTypeId, attrId, { isArchived: false });
  }

  async reorderAttributes(
    entityTypeId: string | number,
    attributeIds: Array<string | number>
  ): Promise<boolean> {
    const strId = String(entityTypeId);
    const list = this.attributes[strId] || [];

    attributeIds.forEach((id, index) => {
      const attr = list.find((a) => String(a.id) === String(id));
      if (attr) {
        attr.displayOrder = index + 1;
        attr.updatedDate = new Date().toISOString();
      }
    });

    this.bumpEntityTypeSchemaVersion(strId);
    return true;
  }

  // ==========================================
  // 3. Entity Records
  // ==========================================
  async getEntityRecords(
    entityTypeId: string | number,
    params?: PageRequestParams
  ): Promise<PageResponse<EntityRecord>> {
    const strId = String(entityTypeId);
    let recs = [...(this.records[strId] || [])];

    // Filter by tenantId
    if (params?.tenantId) {
      recs = recs.filter((r) => r.tenantId === params.tenantId);
    }

    // Filter by attributes
    if (params?.filters) {
      Object.entries(params.filters).forEach(([field, filterVal]) => {
        if (typeof filterVal === 'object' && filterVal !== null) {
          Object.entries(filterVal).forEach(([op, val]) => {
            if (val !== undefined && val !== '') {
              recs = recs.filter((r) => {
                const attrVal = r.attributes?.[field];
                if (op === 'eq') return String(attrVal) === String(val);
                if (op === 'like') return String(attrVal || '').toLowerCase().includes(String(val).toLowerCase());
                if (op === 'gt') return Number(attrVal) > Number(val);
                if (op === 'lt') return Number(attrVal) < Number(val);
                if (op === 'gte') return Number(attrVal) >= Number(val);
                if (op === 'lte') return Number(attrVal) <= Number(val);
                return true;
              });
            }
          });
        } else if (filterVal !== undefined && filterVal !== '') {
          recs = recs.filter((r) => {
            const attrVal = r.attributes?.[field];
            return String(attrVal || '').toLowerCase().includes(String(filterVal).toLowerCase());
          });
        }
      });
    }

    // Sort
    if (params?.sort) {
      const parts = params.sort.split(',');
      const sortField = parts[0].trim();
      const sortDirection = (parts[1] || 'asc').trim().toLowerCase();

      recs.sort((a, b) => {
        const valA = a.attributes?.[sortField] ?? a[sortField as keyof EntityRecord] ?? '';
        const valB = b.attributes?.[sortField] ?? b[sortField as keyof EntityRecord] ?? '';
        const comparison = String(valA).localeCompare(String(valB), undefined, { numeric: true });
        return sortDirection === 'desc' ? -comparison : comparison;
      });
    }

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

  async getEntityRecord(
    entityTypeId: string | number,
    recordId: string | number
  ): Promise<EntityRecord | null> {
    const strId = String(entityTypeId);
    const recs = this.records[strId] || [];
    const found = recs.find((r) => String(r.id) === String(recordId));
    return found || null;
  }

  async createEntityRecord(
    entityTypeId: string | number,
    dto: CreateEntityRecordDto
  ): Promise<EntityRecord> {
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
      version: 1,
      createdDate: new Date().toISOString(),
      updatedDate: new Date().toISOString(),
    };
    this.records[strId].unshift(newRec);
    return newRec;
  }

  async updateEntityRecord(
    entityTypeId: string | number,
    recordId: string | number,
    dto: UpdateEntityRecordDto
  ): Promise<EntityRecord> {
    const strId = String(entityTypeId);
    const list = this.records[strId] || [];
    const index = list.findIndex((r) => String(r.id) === String(recordId));
    if (index === -1) {
      throw new Error(`Record with id ${recordId} not found`);
    }

    const current = list[index];
    if (dto.version !== undefined && current.version !== undefined && dto.version !== current.version) {
      const err = new Error(`Optimistic lock conflict: entity record was modified.`);
      (err as any).status = 409;
      throw err;
    }

    const updated: EntityRecord = {
      ...current,
      ...dto,
      attributes: {
        ...current.attributes,
        ...(dto.attributes || {}),
      },
      version: (current.version || 1) + 1,
      updatedDate: new Date().toISOString(),
    };
    list[index] = updated;
    return updated;
  }

  async patchEntityRecord(
    entityTypeId: string | number,
    recordId: string | number,
    dto: Partial<CreateEntityRecordDto>
  ): Promise<EntityRecord> {
    return this.updateEntityRecord(entityTypeId, recordId, dto);
  }

  async deleteEntityRecord(
    entityTypeId: string | number,
    recordId: string | number
  ): Promise<boolean> {
    const strId = String(entityTypeId);
    const list = this.records[strId] || [];
    const beforeCount = list.length;
    this.records[strId] = list.filter((r) => String(r.id) !== String(recordId));
    return this.records[strId].length < beforeCount;
  }

  // ==========================================
  // 4. Relationship Types
  // ==========================================
  async getRelationshipTypes(params?: PageRequestParams): Promise<PageResponse<RelationshipType>> {
    const page = params?.number && params.number > 0 ? params.number : 1;
    const size = params?.size && params.size > 0 ? params.size : 50;
    const start = (page - 1) * size;
    const end = start + size;
    const content = this.relationshipTypes.slice(start, end);

    return {
      content,
      totalElements: this.relationshipTypes.length,
      totalPages: Math.ceil(this.relationshipTypes.length / size) || 1,
      number: page,
      size,
    };
  }

  async getRelationshipType(id: string | number): Promise<RelationshipType | null> {
    const found = this.relationshipTypes.find((r) => String(r.id) === String(id));
    return found || null;
  }

  async createRelationshipType(dto: CreateRelationshipTypeDto): Promise<RelationshipType> {
    const newId = String(Date.now());
    const relType: RelationshipType = {
      id: newId,
      name: dto.name,
      systemName: dto.systemName,
      sourceEntityTypeId: dto.sourceEntityTypeId,
      targetEntityTypeId: dto.targetEntityTypeId,
      cardinality: dto.cardinality || 'ONE_TO_MANY',
      description: dto.description || '',
      version: 1,
      createdDate: new Date().toISOString(),
      updatedDate: new Date().toISOString(),
    };
    this.relationshipTypes.push(relType);
    return relType;
  }

  async updateRelationshipType(
    id: string | number,
    dto: UpdateRelationshipTypeDto
  ): Promise<RelationshipType> {
    const index = this.relationshipTypes.findIndex((r) => String(r.id) === String(id));
    if (index === -1) {
      throw new Error(`RelationshipType with id ${id} not found`);
    }

    const current = this.relationshipTypes[index];
    if (dto.version !== undefined && current.version !== undefined && dto.version !== current.version) {
      const err = new Error(`Optimistic lock conflict: relationship type was modified.`);
      (err as any).status = 409;
      throw err;
    }

    const updated: RelationshipType = {
      ...current,
      ...dto,
      version: (current.version || 1) + 1,
      updatedDate: new Date().toISOString(),
    };
    this.relationshipTypes[index] = updated;
    return updated;
  }

  async deleteRelationshipType(id: string | number, _force?: boolean): Promise<boolean> {
    const strId = String(id);
    const beforeCount = this.relationshipTypes.length;
    this.relationshipTypes = this.relationshipTypes.filter((r) => String(r.id) !== strId);
    this.relationships = this.relationships.filter((rel) => String(rel.relationshipTypeId) !== strId);
    return this.relationshipTypes.length < beforeCount;
  }

  // ==========================================
  // 5. Entity Relationships
  // ==========================================
  async getRecordRelationships(
    recordId: string | number,
    params?: PageRequestParams
  ): Promise<PageResponse<EntityRelationship>> {
    const strRecId = String(recordId);
    const dir = params?.direction || 'both';

    let filtered = this.relationships.filter((r) => {
      if (dir === 'incoming') return String(r.targetRecordId) === strRecId;
      if (dir === 'outgoing') return String(r.sourceRecordId) === strRecId;
      return String(r.sourceRecordId) === strRecId || String(r.targetRecordId) === strRecId;
    });

    const page = params?.number && params.number > 0 ? params.number : 1;
    const size = params?.size && params.size > 0 ? params.size : 20;
    const start = (page - 1) * size;
    const end = start + size;
    const content = filtered.slice(start, end);

    return {
      content,
      totalElements: filtered.length,
      totalPages: Math.ceil(filtered.length / size) || 1,
      number: page,
      size,
    };
  }

  async createEntityRelationship(
    recordId: string | number,
    dto: CreateEntityRelationshipDto
  ): Promise<EntityRelationship> {
    const newId = String(Date.now());
    const rel: EntityRelationship = {
      id: newId,
      relationshipTypeId: dto.relationshipTypeId,
      sourceRecordId: dto.sourceRecordId || recordId,
      targetRecordId: dto.targetRecordId,
      attributes: dto.attributes || {},
      version: 1,
      createdDate: new Date().toISOString(),
      updatedDate: new Date().toISOString(),
    };
    this.relationships.push(rel);
    return rel;
  }

  async deleteEntityRelationship(
    _recordId: string | number,
    relationshipId: string | number
  ): Promise<boolean> {
    const strId = String(relationshipId);
    const beforeCount = this.relationships.length;
    this.relationships = this.relationships.filter((r) => String(r.id) !== strId);
    return this.relationships.length < beforeCount;
  }

  private bumpEntityTypeSchemaVersion(entityTypeId: string) {
    const entityType = this.entityTypes.find((e) => String(e.id) === String(entityTypeId));
    if (entityType) {
      entityType.schemaVersion = (entityType.schemaVersion || 1) + 1;
      entityType.updatedDate = new Date().toISOString();
    }
  }
}

export const mockMetadataStore = new MockMetadataService();
