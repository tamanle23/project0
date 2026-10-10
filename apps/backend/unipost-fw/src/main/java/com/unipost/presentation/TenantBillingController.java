package com.unipost.presentation;

import com.unipost.core.io.ContextHeader;
import com.unipost.core.io.ResponseWrapper;
import com.unipost.fw.ResponseEntityBuilder;
import com.unipost.fw.tenancy.TenantContextHolder;
import com.unipost.tenant.billing.PayOsBillingService;
import com.unipost.tenant.billing.dto.CheckoutResponseDto;
import com.unipost.tenant.billing.dto.CreatePaymentLinkRequest;
import com.unipost.tenant.billing.dto.PayOsWebhookPayload;
import com.unipost.tenant.billing.dto.TenantBillingSummaryDto;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/v1/billing")
@RequiredArgsConstructor
public class TenantBillingController {

    private final PayOsBillingService billingService;
    private final ResponseEntityBuilder responseBuilder;

    /**
     * Get active tenant's current plan, subscription status, and entitled feature tokens.
     */
    @GetMapping("/summary")
    @PreAuthorize("hasAuthority('METADATA_SCHEMA_READ') or hasAuthority('METADATA_SCHEMA_WRITE') or hasRole('ADMIN')")
    public ResponseEntity<ResponseWrapper<ContextHeader, TenantBillingSummaryDto>> getBillingSummary() {
        String tenantId = TenantContextHolder.getRequiredTenantId();
        TenantBillingSummaryDto summary = billingService.getTenantBillingSummary(tenantId);
        return responseBuilder.success(summary);
    }

    /**
     * Create a payOS payment link and dynamic VietQR code for upgrading/renewing subscription.
     */
    @PostMapping("/checkout")
    @PreAuthorize("hasAuthority('METADATA_SCHEMA_WRITE') or hasRole('ADMIN')")
    public ResponseEntity<ResponseWrapper<ContextHeader, CheckoutResponseDto>> createCheckout(
            @Valid @RequestBody CreatePaymentLinkRequest request) {
        CheckoutResponseDto checkout = billingService.createPaymentLink(request);
        return responseBuilder.success(checkout);
    }

    /**
     * Public Webhook endpoint called by payOS gateway upon QR transfer confirmation.
     * Validates cryptographic HMAC signature and unlocks dynamic feature entitlements.
     */
    @PostMapping("/payos/webhook")
    public ResponseEntity<?> handlePayOsWebhook(@RequestBody PayOsWebhookPayload webhookBody) {
        log.info("Received incoming payOS payment webhook for order: {}",
                webhookBody.getData() != null ? webhookBody.getData().getOrderCode() : "N/A");

        boolean success = billingService.verifyAndProcessWebhook(webhookBody);
        if (!success) {
            return ResponseEntity.badRequest().body("{\"status\":\"error\",\"message\":\"Invalid signature or rejected webhook\"}");
        }

        return ResponseEntity.ok("{\"status\":\"success\"}");
    }
}
