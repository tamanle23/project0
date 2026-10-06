package com.project0.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.project0.domain.metadata.AttributeDefinition;
import com.project0.domain.metadata.EntityType;
import com.project0.repository.jpa.AttributeDefinitionRepository;
import com.project0.repository.jpa.EntityTypeRepository;
import com.project0.service.exception.SchemaValidationException;
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
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class SchemaValidationServiceTest {

    @Mock
    private RedisTemplate<String, String> redisTemplate;

    @Mock
    private ValueOperations<String, String> valueOperations;

    @Mock
    private AttributeDefinitionRepository attributeDefinitionRepository;

    @Mock
    private EntityTypeRepository entityTypeRepository;

    @Spy
    private ObjectMapper objectMapper = new ObjectMapper();

    @Spy
    private SchemaCompiler schemaCompiler = new SchemaCompiler(new ObjectMapper());

    @InjectMocks
    private SchemaValidationService schemaValidationService;

    private EntityType entityType;

    @BeforeEach
    void setUp() {
        entityType = new EntityType();
        entityType.setId(1L);
        entityType.setSchemaVersion(1L);

        lenient().when(redisTemplate.opsForValue()).thenReturn(valueOperations);
        lenient().when(entityTypeRepository.findByIdAndDeletedDateIsNull(1L)).thenReturn(Optional.of(entityType));
    }

    @Test
    void testValidatePayload_CacheHit_Success() {
        Long entityTypeId = 1L;
        Map<String, Object> payload = new HashMap<>();
        payload.put("name", "Test Entity");

        String cachedSchema = "{\"$schema\": \"http://json-schema.org/draft-07/schema#\", \"type\": \"object\", \"properties\": {\"name\": {\"type\": \"string\"}}, \"required\": [\"name\"]}";

        when(valueOperations.get("schema:1:v1")).thenReturn(cachedSchema);

        assertDoesNotThrow(() -> schemaValidationService.validatePayload(entityTypeId, payload));
    }

    @Test
    void testValidatePayload_CacheMiss_CompilesAndSaves() {
        Long entityTypeId = 1L;
        Map<String, Object> payload = new HashMap<>();

        AttributeDefinition attr = new AttributeDefinition();
        attr.setSystemName("age");
        attr.setUiComponent("number");
        attr.setDataType("integer");
        attr.setIsRequired(false);

        when(valueOperations.get("schema:1:v1")).thenReturn(null);
        when(attributeDefinitionRepository.findByEntityTypeIdAndDeletedDateIsNull(entityTypeId)).thenReturn(Collections.singletonList(attr));

        assertDoesNotThrow(() -> schemaValidationService.validatePayload(entityTypeId, payload));

        verify(valueOperations).set(eq("schema:1:v1"), anyString(), eq(1L), eq(TimeUnit.HOURS));
    }

    @Test
    void testValidatePayload_ValidationFails_StructuredErrors() {
        Long entityTypeId = 1L;
        Map<String, Object> payload = new HashMap<>();

        String cachedSchema = "{\"$schema\": \"http://json-schema.org/draft-07/schema#\", \"type\": \"object\", \"properties\": {\"name\": {\"type\": \"string\"}}, \"required\": [\"name\"]}";
        when(valueOperations.get("schema:1:v1")).thenReturn(cachedSchema);

        SchemaValidationException ex = assertThrows(SchemaValidationException.class,
                () -> schemaValidationService.validatePayload(entityTypeId, payload));

        assertFalse(ex.getErrors().isEmpty());
        assertTrue(ex.getErrors().get(0).getMessage().contains("name"));
    }

    @Test
    void testValidatePayload_SupportsBooleanSwitch() {
        Long entityTypeId = 1L;
        AttributeDefinition attr = new AttributeDefinition();
        attr.setSystemName("isActive");
        attr.setUiComponent("switch");
        attr.setIsRequired(true);

        when(valueOperations.get("schema:1:v1")).thenReturn(null);
        when(attributeDefinitionRepository.findByEntityTypeIdAndDeletedDateIsNull(entityTypeId)).thenReturn(Collections.singletonList(attr));

        Map<String, Object> payload = Map.of("isActive", true);
        assertDoesNotThrow(() -> schemaValidationService.validatePayload(entityTypeId, payload));
    }

    @Test
    void testValidatePayload_RejectsAdditionalProperties() {
        Long entityTypeId = 1L;
        AttributeDefinition attr = new AttributeDefinition();
        attr.setSystemName("name");
        attr.setUiComponent("text");
        attr.setDataType("string");
        attr.setIsRequired(false);

        when(valueOperations.get("schema:1:v1")).thenReturn(null);
        when(attributeDefinitionRepository.findByEntityTypeIdAndDeletedDateIsNull(entityTypeId)).thenReturn(Collections.singletonList(attr));

        Map<String, Object> payload = Map.of("name", "Valid", "unknownField", "Should Fail");
        assertThrows(SchemaValidationException.class, () -> schemaValidationService.validatePayload(entityTypeId, payload));
    }

    @Test
    void testCompileSchemaNode_Success() {
        Long entityTypeId = 1L;
        AttributeDefinition attr = new AttributeDefinition();
        attr.setSystemName("code");
        attr.setUiComponent("text");
        attr.setDataType("string");

        when(attributeDefinitionRepository.findByEntityTypeIdAndDeletedDateIsNull(entityTypeId)).thenReturn(List.of(attr));

        JsonNode schemaNode = schemaValidationService.compileSchemaNode(entityTypeId);
        assertNotNull(schemaNode);
        assertEquals("object", schemaNode.get("type").asText());
        assertNotNull(schemaNode.get("properties").get("code"));
    }
}
