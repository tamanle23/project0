package com.unipost.fw.tenancy;

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
     * Clear the current tenant context.
     */
    public static void clear() {
        CURRENT_TENANT.remove();
    }
}
