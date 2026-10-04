package com.project0.service.metadata.listener;

import com.project0.domain.metadata.event.AttributeDefinitionUpdatedEvent;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;
import org.springframework.core.ResolvableType;

@Component
public class MetadataCacheListener {

    private final RedisTemplate<String, Object> redisTemplate;

    public MetadataCacheListener(RedisTemplate<String, Object> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    @Async
    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    public void handleAttributeDefinitionUpdated(AttributeDefinitionUpdatedEvent event) {
        String cacheKey = "schema:" + event.getEntityTypeId();
        redisTemplate.delete(cacheKey);
    }
}
