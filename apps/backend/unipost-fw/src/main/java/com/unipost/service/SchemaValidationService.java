package com.unipost.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.networknt.schema.JsonSchema;
import com.networknt.schema.JsonSchemaFactory;
import com.networknt.schema.SpecVersion;
import com.networknt.schema.ValidationMessage;
import com.hazelcast.core.HazelcastInstance;
import com.hazelcast.map.IMap;
import com.unipost.boot.config.HazelcastConfiguration;
import com.unipost.core.io.Error;
import com.unipost.domain.metadata.AttributeDefinition;
import com.unipost.domain.metadata.EntityType;
import com.unipost.repository.jpa.AttributeDefinitionRepository;
import com.unipost.repository.jpa.EntityTypeRepository;
import com.unipost.service.exception.MetadataNotFoundException;
import com.unipost.service.exception.SchemaValidationException;
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

        // Fast path: L1 parsed schema cache hit
        JsonSchema l1Schema = l1ParsedSchemaCache.get(cacheKey);
        if (l1Schema != null) {
            return l1Schema;
        }

        // Lock-free atomic L1 computeIfAbsent prevents cache stampede / thundering herd
        // across multiple concurrent request threads on the same JVM
        return l1ParsedSchemaCache.computeIfAbsent(cacheKey, key -> {
            // 1. Check L2 Hazelcast distributed cache
            String schemaJson = null;
            try {
                IMap<String, String> schemaMap = getHazelcastSchemaMap();
                if (schemaMap != null) {
                    schemaJson = schemaMap.get(key);
                }
            } catch (Exception e) {
                log.warn("Hazelcast L2 cache read failed for {}: {}", key, e.getMessage());
            }

            // 2. Distributed double-check / compile on cache miss
            if (schemaJson == null) {
                log.debug("L1/L2 schema cache miss for {}. Compiling from DB rules...", key);
                schemaJson = compileSchema(entityTypeId);
                try {
                    IMap<String, String> schemaMap = getHazelcastSchemaMap();
                    if (schemaMap != null) {
                        // putIfAbsent prevents concurrent cluster nodes from overwriting compiled schema
                        schemaMap.putIfAbsent(key, schemaJson, 1, TimeUnit.HOURS);
                    }
                } catch (Exception e) {
                    log.warn("Hazelcast L2 cache write failed for {}: {}", key, e.getMessage());
                }
            }

            // 3. Parse and compile into immutable JsonSchema instance
            try {
                JsonNode schemaNode = objectMapper.readTree(schemaJson);
                return schemaFactory.getSchema(schemaNode);
            } catch (Exception e) {
                log.error("Failed to parse compiled schema JSON into JsonSchema for entityTypeId {}", entityTypeId, e);
                throw new IllegalStateException("Failed to parse JSON schema: " + e.getMessage(), e);
            }
        });
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
