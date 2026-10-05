package com.project0.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.networknt.schema.JsonSchema;
import com.networknt.schema.JsonSchemaFactory;
import com.networknt.schema.SpecVersion;
import com.networknt.schema.ValidationMessage;
import com.project0.domain.metadata.AttributeDefinition;
import com.project0.repository.jpa.AttributeDefinitionRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class SchemaValidationService {

    private final RedisTemplate<String, String> redisTemplate;
    private final ObjectMapper objectMapper;
    private final AttributeDefinitionRepository attributeDefinitionRepository;
    private final JsonSchemaFactory schemaFactory = JsonSchemaFactory.getInstance(SpecVersion.VersionFlag.V7);

    public void validatePayload(Long entityTypeId, Map<String, Object> payload) {
        String cacheKey = "schema:" + entityTypeId;
        String schemaJson = redisTemplate.opsForValue().get(cacheKey);

        if (schemaJson == null) {
            schemaJson = compileSchema(entityTypeId);
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
        } catch (IllegalArgumentException e) {
            throw e;
        } catch (Exception e) {
            log.error("Error validating payload against schema", e);
            throw new RuntimeException("Validation error", e);
        }
    }

    private String compileSchema(Long entityTypeId) {
        List<AttributeDefinition> attributes = attributeDefinitionRepository.findByEntityTypeId(entityTypeId);
        ObjectNode root = objectMapper.createObjectNode();
        root.put("$schema", "http://json-schema.org/draft-07/schema#");
        root.put("type", "object");

        ObjectNode properties = objectMapper.createObjectNode();

        for (AttributeDefinition attr : attributes) {
            ObjectNode prop = objectMapper.createObjectNode();

            // Map simple data types (expand as needed)
            if ("text".equals(attr.getUiComponent()) || "textarea".equals(attr.getUiComponent())) {
                 prop.put("type", "string");
            } else if ("number".equals(attr.getUiComponent())) {
                 prop.put("type", "number");
            } else {
                 prop.put("type", "string"); // Default fallback
            }

            properties.set(attr.getSystemName(), prop);
        }

        root.set("properties", properties);

        // Handle required fields
        List<String> requiredFields = attributes.stream()
                .filter(attr -> Boolean.TRUE.equals(attr.getIsRequired()))
                .map(AttributeDefinition::getSystemName)
                .collect(Collectors.toList());

        if (!requiredFields.isEmpty()) {
            root.set("required", objectMapper.valueToTree(requiredFields));
        }

        try {
            return objectMapper.writeValueAsString(root);
        } catch (Exception e) {
            throw new RuntimeException("Failed to compile JSON schema", e);
        }
    }
}
