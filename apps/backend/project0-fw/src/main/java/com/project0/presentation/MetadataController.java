package com.project0.presentation;

import com.project0.domain.metadata.EntityType;
import com.project0.domain.metadata.AttributeDefinition;
import com.project0.domain.metadata.EntityRecord;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/v1/metadata")
public class MetadataController {

    // These are stubbed methods for the "start implement" phase.
    // They would normally connect to a Spring Data JPA Repository.

    @GetMapping("/entity-types")
    public ResponseEntity<List<EntityType>> getEntityTypes() {
        return ResponseEntity.ok(Collections.emptyList());
    }

    @PostMapping("/entity-types")
    public ResponseEntity<EntityType> createEntityType(@RequestBody EntityType entityType) {
        return ResponseEntity.ok(entityType);
    }

    @GetMapping("/entity-types/{id}/attributes")
    public ResponseEntity<List<AttributeDefinition>> getAttributeDefinitions(@PathVariable Long id) {
        return ResponseEntity.ok(Collections.emptyList());
    }

    @PostMapping("/entity-types/{id}/attributes")
    public ResponseEntity<AttributeDefinition> createAttributeDefinition(@PathVariable Long id, @RequestBody AttributeDefinition attributeDefinition) {
        return ResponseEntity.ok(attributeDefinition);
    }

    @GetMapping("/entity-types/{id}/records")
    public ResponseEntity<List<EntityRecord>> getEntityRecords(@PathVariable Long id) {
        return ResponseEntity.ok(Collections.emptyList());
    }
}
