import { describe, it, expect, beforeEach } from 'vitest';
import { mockMetadataStore } from '../data/mock-metadata';
import type { CreateAttributeDefinitionDto, CreateEntityRecordDto } from '../api/types';

describe('Metadata Management Full E2E & Flow Test Suite', () => {
  beforeEach(() => {
    // Fresh state for predictable testing
  });

  describe('Workflow 1: Entity Model Lifecycle', () => {
    it('should list pre-seeded entity types', async () => {
      const res = await mockMetadataStore.getEntityTypes();
      expect(res.content.length).toBeGreaterThanOrEqual(3);
      expect(res.content.some((e) => e.systemName === 'customer_account')).toBe(true);
    });

    it('should create, update, and detect optimistic locking conflict on entity models', async () => {
      const newModel = await mockMetadataStore.createEntityType({
        name: 'Service Ticket',
        systemName: 'service_ticket',
        description: 'Customer support tickets',
      });

      expect(newModel.id).toBeDefined();
      expect(newModel.systemName).toBe('service_ticket');
      expect(newModel.version).toBe(1);

      // Successful update
      const updatedModel = await mockMetadataStore.updateEntityType(newModel.id, {
        name: 'Enterprise Service Ticket',
        description: 'Updated description',
        version: 1,
      });
      expect(updatedModel.name).toBe('Enterprise Service Ticket');
      expect(updatedModel.version).toBe(2);

      // Stale update (HTTP 409 simulation)
      await expect(
        mockMetadataStore.updateEntityType(newModel.id, {
          name: 'Conflict Try',
          version: 1, // Stale version!
        })
      ).rejects.toThrow();
    });
  });

  describe('Workflow 2: Schema Builder & Attribute Evolution', () => {
    it('should create new attributes and bump schemaVersion', async () => {
      const entityTypes = await mockMetadataStore.getEntityTypes();
      const targetEntity = entityTypes.content[0];
      const initialSchemaVersion = targetEntity.schemaVersion || 1;

      const newAttrDto: CreateAttributeDefinitionDto = {
        name: 'Priority Level',
        systemName: 'priority_level',
        uiComponent: 'select',
        dataType: 'STRING',
        isRequired: true,
        options: { choices: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'] },
      };

      const createdAttr = await mockMetadataStore.createAttributeDefinition(
        targetEntity.id,
        newAttrDto
      );

      expect(createdAttr.id).toBeDefined();
      expect(createdAttr.name).toBe('Priority Level');
      expect(createdAttr.displayOrder).toBeDefined();

      // Check schema compile
      const compiled = await mockMetadataStore.getCompiledSchema(targetEntity.id);
      expect(compiled.schemaVersion).toBeGreaterThan(initialSchemaVersion);
      const schemaObj = typeof compiled.jsonSchema === 'string' ? JSON.parse(compiled.jsonSchema) : compiled.jsonSchema;
      expect(schemaObj.properties).toHaveProperty('priority_level');
      expect(schemaObj.required).toContain('priority_level');
    });

    it('should archive and unarchive attribute without losing definitions', async () => {
      const entityTypes = await mockMetadataStore.getEntityTypes();
      const targetEntity = entityTypes.content[0];
      const attrs = await mockMetadataStore.getAttributeDefinitions(targetEntity.id);
      const testAttr = attrs.content[0];

      // Archive
      const archived = await mockMetadataStore.archiveAttribute(targetEntity.id, testAttr.id);
      expect(archived.isArchived).toBe(true);

      // Unarchive
      const unarchived = await mockMetadataStore.unarchiveAttribute(targetEntity.id, testAttr.id);
      expect(unarchived.isArchived).toBe(false);
    });

    it('should reorder attributes and persist displayOrder', async () => {
      const entityTypes = await mockMetadataStore.getEntityTypes();
      const targetEntity = entityTypes.content[0];
      const attrs = await mockMetadataStore.getAttributeDefinitions(targetEntity.id);

      const attrIds = attrs.content.map((a) => a.id);
      const reversedIds = [...attrIds].reverse();

      const success = await mockMetadataStore.reorderAttributes(targetEntity.id, reversedIds);
      expect(success).toBe(true);

      const refreshed = await mockMetadataStore.getAttributeDefinitions(targetEntity.id);
      const firstAttr = refreshed.content.find((a) => String(a.id) === String(reversedIds[0]));
      expect(firstAttr?.displayOrder).toBe(1);
    });
  });

  describe('Workflow 3: Data Explorer (Pattern B Entity Reference & Record CRUD)', () => {
    it('should create record with Entity Reference (Pattern B) and validate payload', async () => {
      const entityTypes = await mockMetadataStore.getEntityTypes();
      const accountEntity = entityTypes.content.find((e) => e.systemName === 'customer_account')!;

      const newRecordDto: CreateEntityRecordDto = {
        entityTypeId: accountEntity.id,
        tenantId: 'tenant-test',
        attributes: {
          legal_name: 'Test Aerospace Inc',
          account_tier: 'Enterprise',
          default_policy_id: '301', // Pattern B Entity Reference
        },
      };

      const createdRecord = await mockMetadataStore.createEntityRecord(
        accountEntity.id,
        newRecordDto
      );

      expect(createdRecord.id).toBeDefined();
      expect(createdRecord.attributes.legal_name).toBe('Test Aerospace Inc');
      expect(createdRecord.attributes.default_policy_id).toBe('301');
      expect(createdRecord.version).toBe(1);

      // Fetch and verify pagination & search
      const queryResult = await mockMetadataStore.getEntityRecords(accountEntity.id, {
        number: 1,
        size: 10,
        filters: { legal_name: 'Aerospace' },
      });

      expect(queryResult.content.some((r) => r.id === createdRecord.id)).toBe(true);
    });

    it('should enforce optimistic locking (version conflict) on record updates', async () => {
      const entityTypes = await mockMetadataStore.getEntityTypes();
      const accountEntity = entityTypes.content[0];
      const records = await mockMetadataStore.getEntityRecords(accountEntity.id, { size: 1 });
      const record = records.content[0];

      // Successful update
      const updated = await mockMetadataStore.updateEntityRecord(
        accountEntity.id,
        record.id,
        {
          attributes: { ...record.attributes, legal_name: 'Updated Concurrency Name' },
          version: record.version,
        }
      );
      expect(updated.version).toBe((record.version || 1) + 1);

      // Stale version update should fail
      await expect(
        mockMetadataStore.updateEntityRecord(accountEntity.id, record.id, {
          attributes: { ...record.attributes, legal_name: 'Conflict Name' },
          version: record.version, // Stale!
        })
      ).rejects.toThrow();
    });
  });

  describe('Workflow 4: Connected Edges (Pattern C Graph Edge Management)', () => {
    it('should create relationship edge type with cardinality constraints', async () => {
      const newEdgeType = await mockMetadataStore.createRelationshipType({
        name: 'Account to Policies',
        systemName: 'rel_acct_policies',
        sourceEntityTypeId: '1',
        targetEntityTypeId: '3',
        cardinality: 'ONE_TO_MANY',
        description: 'Customer account policy attachments',
      });

      expect(newEdgeType.id).toBeDefined();
      expect(newEdgeType.cardinality).toBe('ONE_TO_MANY');

      const allTypes = await mockMetadataStore.getRelationshipTypes();
      expect(allTypes.content.some((t) => t.id === newEdgeType.id)).toBe(true);
    });

    it('should create, inspect, and delete concrete record-to-record edge links', async () => {
      const sourceRecordId = '101';
      const targetRecordId = '301';

      // 1. Create edge link
      const edgeLink = await mockMetadataStore.createEntityRelationship(sourceRecordId, {
        relationshipTypeId: '1',
        targetRecordId,
        sourceRecordId,
        attributes: { role: 'primary_policy' },
      });

      expect(edgeLink.id).toBeDefined();
      expect(String(edgeLink.sourceRecordId)).toBe(sourceRecordId);
      expect(String(edgeLink.targetRecordId)).toBe(targetRecordId);

      // 2. Query bidirectional relationships
      const linksOut = await mockMetadataStore.getRecordRelationships(sourceRecordId, {
        direction: 'outgoing',
      });
      expect(linksOut.content.some((l) => String(l.targetRecordId) === targetRecordId)).toBe(true);

      const linksIn = await mockMetadataStore.getRecordRelationships(targetRecordId, {
        direction: 'incoming',
      });
      expect(linksIn.content.some((l) => String(l.sourceRecordId) === sourceRecordId)).toBe(true);

      // 3. Delete edge link
      const deleted = await mockMetadataStore.deleteEntityRelationship(sourceRecordId, edgeLink.id);
      expect(deleted).toBe(true);

      // 4. Verify removed
      const remaining = await mockMetadataStore.getRecordRelationships(sourceRecordId);
      expect(remaining.content.some((l) => String(l.id) === String(edgeLink.id))).toBe(false);
    });
  });
});
