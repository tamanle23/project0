package com.unipost.domain.metadata;

import lombok.Getter;
import org.springframework.context.ApplicationEvent;

@Getter
public class AttributeDefinitionUpdatedEvent extends ApplicationEvent {

    private final Long entityTypeId;

    public AttributeDefinitionUpdatedEvent(Object source, Long entityTypeId) {
        super(source);
        this.entityTypeId = entityTypeId;
    }
}
