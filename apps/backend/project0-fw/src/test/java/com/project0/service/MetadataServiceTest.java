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
    void testCreateEntityRecord_ThrowsIfTypeNotFound() {
        Long typeId = 99L;
        CreateRecordRequest request = new CreateRecordRequest(Map.of(), "tenant-1");

        when(entityTypeRepository.findByIdAndDeletedDateIsNull(typeId)).thenReturn(Optional.empty());

        assertThrows(MetadataNotFoundException.class, () -> metadataService.createEntityRecord(typeId, request));

        verify(schemaValidationService, never()).validatePayload(any(), any());
        verify(entityRecordRepository, never()).save(any());
    }
}
