package com.unipost.presentation.dto.metadata;

import com.fasterxml.jackson.databind.JsonNode;

public record CompiledSchemaResponse(
        Long entityTypeId,
        Long schemaVersion,
        JsonNode schema
) {}
