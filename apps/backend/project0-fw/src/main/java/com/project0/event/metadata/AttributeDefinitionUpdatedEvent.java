package com.project0.event.metadata;

import org.springframework.context.ApplicationEvent;

public class AttributeDefinitionUpdatedEvent extends ApplicationEvent {

    private final Long entityTypeId;

    public AttributeDefinitionUpdatedEvent(Object source, Long entityTypeId) {
        super(source);
        this.entityTypeId = entityTypeId;
    }

    public Long getEntityTypeId() {
        return entityTypeId;
    }
}
