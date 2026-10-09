package com.unipost.tenant.export;

import java.time.Instant;
import java.util.Map;

/**
 * Manifest metadata describing the contents and schema versions of an exported tenant bundle.
 */
public record TenantExportManifest(
        String version,
        String tenantId,
        String exportedAt,
        String format,
        ExportSummary summary
) {
    public record ExportSummary(
            int entityTypesCount,
            int attributeDefinitionsCount,
            int relationshipTypesCount,
            long recordsCount,
            long relationshipsCount
    ) {}

    public static TenantExportManifest of(String tenantId, ExportSummary summary) {
        return new TenantExportManifest(
                "1.0.0",
                tenantId,
                Instant.now().toString(),
                "ZIP_NDJSON_BUNDLE",
                summary
        );
    }
}
