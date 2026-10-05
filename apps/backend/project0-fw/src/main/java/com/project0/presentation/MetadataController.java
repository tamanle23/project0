package com.project0.presentation;

import com.project0.core.io.Page;
import com.project0.core.io.PageRequest;
import com.project0.domain.metadata.EntityType;
import com.project0.domain.metadata.AttributeDefinition;
import com.project0.domain.metadata.EntityRecord;
import com.project0.service.MetadataService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/metadata")
@RequiredArgsConstructor
public class MetadataController {

    private final MetadataService metadataService;

    private PageRequest populateDefaults(PageRequest pageRequest) {
        if (pageRequest == null) pageRequest = new PageRequest();
        if (pageRequest.getNumber() == null) pageRequest.setNumber(1);
        if (pageRequest.getSize() <= 0) pageRequest.setSize(10);
        return pageRequest;
    }

    @GetMapping("/entity-types")
    public ResponseEntity<Page<EntityType>> getEntityTypes(@ModelAttribute PageRequest pageRequest) {
        return ResponseEntity.ok(metadataService.getEntityTypes(populateDefaults(pageRequest)));
    }

    @PostMapping("/entity-types")
    public ResponseEntity<EntityType> createEntityType(@RequestBody EntityType entityType) {
        return ResponseEntity.ok(metadataService.createEntityType(entityType));
    }

    @GetMapping("/entity-types/{id}/attributes")
    public ResponseEntity<Page<AttributeDefinition>> getAttributeDefinitions(@PathVariable Long id, @ModelAttribute PageRequest pageRequest) {
        return ResponseEntity.ok(metadataService.getAttributeDefinitions(id, populateDefaults(pageRequest)));
    }

    @PostMapping("/entity-types/{id}/attributes")
    public ResponseEntity<AttributeDefinition> createAttributeDefinition(@PathVariable Long id, @RequestBody AttributeDefinition attributeDefinition) {
        return ResponseEntity.ok(metadataService.createAttributeDefinition(id, attributeDefinition));
    }

    @GetMapping("/entity-types/{id}/records")
    public ResponseEntity<Page<EntityRecord>> getEntityRecords(@PathVariable Long id, @ModelAttribute PageRequest pageRequest) {
        return ResponseEntity.ok(metadataService.getEntityRecords(id, populateDefaults(pageRequest)));
    }

    @PostMapping("/entity-types/{id}/records")
    public ResponseEntity<EntityRecord> createEntityRecord(@PathVariable Long id, @RequestBody EntityRecord record) {
        return ResponseEntity.ok(metadataService.createEntityRecord(id, record));
    }
}
