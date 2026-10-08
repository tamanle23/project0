# Advanced Product Information Management (PIM) Engine
### Enterprise Architectural Blueprint: Hybrid Relational-JSONB Pattern

---

## 1. Executive Summary & Core Paradigm

Traditional e-commerce and catalog backends inevitably run into an architectural dead-end:
1. **Rigid Relational Schemas:** Adding specialized columns for every category (e.g., `voltage`, `fabric_blend`, `steam_key`) causes severe table sprawl, hundreds of sparse `NULL` columns, and risky, blocking `ALTER TABLE` migrations under high write load.
2. **Pure EAV (Entity-Attribute-Value):** Spreading properties across millions of generic rows forces multi-join Cartesian products and recursive pivots, collapsing read performance and destroying referential integrity.
3. **Pure Document Stores (NoSQL):** Sacrificing transactional ACID guarantees, relational joins, and strict schema validation leads to silent data decay, orphaned catalog states, and fragile cross-category analytics.

### The Hybrid Solution
This blueprint defines an **enterprise-grade PIM engine** built directly on **PostgreSQL** combining:
- **Strongly Typed Relational Hard Columns** for core operational and transactional invariants (SKUs, inventory levels, base pricing, status, parentage).
- **Binary JSON (`JSONB`) Payloads with GIN Indexing** for dynamic specifications, localized content, and multi-channel syndication overrides.
- **Relational Metadata Control Tables (`attribute_definitions`)** driving runtime UI form generation and strict application-level schema enforcement.
- **Dedicated Junction/Edge Tables** for variant matrixing, dynamic kitting/bundles, and bill of materials (BOM).

---

## 2. Relational vs. Dynamic Separation of Concerns

The operational efficiency of the PIM relies on strict boundaries between relational columns and `JSONB` document keys:

```
+---------------------------------------------------------------------------------------------------+
|                                 CORE PRODUCT RECORD (entities table)                              |
+------------------------------------------------------+--------------------------------------------+
| RELATIONAL HARD COLUMNS (Invariants)                 | DYNAMIC JSONB PAYLOAD (Variant/Category)   |
| - ID (UUIDv7 / Sequential)                           | - Dynamic Specifications (RAM, Torque, Size)|
| - SKU (Unique, B-Tree indexed)                       | - Channel Syndication Overrides (TikTok,   |
| - Parent_ID (Self-referencing FK for Variants)       |   Shopify, Amazon, Web Store)              |
| - Base Price & Currency (Financial aggregates)       | - Digital Assets Metadata & Video Links    |
| - Stock Quantity & Reserved Count                    | - Compliance Flags & Battery Warnings      |
| - Lifecycle Status (Draft, Review, Published)        | - Multi-Language Localized Descriptions    |
| - Tenant_ID (Multi-tenant partition key)             |                                            |
+------------------------------------------------------+--------------------------------------------+
```

### The Allocation Rules

| Field Type | Storage Location | Indexing Strategy | Justification |
| :--- | :--- | :--- | :--- |
| **Identity & SKU** | Relational Column | Unique B-Tree Index | System-wide uniqueness, instant exact lookup. |
| **Inventory & Pricing** | Relational Column | B-Tree / Composite | High write frequency, native SQL arithmetic (`SUM`, `AVG`), zero parsing overhead. |
| **Status & Workflow** | Relational Column | Partial B-Tree (`WHERE status = 'published'`) | Used in 99% of customer-facing queries; partial index saves RAM. |
| **Category Specifications** | `JSONB` (`attributes`) | GIN (`jsonb_path_ops`) | Unpredictable, category-specific, sparse; instant containment queries (`@>`). |
| **Channel Overrides** | `JSONB` (`syndication`) | GIN or Targeted B-Tree Expression | Prevents secondary schema tables for third-party marketplace quirks. |
| **Relationships / Bundles** | Edge Table (`entity_relationships`) | Composite Primary Key + FKs | Foreign-key referential integrity with customizable link metadata. |

---

## 3. Database Schema Implementation

