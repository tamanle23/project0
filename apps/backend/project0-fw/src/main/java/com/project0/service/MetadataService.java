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
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.stream.Collectors;

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
        int page = (request != null && request.getNumber() != null && request.getNumber() > 0) ? request.getNumber() - 1 : 0;
        int size = (request != null && request.getSize() > 0) ? request.getSize() : 10;
        return org.springframework.data.domain.PageRequest.of(page, size);
    }

    public Page<EntityTypeResponse> getEntityTypes(PageRequest pageRequest) {
        org.springframework.data.domain.Page<EntityType> springPage = entityTypeRepository.findAllByDeletedDateIsNull(toSpringPageRequest(pageRequest));
        return pageBuilder.build(
                pageRequest,
                springPage::getTotalElements,
                () -> springPage.getContent().stream().map(MetadataDtoMapper::toResponse).collect(Collectors.toList())
        );
    }

    @Transactional
    public EntityTypeResponse createEntityType(CreateEntityTypeRequest request) {
        if (entityTypeRepository.existsBySystemNameAndDeletedDateIsNull(request.systemName().trim())) {
            throw new MetadataConflictException("EntityType with systemName '" + request.systemName() + "' already exists");
        }
        EntityType entityType = MetadataDtoMapper.toEntity(request);
        EntityType saved = entityTypeRepository.save(entityType);
        return MetadataDtoMapper.toResponse(saved);
    }

    public Page<AttributeDefinitionResponse> getAttributeDefinitions(Long entityTypeId, PageRequest pageRequest) {
        if (!entityTypeRepository.findByIdAndDeletedDateIsNull(entityTypeId).isPresent()) {
            throw new MetadataNotFoundException("EntityType not found with id: " + entityTypeId);
        }
        org.springframework.data.domain.Page<AttributeDefinition> springPage = attributeDefinitionRepository.findByEntityTypeIdAndDeletedDateIsNull(entityTypeId, toSpringPageRequest(pageRequest));
        return pageBuilder.build(
                pageRequest,
                springPage::getTotalElements,
                () -> springPage.getContent().stream().map(MetadataDtoMapper::toResponse).collect(Collectors.toList())
        );
    }

    @Transactional
    public AttributeDefinitionResponse createAttributeDefinition(Long entityTypeId, CreateAttributeRequest request) {
        EntityType entityType = entityTypeRepository.findByIdAndDeletedDateIsNull(entityTypeId)
                .orElseThrow(() -> new MetadataNotFoundException("EntityType not found with id: " + entityTypeId));

        if (attributeDefinitionRepository.existsByEntityTypeIdAndSystemNameAndDeletedDateIsNull(entityTypeId, request.systemName().trim())) {
            throw new MetadataConflictException("Attribute with systemName '" + request.systemName() + "' already exists for EntityType " + entityTypeId);
        }

        AttributeDefinition attributeDefinition = MetadataDtoMapper.toEntity(request, entityType);
        AttributeDefinition saved = attributeDefinitionRepository.save(attributeDefinition);

        eventPublisher.publishEvent(new AttributeDefinitionUpdatedEvent(this, entityTypeId));
        return MetadataDtoMapper.toResponse(saved);
    }

    public Page<EntityRecordResponse> getEntityRecords(Long entityTypeId, PageRequest pageRequest) {
        if (!entityTypeRepository.findByIdAndDeletedDateIsNull(entityTypeId).isPresent()) {
            throw new MetadataNotFoundException("EntityType not found with id: " + entityTypeId);
        }
        org.springframework.data.domain.Page<EntityRecord> springPage = entityRecordRepository.findByEntityTypeIdAndDeletedDateIsNull(entityTypeId, toSpringPageRequest(pageRequest));
        return pageBuilder.build(
                pageRequest,
                springPage::getTotalElements,
                () -> springPage.getContent().stream().map(MetadataDtoMapper::toResponse).collect(Collectors.toList())
        );
    }

    @Transactional
    public EntityRecordResponse createEntityRecord(Long entityTypeId, CreateRecordRequest request) {
        EntityType entityType = entityTypeRepository.findByIdAndDeletedDateIsNull(entityTypeId)
                .orElseThrow(() -> new MetadataNotFoundException("EntityType not found with id: " + entityTypeId));

        if (request.attributes() != null) {
            schemaValidationService.validatePayload(entityTypeId, request.attributes());
        }

        EntityRecord record = MetadataDtoMapper.toEntity(request, entityType);
        EntityRecord saved = entityRecordRepository.save(record);
        return MetadataDtoMapper.toResponse(saved);
    }
}
