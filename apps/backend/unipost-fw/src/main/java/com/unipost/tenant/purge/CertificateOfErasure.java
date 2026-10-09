package com.unipost.tenant.purge;

import java.time.Instant;

/**
 * Immutable audit receipt generated upon completion of a GDPR Article 17 hard-purge.
 * Contains no PII, storing only cryptographic tenant hash and deletion counts.
 */
public record CertificateOfErasure(
        String certificateId,
        String tenantIdHash,
        String purgedAt,
        long recordsDeleted,
        long relationshipsDeleted,
        long attributesDeleted,
        long entityTypesDeleted,
        long relationshipTypesDeleted,
        String status,
        String executedBy
) {}