```sql
-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "btree_gin";

-- 1. Category / Entity Hierarchy
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    parent_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    display_name VARCHAR(150) NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Dynamic Attribute Blueprint (Metadata Schema Engine)
CREATE TABLE attribute_definitions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
    field_key VARCHAR(64) NOT NULL,         -- e.g., 'max_torque_nm', 'battery_platform'
    display_name VARCHAR(128) NOT NULL,     -- UI Label: 'Max Torque (Nm)'
    data_type VARCHAR(24) NOT NULL,          -- 'string', 'number', 'boolean', 'enum', 'array'
    ui_component VARCHAR(32) NOT NULL,       -- 'text_input', 'stepper', 'select', 'multiselect'
    is_required BOOLEAN NOT NULL DEFAULT false,
    is_searchable BOOLEAN NOT NULL DEFAULT true,
    is_variant_axis BOOLEAN NOT NULL DEFAULT false, -- Drives SKU matrix generation
    validation_rules JSONB DEFAULT '{}'::jsonb,     -- Regex, min/max bounds, step increments
    allowed_values JSONB DEFAULT '[]'::jsonb,       -- For dropdown enums: ["18V", "20V Max", "40V"]
    display_order INT NOT NULL DEFAULT 0,
    is_archived BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(category_id, field_key)
);

-- 3. Core Product Table (The Hybrid Model)
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL, -- Multi-tenant isolation boundary
    category_id UUID NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
    
    -- Variant Hierarchy: NULL parent_id indicates Base/Parent Product; non-null indicates SKU Variant
    parent_id UUID REFERENCES products(id) ON DELETE CASCADE,
    
    -- Hard Relational Columns for Core Business Logic
    sku VARCHAR(64) UNIQUE NOT NULL,
    base_price NUMERIC(12, 4) NOT NULL CHECK (base_price >= 0),
    currency VARCHAR(3) NOT NULL DEFAULT 'USD',
    inventory_quantity INT NOT NULL DEFAULT 0,
    status VARCHAR(24) NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'review', 'published', 'archived')),
    
    -- Flexible Payloads
    -- Category-specific specifications (e.g., motor_type, torque, size)
    attributes JSONB NOT NULL DEFAULT '{}'::jsonb,
    
    -- Channel-specific syndication overrides (TikTok Shop, Shopify, Amazon)
    syndication JSONB NOT NULL DEFAULT '{}'::jsonb,
    
    -- Audit & Concurrency Control
    version INT NOT NULL DEFAULT 1,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. High-Performance Indexing Strategy
-- Primary containment index for searching all dynamic attributes
CREATE INDEX idx_products_attributes_gin ON products USING GIN (attributes jsonb_path_ops);

-- Primary containment index for marketplace overrides
CREATE INDEX idx_products_syndication_gin ON products USING GIN (syndication jsonb_path_ops);

-- Partial index for active, published catalog browsing (avoids scanning drafts and archived items)
CREATE INDEX idx_products_active_published ON products (category_id, base_price) 
WHERE status = 'published' AND parent_id IS NULL;

-- Expression index for quick variant lookups
CREATE INDEX idx_products_parent_sku ON products (parent_id, sku);

-- 5. Typed Edge Junction Table (Dynamic Bundling, Kitting, and Accessories)
CREATE TABLE product_relationships (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source_product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    target_product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    relationship_type VARCHAR(32) NOT NULL, -- 'variant', 'bundle_item', 'accessory', 'cross_sell'
    
    -- Context-specific link attributes
    edge_metadata JSONB NOT NULL DEFAULT '{}'::jsonb, -- e.g., {"quantity": 2, "discount_pct": 100}
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (source_product_id, target_product_id, relationship_type)
);

CREATE INDEX idx_relationships_source ON product_relationships (source_product_id, relationship_type);
```

---

## 4. Variant Matrix & SKU Generation Engine

Products typically exist on a two-tier hierarchy:
1. **Base / Parent Product (`parent_id IS NULL`):** Holds brand, primary SEO copy, base marketing descriptions, and the universal category reference. It does not carry direct stock.
2. **Variant / SKU (`parent_id = parent.id`):** Holds distinct physical inventory, warehouse barcoding, SKU identifier, specific pricing adjustments, and the variant attributes (axes).

