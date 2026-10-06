package com.project0.service;

import com.project0.domain.metadata.AttributeDefinitionUpdatedEvent;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

import java.util.Set;

@Slf4j
@Component
@RequiredArgsConstructor
public class MetadataCacheListener {

    private final RedisTemplate<String, String> redisTemplate;
    private final SchemaValidationService schemaValidationService;

    @Async
    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    public void handleAttributeDefinitionUpdate(AttributeDefinitionUpdatedEvent event) {
        Long entityTypeId = event.getEntityTypeId();
        log.info("Invalidating schema cache for entity type: {}", entityTypeId);

        // 1. Evict in-memory L1 cache
        schemaValidationService.invalidateL1Cache(entityTypeId);

        // 2. Evict distributed L2 Redis cache keys
        try {
            if (redisTemplate != null) {
                // Delete base key if present
                redisTemplate.delete("schema:" + entityTypeId);

                // Evict versioned keys schema:{id}:*
                Set<String> keys = redisTemplate.keys("schema:" + entityTypeId + ":*");
                if (keys != null && !keys.isEmpty()) {
                    redisTemplate.delete(keys);
                }
            }
        } catch (Exception e) {
            log.warn("Failed to evict Redis cache for entityTypeId {}: {}", entityTypeId, e.getMessage());
        }
    }
}

