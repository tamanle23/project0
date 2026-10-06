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
import com.project0.service.exception.SchemaValidationException;
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
        String schemaJson = null;

        try {
            if (redisTemplate != null) {
                schemaJson = redisTemplate.opsForValue().get(cacheKey);
            }
        } catch (Exception e) {
            log.warn("Failed to get schema from Redis cache for entityTypeId {}: {}", entityTypeId, e.getMessage());
        }

        if (schemaJson == null) {
            schemaJson = compileSchema(entityTypeId);
            try {
                if (redisTemplate != null) {
                    redisTemplate.opsForValue().set(cacheKey, schemaJson);
                }
            } catch (Exception e) {
                log.warn("Failed to set schema in Redis cache for entityTypeId {}: {}", entityTypeId, e.getMessage());
            }
        }

        try {
            JsonNode schemaNode = objectMapper.readTree(schemaJson);
            JsonSchema schema = schemaFactory.getSchema(schemaNode);
            JsonNode payloadNode = objectMapper.valueToTree(payload != null ? payload : Map.of());

            Set<ValidationMessage> validationResult = schema.validate(payloadNode);
            if (!validationResult.isEmpty()) {
                String errors = validationResult.stream()
                        .map(ValidationMessage::getMessage)
                        .collect(Collectors.joining(", "));
                throw new SchemaValidationException("Payload validation failed: " + errors);
            }
        } catch (SchemaValidationException e) {
            throw e;
        } catch (Exception e) {
            log.error("Error validating payload against schema", e);
            throw new SchemaValidationException("Validation error: " + e.getMessage());
        }
    }

    public String compileSchema(Long entityTypeId) {
        List<AttributeDefinition> attributes = attributeDefinitionRepository.findByEntityTypeIdAndDeletedDateIsNull(entityTypeId);
        ObjectNode root = objectMapper.createObjectNode();
        root.put("$schema", "http://json-schema.org/draft-07/schema#");
        root.put("type", "object");

        ObjectNode properties = objectMapper.createObjectNode();

        for (AttributeDefinition attr : attributes) {
            if (Boolean.TRUE.equals(attr.getIsArchived())) {
                continue;
            }

            ObjectNode prop = objectMapper.createObjectNode();
            String uiComponent = attr.getUiComponent() != null ? attr.getUiComponent().toLowerCase() : "";
            String dataType = attr.getDataType() != null ? attr.getDataType().toLowerCase() : "";

            if ("switch".equals(uiComponent) || "boolean".equals(dataType)) {
                prop.put("type", "boolean");
            } else if ("number".equals(uiComponent) || "number".equals(dataType) || "integer".equals(dataType)) {
                prop.put("type", "integer".equals(dataType) ? "integer" : "number");
            } else if ("multiselect".equals(uiComponent) || "array".equals(dataType)) {
                prop.put("type", "array");
            } else if ("json_editor".equals(uiComponent) || "json".equals(dataType)) {
                prop.put("type", "object");
            } else {
                prop.put("type", "string");
            }

            properties.set(attr.getSystemName(), prop);
        }

        root.set("properties", properties);

        // Handle required fields (excluding archived)
        List<String> requiredFields = attributes.stream()
                .filter(attr -> Boolean.TRUE.equals(attr.getIsRequired()) && !Boolean.TRUE.equals(attr.getIsArchived()))
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
