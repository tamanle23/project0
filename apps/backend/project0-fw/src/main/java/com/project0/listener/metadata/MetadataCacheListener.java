package com.project0.listener.metadata;

import com.project0.event.metadata.AttributeDefinitionUpdatedEvent;
import com.project0.service.metadata.SchemaValidationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

@Component
@RequiredArgsConstructor
@Slf4j
public class MetadataCacheListener {

    private final SchemaValidationService schemaValidationService;

    @Async
    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    public void handleAttributeDefinitionUpdatedEvent(AttributeDefinitionUpdatedEvent event) {
        log.info("Handling AttributeDefinitionUpdatedEvent for entityTypeId: {}", event.getEntityTypeId());
        schemaValidationService.invalidateSchemaCache(event.getEntityTypeId());
    }
}
