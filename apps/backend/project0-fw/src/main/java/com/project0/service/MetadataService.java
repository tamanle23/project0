package com.project0.service;

import com.project0.domain.metadata.AttributeDefinition;
import com.project0.domain.metadata.AttributeDefinitionUpdatedEvent;
import com.project0.domain.metadata.EntityRecord;
import com.project0.domain.metadata.EntityType;
import com.project0.repository.jpa.AttributeDefinitionRepository;
import com.project0.repository.jpa.EntityRecordRepository;
import com.project0.repository.jpa.EntityTypeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MetadataService {

    private final EntityTypeRepository entityTypeRepository;
    private final AttributeDefinitionRepository attributeDefinitionRepository;
    private final EntityRecordRepository entityRecordRepository;
    private final SchemaValidationService schemaValidationService;
    private final ApplicationEventPublisher eventPublisher;

    public List<EntityType> getEntityTypes() {
        return entityTypeRepository.findAll();
    }

    @Transactional
    public EntityType createEntityType(EntityType entityType) {
        return entityTypeRepository.save(entityType);
    }

    public List<AttributeDefinition> getAttributeDefinitions(Long entityTypeId) {
        return attributeDefinitionRepository.findByEntityTypeId(entityTypeId);
    }

    @Transactional
    public AttributeDefinition createAttributeDefinition(Long entityTypeId, AttributeDefinition attributeDefinition) {
        EntityType entityType = entityTypeRepository.findById(entityTypeId)
                .orElseThrow(() -> new IllegalArgumentException("EntityType not found"));

        attributeDefinition.setEntityType(entityType);
        AttributeDefinition saved = attributeDefinitionRepository.save(attributeDefinition);

        eventPublisher.publishEvent(new AttributeDefinitionUpdatedEvent(this, entityTypeId));
        return saved;
    }

    public List<EntityRecord> getEntityRecords(Long entityTypeId) {
        return entityRecordRepository.findByEntityTypeId(entityTypeId);
    }

    @Transactional
    public EntityRecord createEntityRecord(Long entityTypeId, EntityRecord record) {
        EntityType entityType = entityTypeRepository.findById(entityTypeId)
                .orElseThrow(() -> new IllegalArgumentException("EntityType not found"));

        if (record.getAttributes() != null) {
            schemaValidationService.validatePayload(entityTypeId, record.getAttributes());
        }

        record.setEntityType(entityType);
        return entityRecordRepository.save(record);
    }
}
