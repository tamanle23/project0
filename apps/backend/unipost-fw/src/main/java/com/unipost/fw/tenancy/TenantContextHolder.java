package com.unipost.fw.tenancy;

import java.util.Objects;

/**
 * ThreadLocal context holder for active tenant identifier.
 */
public final class TenantContextHolder {

    private static final ThreadLocal<String> CURRENT_TENANT = new ThreadLocal<>();

    private TenantContextHolder() {
        // Prevent instantiation
    }

    /**
     * Set the current tenant ID in the ThreadLocal context.
     *
     * @param tenantId the tenant ID
     */
    public static void setTenantId(String tenantId) {
        CURRENT_TENANT.set(tenantId);
    }

    /**
     * Get the current tenant ID from the ThreadLocal context.
     *
     * @return the active tenant ID, or null if not set
     */
    public static String getTenantId() {
        return CURRENT_TENANT.get();
    }

    /**
     * Get the required tenant ID from the ThreadLocal context.
     *
     * @return the active tenant ID
     * @throws IllegalStateException if no tenant ID is present on current thread
     */
    public static String getRequiredTenantId() {
        String tenantId = CURRENT_TENANT.get();
        if (tenantId == null || tenantId.isBlank()) {
            throw new IllegalStateException("Security violation: No active TenantContext found on current thread");
        }
        return tenantId;
    }

    /**
     * Clear the current tenant context.
     */
    public static void clear() {
        CURRENT_TENANT.remove();
    }
}
