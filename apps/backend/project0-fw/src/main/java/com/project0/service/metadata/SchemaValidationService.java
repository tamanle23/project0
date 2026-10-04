package com.project0.service.metadata;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class SchemaValidationService {

    private final RedisTemplate<String, String> redisTemplate;
    private final ObjectMapper objectMapper;

    private static final String SCHEMA_KEY_PREFIX = "schema:";

    /**
     * Compiles and fetches the schema validation rules for a given entity type ID.
     * Facade method caching the compiled rule.
     */
    public String getCompiledSchema(Long entityTypeId) {
        String key = SCHEMA_KEY_PREFIX + entityTypeId;
        String cachedSchema = redisTemplate.opsForValue().get(key);

        if (cachedSchema != null) {
            log.debug("Schema cache hit for entityTypeId: {}", entityTypeId);
            return cachedSchema;
        }

        log.debug("Schema cache miss for entityTypeId: {}. Recompiling...", entityTypeId);
        // Fallback: This is where we would fetch from DB, build a JSON Schema (e.g. Draft 7) string.
        // For demonstration of the architectural pattern, we mock compilation.
        String compiledSchema = "{}";

        redisTemplate.opsForValue().set(key, compiledSchema);
        return compiledSchema;
    }

    /**
     * Invalidates the schema cache for a given entity type ID.
     */
    public void invalidateSchemaCache(Long entityTypeId) {
        String key = SCHEMA_KEY_PREFIX + entityTypeId;
        redisTemplate.delete(key);
        log.info("Invalidated schema cache for entityTypeId: {}", entityTypeId);
    }
}
