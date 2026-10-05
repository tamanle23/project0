package com.project0.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.project0.domain.metadata.AttributeDefinition;
import com.project0.repository.jpa.AttributeDefinitionRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Spy;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class SchemaValidationServiceTest {

    @Mock
    private RedisTemplate<String, String> redisTemplate;

    @Mock
    private ValueOperations<String, String> valueOperations;

    @Mock
    private AttributeDefinitionRepository attributeDefinitionRepository;

    @Spy
    private ObjectMapper objectMapper = new ObjectMapper();

    @InjectMocks
    private SchemaValidationService schemaValidationService;

    @BeforeEach
    void setUp() {
        when(redisTemplate.opsForValue()).thenReturn(valueOperations);
    }

    @Test
    void testValidatePayload_CacheHit_Success() throws Exception {
        Long entityTypeId = 1L;
        Map<String, Object> payload = new HashMap<>();
        payload.put("name", "Test Entity");

        // Schema requires "name" of type string
        String cachedSchema = "{\"$schema\": \"http://json-schema.org/draft-07/schema#\", \"type\": \"object\", \"properties\": {\"name\": {\"type\": \"string\"}}, \"required\": [\"name\"]}";

        when(valueOperations.get("schema:1")).thenReturn(cachedSchema);

        assertDoesNotThrow(() -> schemaValidationService.validatePayload(entityTypeId, payload));
    }

    @Test
    void testValidatePayload_CacheMiss_CompilesAndSaves() throws Exception {
        Long entityTypeId = 1L;
        Map<String, Object> payload = new HashMap<>();

        AttributeDefinition attr = new AttributeDefinition();
        attr.setSystemName("age");
        attr.setUiComponent("number");
        attr.setIsRequired(false);

        when(valueOperations.get("schema:1")).thenReturn(null);
        when(attributeDefinitionRepository.findByEntityTypeId(entityTypeId)).thenReturn(Collections.singletonList(attr));

        assertDoesNotThrow(() -> schemaValidationService.validatePayload(entityTypeId, payload));

        verify(valueOperations).set(eq("schema:1"), anyString());
    }

    @Test
    void testValidatePayload_ValidationFails() {
        Long entityTypeId = 1L;
        Map<String, Object> payload = new HashMap<>();
        // Missing the required "name" field

        String cachedSchema = "{\"$schema\": \"http://json-schema.org/draft-07/schema#\", \"type\": \"object\", \"properties\": {\"name\": {\"type\": \"string\"}}, \"required\": [\"name\"]}";
        when(valueOperations.get("schema:1")).thenReturn(cachedSchema);

        IllegalArgumentException ex = assertThrows(IllegalArgumentException.class,
            () -> schemaValidationService.validatePayload(entityTypeId, payload));

        assertTrue(ex.getMessage().contains("Payload validation failed"));
    }
}
