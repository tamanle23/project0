package com.project0.service;

import com.project0.domain.metadata.AttributeDefinitionUpdatedEvent;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.redis.core.RedisTemplate;

import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
class MetadataCacheListenerTest {

    @Mock
    private RedisTemplate<String, String> redisTemplate;

    @Mock
    private SchemaValidationService schemaValidationService;

    @InjectMocks
    private MetadataCacheListener metadataCacheListener;

    @Test
    void testHandleAttributeDefinitionUpdate_ClearsCache() {
        Long entityTypeId = 1L;
        AttributeDefinitionUpdatedEvent event = new AttributeDefinitionUpdatedEvent(this, entityTypeId);

        metadataCacheListener.handleAttributeDefinitionUpdate(event);

        verify(schemaValidationService).invalidateL1Cache(1L);
        verify(redisTemplate).delete("schema:1");
    }
}
