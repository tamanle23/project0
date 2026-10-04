package com.project0.service;

import com.project0.domain.metadata.AttributeDefinitionUpdatedEvent;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

@Slf4j
@Component
@RequiredArgsConstructor
public class MetadataCacheListener {

    private final RedisTemplate<String, String> redisTemplate;

    @Async
    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    public void handleAttributeDefinitionUpdate(AttributeDefinitionUpdatedEvent event) {
        String cacheKey = "schema:" + event.getEntityTypeId();
        log.info("Invalidating schema cache for entity type: {}", event.getEntityTypeId());
        redisTemplate.delete(cacheKey);
    }
}
