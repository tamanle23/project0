package com.unipost.presentation.dto.metadata;

import java.time.LocalDateTime;

public record EntityTypeResponse(
        Long id,
        String uid,
        String name,
        String systemName,
        String description,
        Long schemaVersion,
        Long version,
        LocalDateTime createdDate,
        LocalDateTime lastUpdatedDate
) {}
