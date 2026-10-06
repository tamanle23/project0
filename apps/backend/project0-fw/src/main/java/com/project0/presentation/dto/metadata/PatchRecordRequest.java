package com.project0.presentation.dto.metadata;

import jakarta.validation.constraints.NotNull;
import java.util.Map;

public record PatchRecordRequest(
        @NotNull(message = "attributes map is required")
        Map<String, Object> attributes,

        Long version
) {}
