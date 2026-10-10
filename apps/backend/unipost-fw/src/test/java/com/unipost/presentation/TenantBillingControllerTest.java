package com.unipost.presentation;

import com.unipost.core.context.Context;
import com.unipost.core.io.ContextHeader;
import com.unipost.core.io.ResponseWrapper;
import com.unipost.fw.ResponseEntityBuilder;
import com.unipost.fw.tenancy.TenantContextHolder;
import com.unipost.tenant.billing.PayOsBillingService;
import com.unipost.tenant.billing.dto.CheckoutResponseDto;
import com.unipost.tenant.billing.dto.CreatePaymentLinkRequest;
import com.unipost.tenant.billing.dto.PayOsWebhookPayload;
import com.unipost.tenant.billing.dto.TenantBillingSummaryDto;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.util.ReflectionTestUtils;

import java.time.LocalDateTime;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class TenantBillingControllerTest {

    @Mock
    private PayOsBillingService billingService;

    @Mock
    private Context contextHelper;

    private ResponseEntityBuilder responseBuilder;
    private TenantBillingController controller;

    private static final String TENANT_ID = "tenant-billing-corp";

    @BeforeEach
    void setUp() {
        responseBuilder = new ResponseEntityBuilder();
        ReflectionTestUtils.setField(responseBuilder, "contextHelper", contextHelper);
        controller = new TenantBillingController(billingService, responseBuilder);

        TenantContextHolder.setTenantId(TENANT_ID);
    }

    @AfterEach
    void tearDown() {
        TenantContextHolder.clear();
    }

    @Test
    void testGetBillingSummary_ReturnsActiveTenantEntitlements() {
        TenantBillingSummaryDto mockSummary = TenantBillingSummaryDto.builder()
                .tenantId(TENANT_ID)
                .planTier("PRO")
                .billingCadence("MONTHLY")
                .status("ACTIVE")
                .amountPaid(199000L)
                .expiresAt(LocalDateTime.now().plusDays(30))
                .entitledFeatures(Set.of("FEATURE_SCHEMA_STUDIO", "FEATURE_PATTERN_C_GRAPH"))
                .build();

        when(billingService.getTenantBillingSummary(TENANT_ID)).thenReturn(mockSummary);

        ResponseEntity<ResponseWrapper<ContextHeader, TenantBillingSummaryDto>> response = controller.getBillingSummary();

        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals("PRO", response.getBody().getBody().getPlanTier());
        assertTrue(response.getBody().getBody().getEntitledFeatures().contains("FEATURE_PATTERN_C_GRAPH"));
        verify(billingService).getTenantBillingSummary(TENANT_ID);
    }

    @Test
    void testCreateCheckout_ReturnsVietQrPaymentPayload() {
        CreatePaymentLinkRequest request = new CreatePaymentLinkRequest();
        request.setPlanTier("PRO_MAX");
        request.setCadence("YEARLY");

        CheckoutResponseDto mockCheckout = CheckoutResponseDto.builder()
                .orderCode(1728567890000L)
                .amount(4990000L)
                .description("UNIPOST PRO_MAX YEARLY")
                .checkoutUrl("https://pay.payos.vn/web/1728567890000")
                .qrCode("00020101021238540010A00000072701240006970422011003456789100208QRIBFTTA52044990000")
                .status("PENDING")
                .build();

        when(billingService.createPaymentLink(request)).thenReturn(mockCheckout);

        ResponseEntity<ResponseWrapper<ContextHeader, CheckoutResponseDto>> response = controller.createCheckout(request);

        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(4990000L, response.getBody().getBody().getAmount());
        assertEquals(1728567890000L, response.getBody().getBody().getOrderCode());
        verify(billingService).createPaymentLink(request);
    }

    @Test
    void testHandlePayOsWebhook_SuccessReturns200() {
        PayOsWebhookPayload payload = new PayOsWebhookPayload();
        payload.setCode("00");
        payload.setSignature("test_valid_signature");

        when(billingService.verifyAndProcessWebhook(payload)).thenReturn(true);

        ResponseEntity<?> response = controller.handlePayOsWebhook(payload);

        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("{\"status\":\"success\"}", response.getBody());
    }

    @Test
    void testHandlePayOsWebhook_RejectedSignatureReturns400() {
        PayOsWebhookPayload payload = new PayOsWebhookPayload();
        payload.setCode("00");
        payload.setSignature("forged_signature");

        when(billingService.verifyAndProcessWebhook(payload)).thenReturn(false);

        ResponseEntity<?> response = controller.handlePayOsWebhook(payload);

        assertNotNull(response);
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertTrue(response.getBody().toString().contains("Invalid signature"));
    }
}
