package com.project0.domain.metadata.event;

import lombok.Getter;

@Getter
public class AttributeDefinitionUpdatedEvent {

    private final Long entityTypeId;

    public AttributeDefinitionUpdatedEvent(Long entityTypeId) {
        this.entityTypeId = entityTypeId;
    }
}
