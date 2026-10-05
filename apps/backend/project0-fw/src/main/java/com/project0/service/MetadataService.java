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
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MetadataService {

    private final EntityTypeRepository entityTypeRepository;
    private final AttributeDefinitionRepository attributeDefinitionRepository;
    private final EntityRecordRepository entityRecordRepository;
    private final SchemaValidationService schemaValidationService;
    private final ApplicationEventPublisher eventPublisher;
    private final PageBuilder pageBuilder;

    private org.springframework.data.domain.PageRequest toSpringPageRequest(PageRequest request) {
        int page = request.getNumber() != null ? request.getNumber() - 1 : 0;
        int size = request.getSize() > 0 ? request.getSize() : 10;
        return org.springframework.data.domain.PageRequest.of(page, size);
    }

    public Page<EntityType> getEntityTypes(PageRequest pageRequest) {
        org.springframework.data.domain.Page<EntityType> springPage = entityTypeRepository.findAll(toSpringPageRequest(pageRequest));
        return pageBuilder.build(pageRequest, springPage::getTotalElements, springPage::getContent);
    }

    @Transactional
    public EntityType createEntityType(EntityType entityType) {
        return entityTypeRepository.save(entityType);
    }

    public Page<AttributeDefinition> getAttributeDefinitions(Long entityTypeId, PageRequest pageRequest) {
        org.springframework.data.domain.Page<AttributeDefinition> springPage = attributeDefinitionRepository.findByEntityTypeId(entityTypeId, toSpringPageRequest(pageRequest));
        return pageBuilder.build(pageRequest, springPage::getTotalElements, springPage::getContent);
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

    public Page<EntityRecord> getEntityRecords(Long entityTypeId, PageRequest pageRequest) {
        org.springframework.data.domain.Page<EntityRecord> springPage = entityRecordRepository.findByEntityTypeId(entityTypeId, toSpringPageRequest(pageRequest));
        return pageBuilder.build(pageRequest, springPage::getTotalElements, springPage::getContent);
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