```
                      +---------------------------------------+
                      |         PARENT ENTITY (PRODUCT)       |
                      |  SKU: DKT-M21-BASE                    |
                      |  Title: Dekton 21V Brushless Driver   |
                      |  attributes: {"motor": "brushless"}   |
                      +-------------------+-------------------+
                                          |
                +-------------------------+-------------------------+
                |                                                   |
+---------------+---------------+                   +---------------+---------------+
|       VARIANT SKU 1           |                   |       VARIANT SKU 2           |
| SKU: DKT-M21-SOLO             |                   | SKU: DKT-M21-2BAT             |
| Price: $65.00                 |                   | Price: $125.00                |
| Stock: 150                    |                   | Stock: 45                     |
| attributes: {                 |                   | attributes: {                 |
|   "kit_type": "Bare Tool",    |                   |   "kit_type": "2x 4.0Ah Kit", |
|   "case_included": false      |                   |   "case_included": true       |
| }                             |                   | }                             |
+-------------------------------+                   +-------------------------------+
```

### Automated Matrix Combination Generation (Backend Worker Logic)

When a merchandiser configures variant axes in `attribute_definitions` (e.g., `color = [Red, Blue]`, `battery = [Bare Tool, 4.0Ah Kit]`), the backend computes the Cartesian product:

$$\text{Variants} = A_1 \times A_2 \times \dots \times A_n$$

```typescript
// Variant Matrix Generation Algorithm (TypeScript / Node.js)
interface VariantAxis {
  field_key: string;
  options: string[];
}

export function generateVariantMatrix(
  baseSku: string,
  axes: VariantAxis[]
): Array<{ skuSuffix: string; attributes: Record<string, string> }> {
  return axes.reduce<Array<{ skuSuffix: string; attributes: Record<string, string> }>>(
    (acc, axis) => {
      if (acc.length === 0) {
        return axis.options.map((opt) => ({
          skuSuffix: `-${opt.toUpperCase().replace(/\s+/g, '')}`,
          attributes: { [axis.field_key]: opt },
        }));
      }
      return acc.flatMap((existing) =>
        axis.options.map((opt) => ({
          skuSuffix: `${existing.skuSuffix}-${opt.toUpperCase().replace(/\s+/g, '')}`,
          attributes: { ...existing.attributes, [axis.field_key]: opt },
        }))
      );
    },
    []
  );
}
```

---

## 5. Multi-Channel Syndication Architecture

Modern PIMs must syndicate catalogs across disparate sales channels—each with strict, incompatible schema requirements:
- **Direct Web Store (Shopify/Next.js):** Professional, semantic descriptions, high-resolution imagery.
- **TikTok Shop:** Keyword-stuffed titles, mandatory flash-sale pricing, strict character length restrictions, platform-specific category IDs.
- **Amazon / MercadoLibre / Shopee:** Custom bullet points, compliance identifiers, and logistics weight tags.

### The Nested Channel Pattern

Instead of creating separate tables per channel, channel configurations are stored under the `syndication` JSONB column:

```json
{
  "channels": {
    "web_store": {
      "is_active": true,
      "title": "Dekton M21 Compact Impact Driver (Brushless)",
      "bullet_points": [
        "High-performance brushless motor delivers 330Nm torque",
        "Compact 125mm head length for tight spaces"
      ],
      "display_badges": ["New Arrival", "Best Seller"]
    },
    "tiktok_shop": {
      "is_active": true,
      "title": "[FREESHIP MAX] Máy Siết Bulong Dekton M21 - Động Cơ Không Chổi Than 330Nm Chuyên Dụng",
      "marketplace_category_id": 601244,
      "promo_pricing": {
        "flash_sale_price": 950000,
        "currency": "VND",
        "max_order_quantity": 2
      },
      "video_anchor_ids": ["v_741920194821"]
    },
    "amazon_us": {
      "is_active": false,
      "asin": null,
      "compliance_flags": {
        "prop_65_warning": true,
        "contains_lithium_battery": true,
        "un38_3_certified": true
      }
    }
  }
}
```

