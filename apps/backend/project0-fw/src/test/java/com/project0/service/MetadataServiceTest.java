package com.project0.service;

import com.project0.core.io.Page;
import com.project0.core.io.PageRequest;
import com.project0.domain.metadata.AttributeDefinition;
import com.project0.domain.metadata.AttributeDefinitionUpdatedEvent;
import com.project0.domain.metadata.EntityRecord;
import com.project0.domain.metadata.EntityType;
import com.project0.presentation.dto.metadata.*;
import com.project0.repository.jpa.AttributeDefinitionRepository;
import com.project0.repository.jpa.EntityRecordRepository;
import com.project0.repository.jpa.EntityTypeRepository;
import com.project0.service.exception.MetadataConflictException;
import com.project0.service.exception.MetadataNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.context.ApplicationEventPublisher;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class MetadataServiceTest {

    @Mock
    private EntityTypeRepository entityTypeRepository;
    @Mock
    private AttributeDefinitionRepository attributeDefinitionRepository;
    @Mock
    private EntityRecordRepository entityRecordRepository;
    @Mock
    private SchemaValidationService schemaValidationService;
    @Mock
    private ApplicationEventPublisher eventPublisher;
    @Mock
    private PageBuilder pageBuilder;

    @InjectMocks
    private MetadataService metadataService;

    private PageRequest defaultPageRequest;
    private org.springframework.data.domain.Page springPageMock;
    private Page customPageMock;

    @BeforeEach
    void setUp() {
        defaultPageRequest = new PageRequest();
        defaultPageRequest.setNumber(1);
        defaultPageRequest.setSize(10);

        springPageMock = mock(org.springframework.data.domain.Page.class);
        customPageMock = new Page();
    }

    @Test
    void testGetEntityTypes() {
        when(entityTypeRepository.findAllByDeletedDateIsNull(any(org.springframework.data.domain.PageRequest.class))).thenReturn(springPageMock);
        when(pageBuilder.build(eq(defaultPageRequest), any(), any())).thenReturn(customPageMock);

        Page<EntityTypeResponse> result = metadataService.getEntityTypes(defaultPageRequest);

        assertNotNull(result);
        verify(entityTypeRepository).findAllByDeletedDateIsNull(any(org.springframework.data.domain.PageRequest.class));
        verify(pageBuilder).build(eq(defaultPageRequest), any(), any());
    }

    @Test
    void testCreateEntityType_Success() {
        CreateEntityTypeRequest request = new CreateEntityTypeRequest("customer", "Customer", "Customer entity");
        EntityType savedEntity = new EntityType();
        savedEntity.setId(1L);
        savedEntity.setName("Customer");
        savedEntity.setSystemName("customer");

        when(entityTypeRepository.existsBySystemNameAndDeletedDateIsNull("customer")).thenReturn(false);
        when(entityTypeRepository.save(any(EntityType.class))).thenReturn(savedEntity);

        EntityTypeResponse result = metadataService.createEntityType(request);

        assertNotNull(result);
        assertEquals(1L, result.id());
        assertEquals("Customer", result.name());
        assertEquals("customer", result.systemName());
        verify(entityTypeRepository).save(any(EntityType.class));
    }

    @Test
    void testCreateEntityType_DuplicateConflict() {
        CreateEntityTypeRequest request = new CreateEntityTypeRequest("customer", "Customer", "Customer entity");
        when(entityTypeRepository.existsBySystemNameAndDeletedDateIsNull("customer")).thenReturn(true);

        assertThrows(MetadataConflictException.class, () -> metadataService.createEntityType(request));
        verify(entityTypeRepository, never()).save(any());
    }

    @Test
    void testCreateAttributeDefinition_Success() {
        Long typeId = 1L;
        EntityType type = new EntityType();
        type.setId(typeId);

        CreateAttributeRequest request = new CreateAttributeRequest("email", "Email", "string", "text", true, false, null, null);
        AttributeDefinition savedAttr = new AttributeDefinition();
        savedAttr.setId(10L);
        savedAttr.setEntityType(type);
        savedAttr.setName("Email");
        savedAttr.setSystemName("email");

        when(entityTypeRepository.findByIdAndDeletedDateIsNull(typeId)).thenReturn(Optional.of(type));
        when(attributeDefinitionRepository.existsByEntityTypeIdAndSystemNameAndDeletedDateIsNull(typeId, "email")).thenReturn(false);
        when(attributeDefinitionRepository.save(any(AttributeDefinition.class))).thenReturn(savedAttr);

        AttributeDefinitionResponse result = metadataService.createAttributeDefinition(typeId, request);

        assertNotNull(result);
        assertEquals(10L, result.id());
        assertEquals("email", result.systemName());
        verify(attributeDefinitionRepository).save(any(AttributeDefinition.class));
        verify(eventPublisher).publishEvent(any(AttributeDefinitionUpdatedEvent.class));
    }

    @Test
    void testCreateAttributeDefinition_DuplicateConflict() {
        Long typeId = 1L;
        EntityType type = new EntityType();
        type.setId(typeId);

        CreateAttributeRequest request = new CreateAttributeRequest("email", "Email", "string", "text", true, false, null, null);

        when(entityTypeRepository.findByIdAndDeletedDateIsNull(typeId)).thenReturn(Optional.of(type));
        when(attributeDefinitionRepository.existsByEntityTypeIdAndSystemNameAndDeletedDateIsNull(typeId, "email")).thenReturn(true);

        assertThrows(MetadataConflictException.class, () -> metadataService.createAttributeDefinition(typeId, request));
        verify(attributeDefinitionRepository, never()).save(any());
    }

    @Test
    void testCreateEntityRecord_Success() {
        Long typeId = 1L;
        EntityType type = new EntityType();
        type.setId(typeId);

        Map<String, Object> attributes = new HashMap<>();
        attributes.put("email", "test@example.com");
        CreateRecordRequest request = new CreateRecordRequest(attributes, "tenant-1");

        EntityRecord savedRecord = new EntityRecord();
        savedRecord.setId(100L);
        savedRecord.setEntityType(type);
        savedRecord.setAttributes(attributes);
        savedRecord.setTenantId("tenant-1");

        when(entityTypeRepository.findByIdAndDeletedDateIsNull(typeId)).thenReturn(Optional.of(type));
        when(entityRecordRepository.save(any(EntityRecord.class))).thenReturn(savedRecord);

        EntityRecordResponse result = metadataService.createEntityRecord(typeId, request);

        assertNotNull(result);
        assertEquals(100L, result.id());
        assertEquals("tenant-1", result.tenantId());
        verify(schemaValidationService).validatePayload(typeId, attributes);
        verify(entityRecordRepository).save(any(EntityRecord.class));
    }

    @Test
    void testCreateEntityRecord_AppliesAttributeDefaults() {
        Long typeId = 1L;
        EntityType type = new EntityType();
        type.setId(typeId);

        AttributeDefinition defStatus = new AttributeDefinition();
        defStatus.setSystemName("status");
        defStatus.setDataType("string");
        defStatus.setDefaultValue("DRAFT");
        defStatus.setIsArchived(false);

        AttributeDefinition defCount = new AttributeDefinition();
        defCount.setSystemName("count");
        defCount.setDataType("integer");
        defCount.setDefaultValue("10");
        defCount.setIsArchived(false);

        AttributeDefinition defArchived = new AttributeDefinition();
        defArchived.setSystemName("old_prop");
        defArchived.setDataType("string");
        defArchived.setDefaultValue("OLD");
        defArchived.setIsArchived(true);

        when(entityTypeRepository.findByIdAndDeletedDateIsNull(typeId)).thenReturn(Optional.of(type));
        when(attributeDefinitionRepository.findByEntityTypeIdAndDeletedDateIsNull(typeId))
                .thenReturn(List.of(defStatus, defCount, defArchived));

        Map<String, Object> inputAttributes = new HashMap<>();
        inputAttributes.put("name", "Item");
        CreateRecordRequest request = new CreateRecordRequest(inputAttributes, "tenant-1");

        when(entityRecordRepository.save(any(EntityRecord.class))).thenAnswer(i -> {
            EntityRecord r = i.getArgument(0);
            r.setId(101L);
            return r;
        });

        EntityRecordResponse response = metadataService.createEntityRecord(typeId, request);

        assertNotNull(response);
        assertEquals("DRAFT", response.attributes().get("status"));
        assertEquals(10L, response.attributes().get("count"));
        assertNull(response.attributes().get("old_prop"));
        assertEquals("Item", response.attributes().get("name"));
    }

    @Test
    void testGetEntityRecords_WithFiltersAndTenant() {
        Long typeId = 1L;
        EntityType type = new EntityType();
        type.setId(typeId);

        when(entityTypeRepository.findByIdAndDeletedDateIsNull(typeId)).thenReturn(Optional.of(type));

        AttributeDefinition defEmail = new AttributeDefinition();
        defEmail.setSystemName("email");
        defEmail.setDataType("string");
        when(attributeDefinitionRepository.findByEntityTypeIdAndDeletedDateIsNull(typeId))
                .thenReturn(List.of(defEmail));

        EntityRecord record = new EntityRecord();
        record.setId(100L);
        record.setEntityType(type);
        record.setAttributes(Map.of("email", "john@example.com"));

        org.springframework.data.domain.Page<EntityRecord> springPage = new org.springframework.data.domain.PageImpl<>(
                List.of(record),
                org.springframework.data.domain.PageRequest.of(0, 10),
                1
        );
        when(entityRecordRepository.findAll(any(org.springframework.data.jpa.domain.Specification.class), any(org.springframework.data.domain.Pageable.class)))
                .thenReturn(springPage);

        PageRequest pageRequest = new PageRequest();
        pageRequest.setNumber(1);
        pageRequest.setSize(10);

        when(pageBuilder.build(eq(pageRequest), any(), any())).thenReturn(customPageMock);

        Map<String, Map<String, String>> filterParams = Map.of("email", Map.of("contains", "john"));

        Page<EntityRecordResponse> result = metadataService.getEntityRecords(
                typeId,
                pageRequest,
                filterParams,
                "createdDate",
                "desc",
                "tenant-1"
        );

        assertNotNull(result);
        assertSame(customPageMock, result);
        verify(entityRecordRepository).findAll(any(org.springframework.data.jpa.domain.Specification.class), any(org.springframework.data.domain.Pageable.class));
        verify(pageBuilder).build(eq(pageRequest), any(), any());
    }

    @Test
    void testCreateEntityRecord_ThrowsIfTypeNotFound() {
        Long typeId = 99L;
        CreateRecordRequest request = new CreateRecordRequest(Map.of(), "tenant-1");

        when(entityTypeRepository.findByIdAndDeletedDateIsNull(typeId)).thenReturn(Optional.empty());

        assertThrows(MetadataNotFoundException.class, () -> metadataService.createEntityRecord(typeId, request));

        verify(schemaValidationService, never()).validatePayload(any(), any());
        verify(entityRecordRepository, never()).save(any());
    }

    @Test
    void testGetEntityType_Success() {
        EntityType type = new EntityType();
        type.setId(1L);
        type.setName("Customer");
        type.setSystemName("customer");

        when(entityTypeRepository.findByIdAndDeletedDateIsNull(1L)).thenReturn(Optional.of(type));

        EntityTypeResponse result = metadataService.getEntityType(1L);
        assertNotNull(result);
        assertEquals(1L, result.id());
        assertEquals("Customer", result.name());
    }

    @Test
    void testGetCompiledSchema_Success() {
        EntityType type = new EntityType();
        type.setId(1L);
        type.setSchemaVersion(5L);

        com.fasterxml.jackson.databind.ObjectMapper mapper = new com.fasterxml.jackson.databind.ObjectMapper();
        com.fasterxml.jackson.databind.JsonNode node = mapper.createObjectNode().put("type", "object");

        when(entityTypeRepository.findByIdAndDeletedDateIsNull(1L)).thenReturn(Optional.of(type));
        when(schemaValidationService.compileSchemaNode(1L)).thenReturn(node);

        CompiledSchemaResponse result = metadataService.getCompiledSchema(1L);
        assertNotNull(result);
        assertEquals(1L, result.entityTypeId());
        assertEquals(5L, result.schemaVersion());
        assertEquals(node, result.schema());
    }

    @Test
    void testUpdateEntityType_Success() {
        EntityType type = new EntityType();
        type.setId(1L);
        type.setName("Old Name");
        type.setSystemName("customer");
        type.setVersion(0L);

        UpdateEntityTypeRequest request = new UpdateEntityTypeRequest("New Name", "New Desc", 0L);

        when(entityTypeRepository.findByIdAndDeletedDateIsNull(1L)).thenReturn(Optional.of(type));
        when(entityTypeRepository.save(any(EntityType.class))).thenAnswer(i -> i.getArgument(0));

        EntityTypeResponse result = metadataService.updateEntityType(1L, request);
        assertNotNull(result);
        assertEquals("New Name", result.name());
        assertEquals("New Desc", result.description());
        verify(entityTypeRepository).save(type);
    }

    @Test
    void testUpdateEntityType_ConflictOnVersionMismatch() {
        EntityType type = new EntityType();
        type.setId(1L);
        type.setVersion(1L);

        UpdateEntityTypeRequest request = new UpdateEntityTypeRequest("New Name", "New Desc", 0L);

        when(entityTypeRepository.findByIdAndDeletedDateIsNull(1L)).thenReturn(Optional.of(type));

        assertThrows(MetadataConflictException.class, () -> metadataService.updateEntityType(1L, request));
        verify(entityTypeRepository, never()).save(any());
    }

    @Test
    void testDeleteEntityType_CascadesSoftDelete() {
        EntityType type = new EntityType();
        type.setId(1L);

        AttributeDefinition attr = new AttributeDefinition();
        attr.setId(10L);

        EntityRecord record = new EntityRecord();
        record.setId(100L);

        when(entityTypeRepository.findByIdAndDeletedDateIsNull(1L)).thenReturn(Optional.of(type));
        when(attributeDefinitionRepository.findByEntityTypeIdAndDeletedDateIsNull(1L)).thenReturn(java.util.List.of(attr));
        when(entityRecordRepository.findByEntityTypeIdAndDeletedDateIsNull(1L)).thenReturn(java.util.List.of(record));

        metadataService.deleteEntityType(1L);

        assertNotNull(type.getDeletedDate());
        assertNotNull(attr.getDeletedDate());
        assertNotNull(record.getDeletedDate());
        verify(entityTypeRepository).save(type);
        verify(attributeDefinitionRepository).save(attr);
        verify(entityRecordRepository).save(record);
    }

    @Test
    void testUpdateAttributeDefinition_Success() {
        EntityType type = new EntityType();
        type.setId(1L);

        AttributeDefinition attr = new AttributeDefinition();
        attr.setId(10L);
        attr.setEntityType(type);
        attr.setDataType("string");
        attr.setUiComponent("text");
        attr.setVersion(0L);

        UpdateAttributeRequest request = new UpdateAttributeRequest("Full Name", "textarea", true, false, null, null, null, 0L);

        when(entityTypeRepository.findByIdAndDeletedDateIsNull(1L)).thenReturn(Optional.of(type));
        when(attributeDefinitionRepository.findByEntityTypeIdAndIdAndDeletedDateIsNull(1L, 10L)).thenReturn(Optional.of(attr));
        when(attributeDefinitionRepository.save(any(AttributeDefinition.class))).thenAnswer(i -> i.getArgument(0));

        AttributeDefinitionResponse result = metadataService.updateAttributeDefinition(1L, 10L, request);
        assertNotNull(result);
        assertEquals("Full Name", result.name());
        assertEquals("textarea", result.uiComponent());
        verify(attributeDefinitionRepository).save(attr);
        verify(eventPublisher).publishEvent(any(AttributeDefinitionUpdatedEvent.class));
    }

    @Test
    void testDeleteAttributeDefinition_GuardedThrowsWhenValuesExist() {
        EntityType type = new EntityType();
        type.setId(1L);

        AttributeDefinition attr = new AttributeDefinition();
        attr.setId(10L);
        attr.setSystemName("email");

        EntityRecord record = new EntityRecord();
        record.setAttributes(Map.of("email", "john@example.com"));

        when(entityTypeRepository.findByIdAndDeletedDateIsNull(1L)).thenReturn(Optional.of(type));
        when(attributeDefinitionRepository.findByEntityTypeIdAndIdAndDeletedDateIsNull(1L, 10L)).thenReturn(Optional.of(attr));
        when(entityRecordRepository.findByEntityTypeIdAndDeletedDateIsNull(1L)).thenReturn(java.util.List.of(record));

        assertThrows(MetadataConflictException.class, () -> metadataService.deleteAttributeDefinition(1L, 10L, false));
        assertNull(attr.getDeletedDate());
        verify(attributeDefinitionRepository, never()).save(any());
    }

    @Test
    void testDeleteAttributeDefinition_ForceSuccess() {
        EntityType type = new EntityType();
        type.setId(1L);

        AttributeDefinition attr = new AttributeDefinition();
        attr.setId(10L);
        attr.setSystemName("email");

        EntityRecord record = new EntityRecord();
        record.setAttributes(Map.of("email", "john@example.com"));

        when(entityTypeRepository.findByIdAndDeletedDateIsNull(1L)).thenReturn(Optional.of(type));
        when(attributeDefinitionRepository.findByEntityTypeIdAndIdAndDeletedDateIsNull(1L, 10L)).thenReturn(Optional.of(attr));

        metadataService.deleteAttributeDefinition(1L, 10L, true);

        assertNotNull(attr.getDeletedDate());
        verify(attributeDefinitionRepository).save(attr);
        verify(eventPublisher).publishEvent(any(AttributeDefinitionUpdatedEvent.class));
    }

    @Test
    void testArchiveAndUnarchiveAttribute() {
        EntityType type = new EntityType();
        type.setId(1L);

        AttributeDefinition attr = new AttributeDefinition();
        attr.setId(10L);
        attr.setIsArchived(false);

        when(entityTypeRepository.findByIdAndDeletedDateIsNull(1L)).thenReturn(Optional.of(type));
        when(attributeDefinitionRepository.findByEntityTypeIdAndIdAndDeletedDateIsNull(1L, 10L)).thenReturn(Optional.of(attr));
        when(attributeDefinitionRepository.save(any(AttributeDefinition.class))).thenAnswer(i -> i.getArgument(0));

        metadataService.archiveAttributeDefinition(1L, 10L);
        assertTrue(attr.getIsArchived());

        metadataService.unarchiveAttributeDefinition(1L, 10L);
        assertFalse(attr.getIsArchived());
    }

    @Test
    void testReorderAttributes() {
        EntityType type = new EntityType();
        type.setId(1L);

        AttributeDefinition attr1 = new AttributeDefinition();
        attr1.setId(10L);
        attr1.setDisplayOrder(0);

        AttributeDefinition attr2 = new AttributeDefinition();
        attr2.setId(20L);
        attr2.setDisplayOrder(1);

        when(entityTypeRepository.findByIdAndDeletedDateIsNull(1L)).thenReturn(Optional.of(type));
        when(attributeDefinitionRepository.findAllByIdInAndEntityTypeIdAndDeletedDateIsNull(java.util.List.of(20L, 10L), 1L)).thenReturn(java.util.List.of(attr1, attr2));

        ReorderAttributesRequest request = new ReorderAttributesRequest(java.util.List.of(20L, 10L));
        metadataService.reorderAttributes(1L, request);

        assertEquals(0, attr2.getDisplayOrder());
        assertEquals(1, attr1.getDisplayOrder());
        verify(attributeDefinitionRepository).save(attr1);
        verify(attributeDefinitionRepository).save(attr2);
        verify(eventPublisher).publishEvent(any(AttributeDefinitionUpdatedEvent.class));
    }

    @Test
    void testUpdateEntityRecord_Success() {
        EntityType type = new EntityType();
        type.setId(1L);
        type.setSchemaVersion(2L);

        EntityRecord record = new EntityRecord();
        record.setId(100L);
        record.setEntityType(type);
        record.setAttributes(new HashMap<>(Map.of("name", "Old")));
        record.setVersion(0L);

        UpdateRecordRequest request = new UpdateRecordRequest(Map.of("name", "New"), 0L);

        when(entityTypeRepository.findByIdAndDeletedDateIsNull(1L)).thenReturn(Optional.of(type));
        when(entityRecordRepository.findByEntityTypeIdAndIdAndDeletedDateIsNull(1L, 100L)).thenReturn(Optional.of(record));
        when(entityRecordRepository.save(any(EntityRecord.class))).thenAnswer(i -> i.getArgument(0));

        EntityRecordResponse result = metadataService.updateEntityRecord(1L, 100L, request);
        assertNotNull(result);
        assertEquals("New", result.attributes().get("name"));
        assertEquals(2L, record.getSchemaVersion());
        verify(schemaValidationService).validatePayload(1L, Map.of("name", "New"));
    }

    @Test
    void testPatchEntityRecord_Success() {
        EntityType type = new EntityType();
        type.setId(1L);
        type.setSchemaVersion(3L);

        Map<String, Object> initial = new HashMap<>();
        initial.put("first", "John");
        initial.put("last", "Doe");

        EntityRecord record = new EntityRecord();
        record.setId(100L);
        record.setEntityType(type);
        record.setAttributes(initial);
        record.setVersion(0L);

        PatchRecordRequest request = new PatchRecordRequest(Map.of("last", "Smith"), 0L);

        when(entityTypeRepository.findByIdAndDeletedDateIsNull(1L)).thenReturn(Optional.of(type));
        when(entityRecordRepository.findByEntityTypeIdAndIdAndDeletedDateIsNull(1L, 100L)).thenReturn(Optional.of(record));
        when(entityRecordRepository.save(any(EntityRecord.class))).thenAnswer(i -> i.getArgument(0));

        EntityRecordResponse result = metadataService.patchEntityRecord(1L, 100L, request);
        assertNotNull(result);
        assertEquals("John", result.attributes().get("first"));
        assertEquals("Smith", result.attributes().get("last"));
        assertEquals(3L, record.getSchemaVersion());
    }

    @Test
    void testDeleteEntityRecord_SoftDelete() {
        EntityType type = new EntityType();
        type.setId(1L);

        EntityRecord record = new EntityRecord();
        record.setId(100L);

        when(entityTypeRepository.findByIdAndDeletedDateIsNull(1L)).thenReturn(Optional.of(type));
        when(entityRecordRepository.findByEntityTypeIdAndIdAndDeletedDateIsNull(1L, 100L)).thenReturn(Optional.of(record));

        metadataService.deleteEntityRecord(1L, 100L);
        assertNotNull(record.getDeletedDate());
        verify(entityRecordRepository).save(record);
    }
}
