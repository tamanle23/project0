package com.project0.service;

import com.project0.core.io.Page;
import com.project0.core.io.PageRequest;
import com.project0.domain.metadata.AttributeDefinition;
import com.project0.domain.metadata.AttributeDefinitionUpdatedEvent;
import com.project0.domain.metadata.EntityRecord;
import com.project0.domain.metadata.EntityType;
import com.project0.repository.jpa.AttributeDefinitionRepository;
import com.project0.repository.jpa.EntityRecordRepository;
import com.project0.repository.jpa.EntityTypeRepository;
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
        when(entityTypeRepository.findAll(any(org.springframework.data.domain.PageRequest.class))).thenReturn(springPageMock);
        when(pageBuilder.build(eq(defaultPageRequest), any(), any())).thenReturn(customPageMock);

        Page<EntityType> result = metadataService.getEntityTypes(defaultPageRequest);

        assertNotNull(result);
        verify(entityTypeRepository).findAll(any(org.springframework.data.domain.PageRequest.class));
        verify(pageBuilder).build(eq(defaultPageRequest), any(), any());
    }

    @Test
    void testCreateEntityType() {
        EntityType type = new EntityType();
        when(entityTypeRepository.save(type)).thenReturn(type);

        EntityType result = metadataService.createEntityType(type);

        assertNotNull(result);
        verify(entityTypeRepository).save(type);
    }

    @Test
    void testCreateAttributeDefinition() {
        Long typeId = 1L;
        EntityType type = new EntityType();
        type.setId(typeId);

        AttributeDefinition attr = new AttributeDefinition();

        when(entityTypeRepository.findById(typeId)).thenReturn(Optional.of(type));
        when(attributeDefinitionRepository.save(any(AttributeDefinition.class))).thenReturn(attr);

        AttributeDefinition result = metadataService.createAttributeDefinition(typeId, attr);

        assertNotNull(result);
        assertEquals(type, attr.getEntityType());
        verify(attributeDefinitionRepository).save(attr);
        verify(eventPublisher).publishEvent(any(AttributeDefinitionUpdatedEvent.class));
    }

    @Test
    void testCreateEntityRecord() {
        Long typeId = 1L;
        EntityType type = new EntityType();
        type.setId(typeId);

        Map<String, Object> attributes = new HashMap<>();
        attributes.put("key", "value");
        EntityRecord record = new EntityRecord();
        record.setAttributes(attributes);

        when(entityTypeRepository.findById(typeId)).thenReturn(Optional.of(type));
        when(entityRecordRepository.save(any(EntityRecord.class))).thenReturn(record);

        EntityRecord result = metadataService.createEntityRecord(typeId, record);

        assertNotNull(result);
        assertEquals(type, record.getEntityType());
        verify(schemaValidationService).validatePayload(typeId, attributes);
        verify(entityRecordRepository).save(record);
    }

    @Test
    void testCreateEntityRecord_ThrowsIfTypeNotFound() {
        Long typeId = 99L;
        EntityRecord record = new EntityRecord();

        when(entityTypeRepository.findById(typeId)).thenReturn(Optional.empty());

        assertThrows(IllegalArgumentException.class, () -> {
            metadataService.createEntityRecord(typeId, record);
        });

        verify(schemaValidationService, never()).validatePayload(any(), any());
        verify(entityRecordRepository, never()).save(any());
    }
}
