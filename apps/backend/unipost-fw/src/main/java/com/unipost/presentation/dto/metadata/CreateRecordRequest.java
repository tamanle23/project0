package com.unipost.presentation.dto.metadata;

import jakarta.validation.constraints.NotNull;
import java.util.Map;

public record CreateRecordRequest(
        @NotNull(message = "attributes map is required")
        Map<String, Object> attributes,

        String tenantId
) {}
