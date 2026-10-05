package com.project0.presentation;

import com.project0.domain.metadata.EntityType;
import com.project0.domain.metadata.AttributeDefinition;
import com.project0.domain.metadata.EntityRecord;
import com.project0.service.MetadataService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/metadata")
@RequiredArgsConstructor
public class MetadataController {

    private final MetadataService metadataService;

    @GetMapping("/entity-types")
    public ResponseEntity<List<EntityType>> getEntityTypes() {
        return ResponseEntity.ok(metadataService.getEntityTypes());
    }

    @PostMapping("/entity-types")
    public ResponseEntity<EntityType> createEntityType(@RequestBody EntityType entityType) {
        return ResponseEntity.ok(metadataService.createEntityType(entityType));
    }

    @GetMapping("/entity-types/{id}/attributes")
    public ResponseEntity<List<AttributeDefinition>> getAttributeDefinitions(@PathVariable Long id) {
        return ResponseEntity.ok(metadataService.getAttributeDefinitions(id));
    }

    @PostMapping("/entity-types/{id}/attributes")
    public ResponseEntity<AttributeDefinition> createAttributeDefinition(@PathVariable Long id, @RequestBody AttributeDefinition attributeDefinition) {
        return ResponseEntity.ok(metadataService.createAttributeDefinition(id, attributeDefinition));
    }

    @GetMapping("/entity-types/{id}/records")
    public ResponseEntity<List<EntityRecord>> getEntityRecords(@PathVariable Long id) {
        return ResponseEntity.ok(metadataService.getEntityRecords(id));
    }

    @PostMapping("/entity-types/{id}/records")
    public ResponseEntity<EntityRecord> createEntityRecord(@PathVariable Long id, @RequestBody EntityRecord record) {
        return ResponseEntity.ok(metadataService.createEntityRecord(id, record));
    }
}