### High-Throughput Channel Extraction Query

To find all products enabled for synchronization to TikTok Shop that have active flash-sale pricing:

```sql
SELECT 
    id, 
    sku, 
    base_price,
    syndication #>> '{channels, tiktok_shop, title}' AS channel_title,
    (syndication #>> '{channels, tiktok_shop, promo_pricing, flash_sale_price}')::numeric AS flash_price
FROM products
WHERE category_id = 'c1234567-89ab-cdef-0123-456789abcdef'
  AND syndication @> '{"channels": {"tiktok_shop": {"is_active": true}}}'
  AND (syndication #>> '{channels, tiktok_shop, promo_pricing, flash_sale_price}') IS NOT NULL;
```

---

## 6. Dynamic Faceted Search & Aggregation

Dynamic faceted search is traditionally slow on document stores. In PostgreSQL, this can be achieved efficiently using native JSONB functions and composite aggregation patterns without secondary search clusters for mid-sized catalogs ($< 1,000,000$ SKUs).

### Aggregating Available Facets Dynamically

When a user browses a category, the UI needs to display sidebar checkboxes with counts for every dynamic attribute.

```sql
-- Dynamic Facet Extraction for Category Browsing
WITH filtered_products AS (
    SELECT attributes
    FROM products
    WHERE category_id = 'b2345678-90ab-cdef-1234-567890abcdef'
      AND status = 'published'
      AND parent_id IS NULL
)
SELECT 
    key AS attribute_key,
    value AS attribute_value,
    COUNT(*) AS match_count
FROM filtered_products,
LATERAL jsonb_each_text(attributes)
WHERE key IN ('motor_type', 'battery_platform', 'drive_size')
GROUP BY key, value
ORDER BY key, match_count DESC;
```

### Executing Multi-Facet Filter Queries

When the customer filters by `motor_type = 'brushless'` AND `battery_platform = '21V'`, translate this into an optimized containment operation:

```sql
SELECT 
    id, 
    sku, 
    base_price, 
    attributes
FROM products
WHERE category_id = 'b2345678-90ab-cdef-1234-567890abcdef'
  AND status = 'published'
  AND attributes @> '{"motor_type": "brushless", "battery_platform": "21V"}'::jsonb
ORDER BY base_price ASC
LIMIT 24 OFFSET 0;
```
*Because the GIN index uses `jsonb_path_ops`, this query operates as a sub-millisecond bitmap index scan.*

---

## 7. Event-Driven Lifecycle & Syndication Engine

A production PIM is not just a passive store—it is a live orchestration engine. Product updates must trigger validation, asset transformation, and syndication workflows.

```
+----------------------------------------------------------------------------------------------------+
|                                      PIM WORKFLOW ORCHESTRATION                                    |
+----------------------------------------------------------------------------------------------------+
                                                  │
                                   Product Updated / Published
                                                  │
                                                  ▼
                                   PostgreSQL WAL (Logical CDC)
                                                  │
                                                  ▼
                                      Debezium Connector
                                                  │
                                                  ▼
                                       Apache Kafka Broker
                                    (Topic: pim.product.events)
                                                  │
                                                  ▼
                                        Conductor OSS / Temporal
                                         (Orchestration Engine)
                                                  │
                   ┌──────────────────────────────┼──────────────────────────────┐
                   │                              │                              │
                   ▼                              ▼                              ▼
          Task 1: Validation             Task 2: Asset Pipeline         Task 3: Channel Syndication
        - Dynamic JSON Schema          - WebP/AVIF Generation         - Map to TikTok Open API
        - Mandatory Image Audits       - Watermark Insertion          - Push Inventory to Shopify
        - Price Floor Checks           - CDN Pre-warm                 - Format Amazon SP-API Feeds
```

### Event Payload Structure (CDC Event)

