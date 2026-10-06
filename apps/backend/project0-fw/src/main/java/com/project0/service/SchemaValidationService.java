package com.project0.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.networknt.schema.JsonSchema;
import com.networknt.schema.JsonSchemaFactory;
import com.networknt.schema.SpecVersion;
import com.networknt.schema.ValidationMessage;
import com.hazelcast.core.HazelcastInstance;
import com.hazelcast.map.IMap;
import com.project0.boot.config.HazelcastConfiguration;
import com.project0.core.io.Error;
import com.project0.domain.metadata.AttributeDefinition;
import com.project0.domain.metadata.EntityType;
import com.project0.repository.jpa.AttributeDefinitionRepository;
import com.project0.repository.jpa.EntityTypeRepository;
import com.project0.service.exception.MetadataNotFoundException;
import com.project0.service.exception.SchemaValidationException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class SchemaValidationService {

    private final HazelcastInstance hazelcastInstance;
    private final ObjectMapper objectMapper;
    private final AttributeDefinitionRepository attributeDefinitionRepository;
    private final EntityTypeRepository entityTypeRepository;
    private final SchemaCompiler schemaCompiler;
    private final JsonSchemaFactory schemaFactory = JsonSchemaFactory.getInstance(SpecVersion.VersionFlag.V7);

    // L1 in-memory cache holding parsed JsonSchema objects for maximum throughput
    private final Map<String, JsonSchema> l1ParsedSchemaCache = new ConcurrentHashMap<>();

    private IMap<String, String> getHazelcastSchemaMap() {
        if (hazelcastInstance != null) {
            return hazelcastInstance.getMap(HazelcastConfiguration.METADATA_SCHEMAS_MAP);
        }
        return null;
    }

    private String buildCacheKey(Long entityTypeId, Long schemaVersion) {
        long version = schemaVersion != null ? schemaVersion : 1L;
        return "schema:" + entityTypeId + ":v" + version;
    }

    public void invalidateL1Cache(Long entityTypeId) {
        if (entityTypeId == null) {
            l1ParsedSchemaCache.clear();
            return;
        }
        String prefix = "schema:" + entityTypeId + ":";
        l1ParsedSchemaCache.keySet().removeIf(k -> k.startsWith(prefix));
    }

    public JsonSchema getOrCompileJsonSchema(Long entityTypeId, Long schemaVersion) {
        String cacheKey = buildCacheKey(entityTypeId, schemaVersion);

        // 1. Check L1 in-memory parsed cache
        JsonSchema l1Schema = l1ParsedSchemaCache.get(cacheKey);
        if (l1Schema != null) {
            return l1Schema;
        }

        // 2. Check L2 Hazelcast cache
        String schemaJson = null;
        try {
            IMap<String, String> schemaMap = getHazelcastSchemaMap();
            if (schemaMap != null) {
                schemaJson = schemaMap.get(cacheKey);
            }
        } catch (Exception e) {
            log.warn("Hazelcast L2 cache read failed for {}: {}", cacheKey, e.getMessage());
        }

        // 3. Compile if cache miss
        if (schemaJson == null) {
            schemaJson = compileSchema(entityTypeId);
            try {
                IMap<String, String> schemaMap = getHazelcastSchemaMap();
                if (schemaMap != null) {
                    schemaMap.set(cacheKey, schemaJson, 1, TimeUnit.HOURS);
                }
            } catch (Exception e) {
                log.warn("Hazelcast L2 cache write failed for {}: {}", cacheKey, e.getMessage());
            }
        }

        // 4. Parse & store in L1
        try {
            JsonNode schemaNode = objectMapper.readTree(schemaJson);
            JsonSchema compiledJsonSchema = schemaFactory.getSchema(schemaNode);
            l1ParsedSchemaCache.put(cacheKey, compiledJsonSchema);
            return compiledJsonSchema;
        } catch (Exception e) {
            log.error("Failed to parse compiled schema JSON into JsonSchema for entityTypeId {}", entityTypeId, e);
            throw new RuntimeException("Failed to parse JSON schema: " + e.getMessage(), e);
        }
    }

    public void validatePayload(Long entityTypeId, Map<String, Object> payload) {
        EntityType entityType = entityTypeRepository.findByIdAndDeletedDateIsNull(entityTypeId)
                .orElse(null);
        Long schemaVersion = entityType != null ? entityType.getSchemaVersion() : 1L;

        JsonSchema schema = getOrCompileJsonSchema(entityTypeId, schemaVersion);

        try {
            JsonNode payloadNode = objectMapper.valueToTree(payload != null ? payload : Map.of());
            Set<ValidationMessage> validationResult = schema.validate(payloadNode);

            if (!validationResult.isEmpty()) {
                List<Error> errorList = new ArrayList<>();
                for (ValidationMessage vm : validationResult) {
                    String path = vm.getInstanceLocation() != null ? vm.getInstanceLocation().toString() : vm.getProperty();
                    if (path != null && path.startsWith("$.")) {
                        path = path.substring(2);
                    }
                    errorList.add(Error.builder()
                            .code("VALIDATION_ERROR")
                            .message(vm.getMessage())
                            .detail(path)
                            .build());
                }

                String combinedMsg = validationResult.stream()
                        .map(ValidationMessage::getMessage)
                        .collect(Collectors.joining(", "));

                throw new SchemaValidationException(errorList.isEmpty() 
                        ? List.of(Error.builder().code("VALIDATION_ERROR").message("Payload validation failed: " + combinedMsg).build())
                        : errorList);
            }
        } catch (SchemaValidationException e) {
            throw e;
        } catch (Exception e) {
            log.error("Error validating payload against schema for entityTypeId {}", entityTypeId, e);
            throw new SchemaValidationException("Validation error: " + e.getMessage());
        }
    }

    public String compileSchema(Long entityTypeId) {
        EntityType entityType = entityTypeRepository.findByIdAndDeletedDateIsNull(entityTypeId)
                .orElseThrow(() -> new MetadataNotFoundException("EntityType not found with id: " + entityTypeId));

        List<AttributeDefinition> attributes = attributeDefinitionRepository.findByEntityTypeIdAndDeletedDateIsNull(entityTypeId);
        return schemaCompiler.compile(entityTypeId, entityType.getSchemaVersion(), attributes);
    }

    public JsonNode compileSchemaNode(Long entityTypeId) {
        EntityType entityType = entityTypeRepository.findByIdAndDeletedDateIsNull(entityTypeId)
                .orElseThrow(() -> new MetadataNotFoundException("EntityType not found with id: " + entityTypeId));

        List<AttributeDefinition> attributes = attributeDefinitionRepository.findByEntityTypeIdAndDeletedDateIsNull(entityTypeId);
        return schemaCompiler.compileNode(entityTypeId, entityType.getSchemaVersion(), attributes);
    }
}
