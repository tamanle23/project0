package com.project0.presentation;

import com.project0.core.io.ContextHeader;
import com.project0.core.io.Page;
import com.project0.core.io.PageRequest;
import com.project0.core.io.ResponseWrapper;
import com.project0.fw.ResponseEntityBuilder;
import com.project0.presentation.dto.metadata.*;
import com.project0.service.MetadataService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/metadata")
@RequiredArgsConstructor
public class MetadataController {

    private final MetadataService metadataService;
    private final ResponseEntityBuilder responseBuilder;

    private PageRequest populateDefaults(PageRequest pageRequest) {
        if (pageRequest == null) pageRequest = new PageRequest();
        if (pageRequest.getNumber() == null) pageRequest.setNumber(1);
        if (pageRequest.getSize() <= 0) pageRequest.setSize(10);
        return pageRequest;
    }

    @GetMapping("/entity-types")
    @PreAuthorize("hasAuthority('METADATA_SCHEMA_READ') or hasAuthority('METADATA_SCHEMA_WRITE') or hasRole('ADMIN')")
    public ResponseEntity<ResponseWrapper<ContextHeader, Page<EntityTypeResponse>>> getEntityTypes(@ModelAttribute PageRequest pageRequest) {
        Page<EntityTypeResponse> page = metadataService.getEntityTypes(populateDefaults(pageRequest));
        return responseBuilder.success(page);
    }

    @PostMapping("/entity-types")
    @PreAuthorize("hasAuthority('METADATA_SCHEMA_WRITE') or hasRole('ADMIN')")
    public ResponseEntity<ResponseWrapper<ContextHeader, EntityTypeResponse>> createEntityType(@Valid @RequestBody CreateEntityTypeRequest request) {
        EntityTypeResponse created = metadataService.createEntityType(request);
        return responseBuilder.success(created);
    }

    @GetMapping("/entity-types/{id}/attributes")
    @PreAuthorize("hasAuthority('METADATA_SCHEMA_READ') or hasAuthority('METADATA_SCHEMA_WRITE') or hasRole('ADMIN')")
    public ResponseEntity<ResponseWrapper<ContextHeader, Page<AttributeDefinitionResponse>>> getAttributeDefinitions(
            @PathVariable Long id,
            @ModelAttribute PageRequest pageRequest) {
        Page<AttributeDefinitionResponse> page = metadataService.getAttributeDefinitions(id, populateDefaults(pageRequest));
        return responseBuilder.success(page);
    }

    @PostMapping("/entity-types/{id}/attributes")
    @PreAuthorize("hasAuthority('METADATA_SCHEMA_WRITE') or hasRole('ADMIN')")
    public ResponseEntity<ResponseWrapper<ContextHeader, AttributeDefinitionResponse>> createAttributeDefinition(
            @PathVariable Long id,
            @Valid @RequestBody CreateAttributeRequest request) {
        AttributeDefinitionResponse created = metadataService.createAttributeDefinition(id, request);
        return responseBuilder.success(created);
    }

    @GetMapping("/entity-types/{id}/records")
    @PreAuthorize("hasAuthority('METADATA_RECORD_READ') or hasAuthority('METADATA_RECORD_WRITE') or hasRole('ADMIN')")
    public ResponseEntity<ResponseWrapper<ContextHeader, Page<EntityRecordResponse>>> getEntityRecords(
            @PathVariable Long id,
            @ModelAttribute PageRequest pageRequest) {
        Page<EntityRecordResponse> page = metadataService.getEntityRecords(id, populateDefaults(pageRequest));
        return responseBuilder.success(page);
    }

    @PostMapping("/entity-types/{id}/records")
    @PreAuthorize("hasAuthority('METADATA_RECORD_WRITE') or hasRole('ADMIN')")
    public ResponseEntity<ResponseWrapper<ContextHeader, EntityRecordResponse>> createEntityRecord(
            @PathVariable Long id,
            @Valid @RequestBody CreateRecordRequest request) {
        EntityRecordResponse created = metadataService.createEntityRecord(id, request);
        return responseBuilder.success(created);
    }
}
