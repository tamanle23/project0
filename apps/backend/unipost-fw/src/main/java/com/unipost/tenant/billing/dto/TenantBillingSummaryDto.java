package com.unipost.tenant.billing.dto;

import java.time.LocalDateTime;
import java.util.Set;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class TenantBillingSummaryDto {
    private String tenantId;
    private String planTier;
    private String billingCadence;
    private String status;
    private Long amountPaid;
    private LocalDateTime expiresAt;
    private Set<String> entitledFeatures;
}