```json
{
  "event_id": "evt_987654321",
  "event_type": "PRODUCT_LIFECYCLE_CHANGED",
  "timestamp": "2026-10-08T16:30:00Z",
  "entity_id": "p_11223344-5566-7788-9900-aabbccddeeff",
  "tenant_id": "t_00000000-0000-0000-0000-000000000001",
  "changes": {
    "status": {
      "old": "review",
      "new": "published"
    },
    "updated_attributes": ["syndication.channels.tiktok_shop.promo_pricing"]
  }
}
```

---

## 8. Enterprise Resilience, TOAST Mitigation & Governance

### 1. The PostgreSQL TOAST Bloat Threat
PostgreSQL stores rows in 8KB blocks. When a `JSONB` payload exceeds roughly 2KB, PostgreSQL compresses it and pushes it out-of-line into **TOAST** (The Oversized-Attribute Storage Technique) tables.
- **The Problem:** Modifying a single key in `attributes` forces PostgreSQL to rewrite the entire JSONB document into TOAST storage, generating dead tuples and massive disk I/O bloat under frequent price or stock updates.
- **Mitigation 1 (Separation of Invariants):** Keep fast-changing fields (`inventory_quantity`, `base_price`, `status`) strictly in **hard columns**. Never store real-time inventory inside `JSONB`.
- **Mitigation 2 (Aggressive Vacuuming):**
  ```sql
  ALTER TABLE products SET (
      autovacuum_vacuum_scale_factor = 0.05,
      autovacuum_vacuum_cost_limit = 1000,
      autovacuum_vacuum_cost_delay = 2
  );
  ```

### 2. Hard Payload Limits via Validation Layer
Enforce strict physical size limits before data hits PostgreSQL:
```typescript
// Validation Middleware Guardrail
export function validatePayloadSize(payload: Record<string, unknown>, maxKb = 64): void {
  const bytes = Buffer.byteLength(JSON.stringify(payload), 'utf8');
  if (bytes > maxKb * 1024) {
    throw new PayloadTooLargeException(
      `Payload size of ${Math.round(bytes / 1024)}KB exceeds maximum allowable limit of ${maxKb}KB.`
    );
  }
}
```

### 3. Automatic Column Promotion Telemetry
To prevent performance degradation over time, execute an audit script every quarter to detect high-frequency dynamic keys:

```sql
-- Identify JSONB keys that appear in > 85% of category records
SELECT 
    key,
    ROUND(COUNT(*)::numeric / (SELECT COUNT(*) FROM products WHERE category_id = 'c_uuid')::numeric * 100, 2) AS usage_percentage
FROM products,
LATERAL jsonb_object_keys(attributes) AS key
WHERE category_id = 'c_uuid'
GROUP BY key
HAVING COUNT(*) > 50000
ORDER BY usage_percentage DESC;
```
*If a key exceeds 85% usage and is frequently used in `ORDER BY` or range filtering, promote it to a strongly-typed hard column with a standard B-Tree index.*

---

## 9. Architectural Decision Summary Matrix

| Decision Axis | Selected Approach | Anti-Pattern to Avoid |
| :--- | :--- | :--- |
| **Catalog Attribute Model** | Hybrid Relational + `JSONB` with `attribute_definitions` validation | Pure EAV (causes catastrophic join latency) or Wide Tables (causes migration gridlocks). |
| **Indexing Structure** | `jsonb_path_ops` GIN Index for containment (`@>`) | B-Tree on extracted text strings without expression indexes (causes full table scans). |
| **Variant Architecture** | Self-referencing Parent-Child with hard `parent_id` column | Storing all variants inside a single nested JSON array within the parent record. |
| **Channel Customization** | Channel-keyed sub-trees inside a `syndication` JSONB payload | Separate physical database tables per sales channel. |
| **Bundle & Kit Management**| Relational Edge Table (`product_relationships`) | Comma-delimited strings or untracked JSON lists without foreign key constraints. |
| **High-Volume Search** | Direct GIN queries for $< 1M$ SKUs; CDC offloading to Typesense/Elasticsearch for $> 1M$ SKUs | Running unindexed wildcard regex queries (`LIKE '%...%'`) directly against raw JSONB. |