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

import java.time.LocalDateTime;
import java.util.*;
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

    private void incrementSchemaVersion(EntityType entityType) {
        long nextVersion = (entityType.getSchemaVersion() != null ? entityType.getSchemaVersion() : 1L) + 1L;
        entityType.setSchemaVersion(nextVersion);
        entityTypeRepository.save(entityType);
    }

    // ==========================================
    // 1. Entity Type Lifecycle
    // ==========================================

    public Page<EntityTypeResponse> getEntityTypes(PageRequest pageRequest) {
        org.springframework.data.domain.Page<EntityType> springPage = entityTypeRepository.findAllByDeletedDateIsNull(toSpringPageRequest(pageRequest));
        return pageBuilder.build(
                pageRequest,
                springPage::getTotalElements,
                () -> springPage.getContent().stream().map(MetadataDtoMapper::toResponse).collect(Collectors.toList())
        );
    }

    public EntityTypeResponse getEntityType(Long id) {
        EntityType entityType = entityTypeRepository.findByIdAndDeletedDateIsNull(id)
                .orElseThrow(() -> new MetadataNotFoundException("EntityType not found with id: " + id));
        return MetadataDtoMapper.toResponse(entityType);
    }

    public CompiledSchemaResponse getCompiledSchema(Long id) {
        EntityType entityType = entityTypeRepository.findByIdAndDeletedDateIsNull(id)
                .orElseThrow(() -> new MetadataNotFoundException("EntityType not found with id: " + id));
        com.fasterxml.jackson.databind.JsonNode schemaNode = schemaValidationService.compileSchemaNode(id);
        return new CompiledSchemaResponse(id, entityType.getSchemaVersion(), schemaNode);
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

    @Transactional
    public EntityTypeResponse updateEntityType(Long id, UpdateEntityTypeRequest request) {
        EntityType entityType = entityTypeRepository.findByIdAndDeletedDateIsNull(id)
                .orElseThrow(() -> new MetadataNotFoundException("EntityType not found with id: " + id));

        // Optimistic locking check
        if (request.version() != null && !request.version().equals(entityType.getVersion())) {
            throw new MetadataConflictException("Optimistic lock conflict: EntityType version mismatch (expected: " 
                    + entityType.getVersion() + ", actual: " + request.version() + ")");
        }

        entityType.setName(request.name().trim());
        entityType.setDescription(request.description() != null ? request.description().trim() : null);
        long nextVersion = (entityType.getSchemaVersion() != null ? entityType.getSchemaVersion() : 1L) + 1L;
        entityType.setSchemaVersion(nextVersion);

        EntityType saved = entityTypeRepository.save(entityType);
        eventPublisher.publishEvent(new AttributeDefinitionUpdatedEvent(this, id));
        return MetadataDtoMapper.toResponse(saved);
    }

    @Transactional
    public void deleteEntityType(Long id) {
        EntityType entityType = entityTypeRepository.findByIdAndDeletedDateIsNull(id)
                .orElseThrow(() -> new MetadataNotFoundException("EntityType not found with id: " + id));

        LocalDateTime now = LocalDateTime.now();
        entityType.setDeletedDate(now);
        entityTypeRepository.save(entityType);

        // Cascading soft-delete to attributes
        List<AttributeDefinition> attributes = attributeDefinitionRepository.findByEntityTypeIdAndDeletedDateIsNull(id);
        for (AttributeDefinition attr : attributes) {
            attr.setDeletedDate(now);
            attributeDefinitionRepository.save(attr);
        }

        // Cascading soft-delete to records
        List<EntityRecord> records = entityRecordRepository.findByEntityTypeIdAndDeletedDateIsNull(id);
        for (EntityRecord record : records) {
            record.setDeletedDate(now);
            entityRecordRepository.save(record);
        }

        eventPublisher.publishEvent(new AttributeDefinitionUpdatedEvent(this, id));
    }

    // ==========================================
    // 2. Attribute Definition Lifecycle
    // ==========================================

    public Page<AttributeDefinitionResponse> getAttributeDefinitions(Long entityTypeId, PageRequest pageRequest) {
        if (!entityTypeRepository.findByIdAndDeletedDateIsNull(entityTypeId).isPresent()) {
            throw new MetadataNotFoundException("EntityType not found with id: " + entityTypeId);
        }
        org.springframework.data.domain.Page<AttributeDefinition> springPage = 
                attributeDefinitionRepository.findByEntityTypeIdAndDeletedDateIsNullOrderByDisplayOrderAsc(entityTypeId, toSpringPageRequest(pageRequest));
        return pageBuilder.build(
                pageRequest,
                springPage::getTotalElements,
                () -> springPage.getContent().stream().map(MetadataDtoMapper::toResponse).collect(Collectors.toList())
        );
    }

    public AttributeDefinitionResponse getAttributeDefinition(Long entityTypeId, Long attributeId) {
        if (!entityTypeRepository.findByIdAndDeletedDateIsNull(entityTypeId).isPresent()) {
            throw new MetadataNotFoundException("EntityType not found with id: " + entityTypeId);
        }
        AttributeDefinition attr = attributeDefinitionRepository.findByEntityTypeIdAndIdAndDeletedDateIsNull(entityTypeId, attributeId)
                .orElseThrow(() -> new MetadataNotFoundException("AttributeDefinition not found with id: " + attributeId + " for entityTypeId: " + entityTypeId));
        return MetadataDtoMapper.toResponse(attr);
    }

    @Transactional
    public AttributeDefinitionResponse createAttributeDefinition(Long entityTypeId, CreateAttributeRequest request) {
        EntityType entityType = entityTypeRepository.findByIdAndDeletedDateIsNull(entityTypeId)
                .orElseThrow(() -> new MetadataNotFoundException("EntityType not found with id: " + entityTypeId));

        if (attributeDefinitionRepository.existsByEntityTypeIdAndSystemNameAndDeletedDateIsNull(entityTypeId, request.systemName().trim())) {
            throw new MetadataConflictException("Attribute with systemName '" + request.systemName() + "' already exists for EntityType " + entityTypeId);
        }

        AttributeDefinition attributeDefinition = MetadataDtoMapper.toEntity(request, entityType);
        List<AttributeDefinition> existingAttrs = attributeDefinitionRepository.findByEntityTypeIdAndDeletedDateIsNullOrderByDisplayOrderAsc(entityTypeId);
        int nextOrder = existingAttrs.stream()
                .mapToInt(a -> a.getDisplayOrder() != null ? a.getDisplayOrder() : 0)
                .max()
                .orElse(-1) + 1;
        attributeDefinition.setDisplayOrder(nextOrder);

        AttributeDefinition saved = attributeDefinitionRepository.save(attributeDefinition);

        incrementSchemaVersion(entityType);
        eventPublisher.publishEvent(new AttributeDefinitionUpdatedEvent(this, entityTypeId));
        return MetadataDtoMapper.toResponse(saved);
    }

    @Transactional
    public AttributeDefinitionResponse updateAttributeDefinition(Long entityTypeId, Long attributeId, UpdateAttributeRequest request) {
        EntityType entityType = entityTypeRepository.findByIdAndDeletedDateIsNull(entityTypeId)
                .orElseThrow(() -> new MetadataNotFoundException("EntityType not found with id: " + entityTypeId));

        AttributeDefinition attr = attributeDefinitionRepository.findByEntityTypeIdAndIdAndDeletedDateIsNull(entityTypeId, attributeId)
                .orElseThrow(() -> new MetadataNotFoundException("AttributeDefinition not found with id: " + attributeId + " for entityTypeId: " + entityTypeId));

        // Optimistic locking check
        if (request.version() != null && !request.version().equals(attr.getVersion())) {
            throw new MetadataConflictException("Optimistic lock conflict: AttributeDefinition version mismatch (expected: " 
                    + attr.getVersion() + ", actual: " + request.version() + ")");
        }

        // Validate compatibility if uiComponent is updated
        if (request.uiComponent() != null && !request.uiComponent().equalsIgnoreCase(attr.getUiComponent())) {
            validateUiComponentCompatibility(attr.getDataType(), request.uiComponent());
            attr.setUiComponent(request.uiComponent().trim().toLowerCase());
        }

        attr.setName(request.name().trim());
        if (request.isRequired() != null) attr.setIsRequired(request.isRequired());
        if (request.isArchived() != null) attr.setIsArchived(request.isArchived());
        if (request.displayOrder() != null) attr.setDisplayOrder(request.displayOrder());
        if (request.options() != null) attr.setOptions(request.options());
        if (request.defaultValue() != null) attr.setDefaultValue(request.defaultValue());

        AttributeDefinition saved = attributeDefinitionRepository.save(attr);

        incrementSchemaVersion(entityType);
        eventPublisher.publishEvent(new AttributeDefinitionUpdatedEvent(this, entityTypeId));
        return MetadataDtoMapper.toResponse(saved);
    }

    @Transactional
    public void deleteAttributeDefinition(Long entityTypeId, Long attributeId, boolean force) {
        EntityType entityType = entityTypeRepository.findByIdAndDeletedDateIsNull(entityTypeId)
                .orElseThrow(() -> new MetadataNotFoundException("EntityType not found with id: " + entityTypeId));

        AttributeDefinition attr = attributeDefinitionRepository.findByEntityTypeIdAndIdAndDeletedDateIsNull(entityTypeId, attributeId)
                .orElseThrow(() -> new MetadataNotFoundException("AttributeDefinition not found with id: " + attributeId + " for entityTypeId: " + entityTypeId));

        // Delete guard: check if any record contains this attribute key
        if (!force) {
            List<EntityRecord> records = entityRecordRepository.findByEntityTypeIdAndDeletedDateIsNull(entityTypeId);
            boolean keyInUse = records.stream().anyMatch(r -> r.getAttributes() != null && r.getAttributes().containsKey(attr.getSystemName()));
            if (keyInUse) {
                throw new MetadataConflictException("Cannot delete attribute '" + attr.getSystemName() 
                        + "' because existing records contain values for it. Archive the attribute or specify force=true to proceed.");
            }
        }

        attr.setDeletedDate(LocalDateTime.now());
        attributeDefinitionRepository.save(attr);

        incrementSchemaVersion(entityType);
        eventPublisher.publishEvent(new AttributeDefinitionUpdatedEvent(this, entityTypeId));
    }

    @Transactional
    public AttributeDefinitionResponse archiveAttributeDefinition(Long entityTypeId, Long attributeId) {
        EntityType entityType = entityTypeRepository.findByIdAndDeletedDateIsNull(entityTypeId)
                .orElseThrow(() -> new MetadataNotFoundException("EntityType not found with id: " + entityTypeId));

        AttributeDefinition attr = attributeDefinitionRepository.findByEntityTypeIdAndIdAndDeletedDateIsNull(entityTypeId, attributeId)
                .orElseThrow(() -> new MetadataNotFoundException("AttributeDefinition not found with id: " + attributeId + " for entityTypeId: " + entityTypeId));

        attr.setIsArchived(true);
        AttributeDefinition saved = attributeDefinitionRepository.save(attr);

        incrementSchemaVersion(entityType);
        eventPublisher.publishEvent(new AttributeDefinitionUpdatedEvent(this, entityTypeId));
        return MetadataDtoMapper.toResponse(saved);
    }

    @Transactional
    public AttributeDefinitionResponse unarchiveAttributeDefinition(Long entityTypeId, Long attributeId) {
        EntityType entityType = entityTypeRepository.findByIdAndDeletedDateIsNull(entityTypeId)
                .orElseThrow(() -> new MetadataNotFoundException("EntityType not found with id: " + entityTypeId));

        AttributeDefinition attr = attributeDefinitionRepository.findByEntityTypeIdAndIdAndDeletedDateIsNull(entityTypeId, attributeId)
                .orElseThrow(() -> new MetadataNotFoundException("AttributeDefinition not found with id: " + attributeId + " for entityTypeId: " + entityTypeId));

        attr.setIsArchived(false);
        AttributeDefinition saved = attributeDefinitionRepository.save(attr);

        incrementSchemaVersion(entityType);
        eventPublisher.publishEvent(new AttributeDefinitionUpdatedEvent(this, entityTypeId));
        return MetadataDtoMapper.toResponse(saved);
    }

    @Transactional
    public List<AttributeDefinitionResponse> reorderAttributes(Long entityTypeId, ReorderAttributesRequest request) {
        EntityType entityType = entityTypeRepository.findByIdAndDeletedDateIsNull(entityTypeId)
                .orElseThrow(() -> new MetadataNotFoundException("EntityType not found with id: " + entityTypeId));

        List<Long> orderedIds = request.attributeIds();
        List<AttributeDefinition> attributes = attributeDefinitionRepository.findAllByIdInAndEntityTypeIdAndDeletedDateIsNull(orderedIds, entityTypeId);
        Map<Long, AttributeDefinition> attrMap = attributes.stream().collect(Collectors.toMap(AttributeDefinition::getId, a -> a));

        List<AttributeDefinitionResponse> result = new ArrayList<>();
        for (int i = 0; i < orderedIds.size(); i++) {
            Long id = orderedIds.get(i);
            AttributeDefinition attr = attrMap.get(id);
            if (attr != null) {
                attr.setDisplayOrder(i);
                attributeDefinitionRepository.save(attr);
                result.add(MetadataDtoMapper.toResponse(attr));
            }
        }

        incrementSchemaVersion(entityType);
        eventPublisher.publishEvent(new AttributeDefinitionUpdatedEvent(this, entityTypeId));
        return result;
    }

    private void validateUiComponentCompatibility(String dataType, String newUiComponent) {
        if (newUiComponent == null || dataType == null) return;
        String comp = newUiComponent.toLowerCase();
        String dt = dataType.toLowerCase();
        boolean valid = switch (dt) {
            case "string" -> comp.equals("text") || comp.equals("textarea") || comp.equals("select") || comp.equals("datepicker") || comp.equals("relation_picker");
            case "number", "integer" -> comp.equals("number") || comp.equals("text");
            case "boolean" -> comp.equals("switch");
            case "date" -> comp.equals("datepicker") || comp.equals("text");
            case "json" -> comp.equals("json_editor");
            case "array" -> comp.equals("multiselect") || comp.equals("json_editor");
            case "relation" -> comp.equals("relation_picker") || comp.equals("text");
            default -> true;
        };
        if (!valid) {
            throw new MetadataConflictException("uiComponent '" + newUiComponent + "' is not compatible with dataType '" + dataType + "'");
        }
    }

    // ==========================================
    // 3. Entity Record Lifecycle
    // ==========================================

    private Map<String, Object> applyAttributeDefaults(Long entityTypeId, Map<String, Object> attributes) {
        Map<String, Object> result = new HashMap<>();
        List<AttributeDefinition> definitions = attributeDefinitionRepository.findByEntityTypeIdAndDeletedDateIsNull(entityTypeId);
        
        for (AttributeDefinition def : definitions) {
            if (Boolean.TRUE.equals(def.getIsArchived())) continue;
            if (def.getDefaultValue() != null && !def.getDefaultValue().isBlank()) {
                String type = def.getDataType() != null ? def.getDataType().trim().toLowerCase() : "string";
                try {
                    switch (type) {
                        case "boolean" -> result.put(def.getSystemName(), Boolean.parseBoolean(def.getDefaultValue()));
                        case "integer" -> result.put(def.getSystemName(), Long.parseLong(def.getDefaultValue().trim()));
                        case "number" -> result.put(def.getSystemName(), Double.parseDouble(def.getDefaultValue().trim()));
                        default -> result.put(def.getSystemName(), def.getDefaultValue());
                    }
                } catch (Exception ignored) {
                    result.put(def.getSystemName(), def.getDefaultValue());
                }
            }
        }
        
        if (attributes != null) {
            result.putAll(attributes);
        }
        return result;
    }

    public Page<EntityRecordResponse> getEntityRecords(
            Long entityTypeId,
            PageRequest pageRequest,
            Map<String, Map<String, String>> filterParams,
            String sortProperty,
            String sortDirection,
            String tenantId) {
        if (!entityTypeRepository.findByIdAndDeletedDateIsNull(entityTypeId).isPresent()) {
            throw new MetadataNotFoundException("EntityType not found with id: " + entityTypeId);
        }

        List<AttributeDefinition> definitions = attributeDefinitionRepository.findByEntityTypeIdAndDeletedDateIsNull(entityTypeId);
        Map<String, AttributeDefinition> activeAttributes = definitions.stream()
                .filter(d -> !Boolean.TRUE.equals(d.getIsArchived()))
                .collect(Collectors.toMap(AttributeDefinition::getSystemName, d -> d, (a, b) -> a));

        org.springframework.data.domain.Pageable pageable = toSpringPageRequest(pageRequest);
        if (sortProperty != null && !sortProperty.isBlank()) {
            org.springframework.data.domain.Sort.Direction direction = "desc".equalsIgnoreCase(sortDirection) 
                    ? org.springframework.data.domain.Sort.Direction.DESC 
                    : org.springframework.data.domain.Sort.Direction.ASC;

            // Whitelist sort fields
            if ("id".equalsIgnoreCase(sortProperty) || "createdDate".equalsIgnoreCase(sortProperty) || "lastUpdatedDate".equalsIgnoreCase(sortProperty)) {
                pageable = org.springframework.data.domain.PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), org.springframework.data.domain.Sort.by(direction, sortProperty));
            }
        }

        org.springframework.data.jpa.domain.Specification<EntityRecord> spec = EntityRecordSpecifications.withFilters(
                entityTypeId,
                tenantId,
                filterParams,
                activeAttributes
        );

        org.springframework.data.domain.Page<EntityRecord> springPage = entityRecordRepository.findAll(spec, pageable);
        return pageBuilder.build(
                pageRequest,
                springPage::getTotalElements,
                () -> springPage.getContent().stream().map(MetadataDtoMapper::toResponse).collect(Collectors.toList())
        );
    }

    public Page<EntityRecordResponse> getEntityRecords(Long entityTypeId, PageRequest pageRequest) {
        return getEntityRecords(entityTypeId, pageRequest, null, null, null, null);
    }

    public EntityRecordResponse getEntityRecord(Long entityTypeId, Long recordId) {
        if (!entityTypeRepository.findByIdAndDeletedDateIsNull(entityTypeId).isPresent()) {
            throw new MetadataNotFoundException("EntityType not found with id: " + entityTypeId);
        }
        EntityRecord record = entityRecordRepository.findByEntityTypeIdAndIdAndDeletedDateIsNull(entityTypeId, recordId)
                .orElseThrow(() -> new MetadataNotFoundException("EntityRecord not found with id: " + recordId + " for entityTypeId: " + entityTypeId));
        return MetadataDtoMapper.toResponse(record);
    }

    @Transactional
    public EntityRecordResponse createEntityRecord(Long entityTypeId, CreateRecordRequest request) {
        EntityType entityType = entityTypeRepository.findByIdAndDeletedDateIsNull(entityTypeId)
                .orElseThrow(() -> new MetadataNotFoundException("EntityType not found with id: " + entityTypeId));

        Map<String, Object> finalAttributes = applyAttributeDefaults(entityTypeId, request.attributes());
        schemaValidationService.validatePayload(entityTypeId, finalAttributes);

        CreateRecordRequest finalRequest = new CreateRecordRequest(finalAttributes, request.tenantId());
        EntityRecord record = MetadataDtoMapper.toEntity(finalRequest, entityType);
        record.setSchemaVersion(entityType.getSchemaVersion() != null ? entityType.getSchemaVersion() : 1L);
        EntityRecord saved = entityRecordRepository.save(record);
        return MetadataDtoMapper.toResponse(saved);
    }

    @Transactional
    public EntityRecordResponse updateEntityRecord(Long entityTypeId, Long recordId, UpdateRecordRequest request) {
        EntityType entityType = entityTypeRepository.findByIdAndDeletedDateIsNull(entityTypeId)
                .orElseThrow(() -> new MetadataNotFoundException("EntityType not found with id: " + entityTypeId));

        EntityRecord record = entityRecordRepository.findByEntityTypeIdAndIdAndDeletedDateIsNull(entityTypeId, recordId)
                .orElseThrow(() -> new MetadataNotFoundException("EntityRecord not found with id: " + recordId + " for entityTypeId: " + entityTypeId));

        // Optimistic locking check
        if (request.version() != null && !request.version().equals(record.getVersion())) {
            throw new MetadataConflictException("Optimistic lock conflict: EntityRecord version mismatch (expected: " 
                    + record.getVersion() + ", actual: " + request.version() + ")");
        }

        Map<String, Object> finalAttributes = applyAttributeDefaults(entityTypeId, request.attributes());
        schemaValidationService.validatePayload(entityTypeId, finalAttributes);

        record.setAttributes(finalAttributes);
        record.setSchemaVersion(entityType.getSchemaVersion() != null ? entityType.getSchemaVersion() : 1L);
        EntityRecord saved = entityRecordRepository.save(record);
        return MetadataDtoMapper.toResponse(saved);
    }

    @Transactional
    public EntityRecordResponse patchEntityRecord(Long entityTypeId, Long recordId, PatchRecordRequest request) {
        EntityType entityType = entityTypeRepository.findByIdAndDeletedDateIsNull(entityTypeId)
                .orElseThrow(() -> new MetadataNotFoundException("EntityType not found with id: " + entityTypeId));

        EntityRecord record = entityRecordRepository.findByEntityTypeIdAndIdAndDeletedDateIsNull(entityTypeId, recordId)
                .orElseThrow(() -> new MetadataNotFoundException("EntityRecord not found with id: " + recordId + " for entityTypeId: " + entityTypeId));

        // Optimistic locking check
        if (request.version() != null && !request.version().equals(record.getVersion())) {
            throw new MetadataConflictException("Optimistic lock conflict: EntityRecord version mismatch (expected: " 
                    + record.getVersion() + ", actual: " + request.version() + ")");
        }

        Map<String, Object> merged = new HashMap<>(record.getAttributes() != null ? record.getAttributes() : Map.of());
        if (request.attributes() != null) {
            merged.putAll(request.attributes());
        }

        schemaValidationService.validatePayload(entityTypeId, merged);

        record.setAttributes(merged);
        record.setSchemaVersion(entityType.getSchemaVersion() != null ? entityType.getSchemaVersion() : 1L);
        EntityRecord saved = entityRecordRepository.save(record);
        return MetadataDtoMapper.toResponse(saved);
    }

    @Transactional
    public void deleteEntityRecord(Long entityTypeId, Long recordId) {
        if (!entityTypeRepository.findByIdAndDeletedDateIsNull(entityTypeId).isPresent()) {
            throw new MetadataNotFoundException("EntityType not found with id: " + entityTypeId);
        }

        EntityRecord record = entityRecordRepository.findByEntityTypeIdAndIdAndDeletedDateIsNull(entityTypeId, recordId)
                .orElseThrow(() -> new MetadataNotFoundException("EntityRecord not found with id: " + recordId + " for entityTypeId: " + entityTypeId));

        record.setDeletedDate(LocalDateTime.now());
        entityRecordRepository.save(record);
    }
}
