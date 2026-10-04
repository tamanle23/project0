package com.project0.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.networknt.schema.JsonSchema;
import com.networknt.schema.JsonSchemaFactory;
import com.networknt.schema.SpecVersion;
import com.networknt.schema.ValidationMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class SchemaValidationService {

    private final RedisTemplate<String, String> redisTemplate;
    private final ObjectMapper objectMapper;
    private final JsonSchemaFactory schemaFactory = JsonSchemaFactory.getInstance(SpecVersion.VersionFlag.V7);

    public void validatePayload(Long entityTypeId, Map<String, Object> payload) {
        String cacheKey = "schema:" + entityTypeId;
        String schemaJson = redisTemplate.opsForValue().get(cacheKey);

        if (schemaJson == null) {
            // Ideally, we would fetch from DB and compile here. For now, we simulate a compiled schema.
            // In a real application, query AttributeDefinitions and construct a JSON schema.
            schemaJson = "{\"$schema\": \"http://json-schema.org/draft-07/schema#\", \"type\": \"object\"}";
            redisTemplate.opsForValue().set(cacheKey, schemaJson);
        }

        try {
            JsonNode schemaNode = objectMapper.readTree(schemaJson);
            JsonSchema schema = schemaFactory.getSchema(schemaNode);
            JsonNode payloadNode = objectMapper.valueToTree(payload);

            Set<ValidationMessage> validationResult = schema.validate(payloadNode);
            if (!validationResult.isEmpty()) {
                String errors = validationResult.stream()
                        .map(ValidationMessage::getMessage)
                        .collect(Collectors.joining(", "));
                throw new IllegalArgumentException("Payload validation failed: " + errors);
            }
        } catch (Exception e) {
            log.error("Error validating payload against schema", e);
            throw new RuntimeException("Validation error", e);
        }
    }
}
