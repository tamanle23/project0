package com.project0.presentation.dto.metadata;

import com.project0.domain.metadata.AttributeDefinition;
import com.project0.domain.metadata.EntityRecord;
import com.project0.domain.metadata.EntityType;

public final class MetadataDtoMapper {

    private MetadataDtoMapper() {}

    public static EntityTypeResponse toResponse(EntityType entityType) {
        if (entityType == null) return null;
        return new EntityTypeResponse(
                entityType.getId(),
                entityType.getUid(),
                entityType.getName(),
                entityType.getSystemName(),
                entityType.getDescription(),
                entityType.getSchemaVersion(),
                entityType.getVersion(),
                entityType.getCreatedDate(),
                entityType.getLastUpdatedDate()
        );
    }

    public static EntityType toEntity(CreateEntityTypeRequest request) {
        if (request == null) return null;
        EntityType entityType = new EntityType();
        entityType.setName(request.name().trim());
        entityType.setSystemName(request.systemName().trim());
        entityType.setDescription(request.description() != null ? request.description().trim() : null);
        entityType.setSchemaVersion(1L);
        return entityType;
    }

    public static AttributeDefinitionResponse toResponse(AttributeDefinition attr) {
        if (attr == null) return null;
        return new AttributeDefinitionResponse(
                attr.getId(),
                attr.getUid(),
                attr.getEntityType() != null ? attr.getEntityType().getId() : null,
                attr.getName(),
                attr.getSystemName(),
                attr.getDataType(),
                attr.getUiComponent(),
                attr.getIsRequired(),
                attr.getIsArchived(),
                attr.getDisplayOrder() != null ? attr.getDisplayOrder() : 0,
                attr.getOptions(),
                attr.getDefaultValue(),
                attr.getVersion(),
                attr.getCreatedDate(),
                attr.getLastUpdatedDate()
        );
    }

    public static AttributeDefinition toEntity(CreateAttributeRequest request, EntityType entityType) {
        if (request == null) return null;
        AttributeDefinition attr = new AttributeDefinition();
        attr.setEntityType(entityType);
        attr.setName(request.name().trim());
        attr.setSystemName(request.systemName().trim());
        attr.setDataType(request.dataType().trim().toLowerCase());
        attr.setUiComponent(request.uiComponent().trim().toLowerCase());
        attr.setIsRequired(Boolean.TRUE.equals(request.isRequired()));
        attr.setIsArchived(Boolean.TRUE.equals(request.isArchived()));
        attr.setDisplayOrder(0);
        attr.setOptions(request.options());
        attr.setDefaultValue(request.defaultValue());
        return attr;
    }

    public static EntityRecordResponse toResponse(EntityRecord record) {
        if (record == null) return null;
        return new EntityRecordResponse(
                record.getId(),
                record.getUid(),
                record.getEntityType() != null ? record.getEntityType().getId() : null,
                record.getTenantId(),
                record.getSchemaVersion() != null ? record.getSchemaVersion() : 1L,
                record.getAttributes(),
                record.getVersion(),
                record.getCreatedDate(),
                record.getLastUpdatedDate()
        );
    }

    public static EntityRecord toEntity(CreateRecordRequest request, EntityType entityType) {
        if (request == null) return null;
        EntityRecord record = new EntityRecord();
        record.setEntityType(entityType);
        record.setTenantId(request.tenantId());
        record.setSchemaVersion(entityType.getSchemaVersion() != null ? entityType.getSchemaVersion() : 1L);
        record.setAttributes(request.attributes());
        return record;
    }
}
