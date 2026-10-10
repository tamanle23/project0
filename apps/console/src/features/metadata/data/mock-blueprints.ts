import type { BlueprintManifest, BlueprintSummaryDto } from '../api/types';

export const mockBlueprintManifests: BlueprintManifest[] = [
  {
    id: 'bp_cms_publishing_v1',
    name: 'Headless CMS & Digital Publishing',
    category: 'MEDIA_PUBLISHING',
    description: 'Multi-channel content authoring, articles, category taxonomy, SEO metadata, and media asset management.',
    icon: 'Newspaper',
    entityTypes: [
      {
        systemName: 'ent_cms_article',
        name: 'Article & Editorial Post',
        description: 'Long-form editorial articles, news items, and blog posts',
        attributes: [
          { systemName: 'title', name: 'Article Title', dataType: 'STRING', uiComponent: 'text', isRequired: true, displayOrder: 1 },
          { systemName: 'slug', name: 'URL Slug', dataType: 'STRING', uiComponent: 'text', isRequired: true, displayOrder: 2 },
          { systemName: 'summary', name: 'Excerpt Summary', dataType: 'STRING', uiComponent: 'textarea', isRequired: false, displayOrder: 3 },
          { systemName: 'body_content', name: 'Body Content (Markdown / HTML)', dataType: 'STRING', uiComponent: 'textarea', isRequired: true, displayOrder: 4 },
          { systemName: 'status', name: 'Publishing Status', dataType: 'STRING', uiComponent: 'select', isRequired: true, displayOrder: 5, options: { choices: ['DRAFT', 'IN_REVIEW', 'SCHEDULED', 'PUBLISHED', 'ARCHIVED'] }, defaultValue: 'DRAFT' },
          { systemName: 'featured_flag', name: 'Featured Headline', dataType: 'BOOLEAN', uiComponent: 'switch', isRequired: false, displayOrder: 6, defaultValue: 'false' },
          { systemName: 'published_at', name: 'Publication Timestamp', dataType: 'DATETIME', uiComponent: 'datepicker', isRequired: false, displayOrder: 7 },
        ],
      },
      {
        systemName: 'ent_cms_category',
        name: 'Content Category',
        description: 'Hierarchical taxonomy topics and editorial sections',
        attributes: [
          { systemName: 'category_name', name: 'Category Name', dataType: 'STRING', uiComponent: 'text', isRequired: true, displayOrder: 1 },
          { systemName: 'slug', name: 'Category Slug', dataType: 'STRING', uiComponent: 'text', isRequired: true, displayOrder: 2 },
          { systemName: 'description', name: 'Description', dataType: 'STRING', uiComponent: 'textarea', isRequired: false, displayOrder: 3 },
          { systemName: 'color_code', name: 'Badge Color Code (Hex)', dataType: 'STRING', uiComponent: 'text', isRequired: false, displayOrder: 4, defaultValue: '#3B82F6' },
        ],
      },
      {
        systemName: 'ent_cms_media_asset',
        name: 'Media Asset',
        description: 'Image attachments, illustrations, and featured hero photography',
        attributes: [
          { systemName: 'file_name', name: 'Asset Filename', dataType: 'STRING', uiComponent: 'text', isRequired: true, displayOrder: 1 },
          { systemName: 'storage_url', name: 'CDN Public URL', dataType: 'STRING', uiComponent: 'text', isRequired: true, displayOrder: 2 },
          { systemName: 'mime_type', name: 'MIME Type', dataType: 'STRING', uiComponent: 'text', isRequired: true, displayOrder: 3, defaultValue: 'image/jpeg' },
          { systemName: 'file_size_bytes', name: 'File Size in Bytes', dataType: 'INTEGER', uiComponent: 'number', isRequired: true, displayOrder: 4 },
        ],
      },
    ],
    relationshipTypes: [
      {
        systemName: 'rel_article_to_category',
        name: 'Categorized Under',
        description: 'Associates an article with an editorial taxonomy category',
        sourceEntityType: 'ent_cms_article',
        targetEntityType: 'ent_cms_category',
        cardinality: 'MANY_TO_ONE',
      },
      {
        systemName: 'rel_article_featured_media',
        name: 'Hero Cover Asset',
        description: 'Binds a hero cover photography media asset to an article',
        sourceEntityType: 'ent_cms_article',
        targetEntityType: 'ent_cms_media_asset',
        cardinality: 'MANY_TO_ONE',
      },
    ],
  },
  {
    id: 'bp_logistics_v1',
    name: 'Logistics & Fleet Management',
    category: 'OPERATIONS',
    description: 'Track fleet delivery vehicles, dispatch manifest routes, consignment tracking, and driver assignments.',
    icon: 'Truck',
    entityTypes: [
      {
        systemName: 'ent_vehicle',
        name: 'Fleet Vehicle',
        description: 'Transport trucks, vans, and cargo dispatch vehicles',
        attributes: [
          { systemName: 'plate_number', name: 'License Plate', dataType: 'STRING', uiComponent: 'text', isRequired: true, displayOrder: 1 },
          { systemName: 'vehicle_type', name: 'Vehicle Class', dataType: 'STRING', uiComponent: 'select', isRequired: true, displayOrder: 2, options: { choices: ['VAN', 'LIGHT_TRUCK', 'HEAVY_TRUCK', 'CONTAINER'] } },
          { systemName: 'payload_capacity_kg', name: 'Payload Capacity (KG)', dataType: 'DECIMAL', uiComponent: 'number', isRequired: true, displayOrder: 3 },
          { systemName: 'is_active', name: 'Active In Service', dataType: 'BOOLEAN', uiComponent: 'switch', isRequired: true, displayOrder: 4, defaultValue: 'true' },
        ],
      },
      {
        systemName: 'ent_consignment',
        name: 'Delivery Consignment',
        description: 'Individual parcels, courier packages, and cargo orders',
        attributes: [
          { systemName: 'tracking_code', name: 'Tracking Number', dataType: 'STRING', uiComponent: 'text', isRequired: true, displayOrder: 1 },
          { systemName: 'recipient_name', name: 'Recipient Name', dataType: 'STRING', uiComponent: 'text', isRequired: true, displayOrder: 2 },
          { systemName: 'delivery_status', name: 'Delivery Status', dataType: 'STRING', uiComponent: 'select', isRequired: true, displayOrder: 3, options: { choices: ['PENDING', 'DISPATCHED', 'IN_TRANSIT', 'DELIVERED', 'FAILED'] }, defaultValue: 'PENDING' },
        ],
      },
    ],
    relationshipTypes: [
      {
        systemName: 'rel_consignment_vehicle',
        name: 'Loaded On Vehicle',
        description: 'Associates consignment parcel onto transport vehicle',
        sourceEntityType: 'ent_consignment',
        targetEntityType: 'ent_vehicle',
        cardinality: 'MANY_TO_ONE',
      },
    ],
  },
  {
    id: 'bp_crm_billing_v1',
    name: 'B2B CRM & Commercial Billing',
    category: 'COMMERCE',
    description: 'Enterprise accounts, contacts, quote contracts, and recurring invoice receivables.',
    icon: 'Briefcase',
    entityTypes: [
      {
        systemName: 'ent_account',
        name: 'Corporate Account',
        description: 'Client organizations and business partners',
        attributes: [
          { systemName: 'company_name', name: 'Company Legal Name', dataType: 'STRING', uiComponent: 'text', isRequired: true, displayOrder: 1 },
          { systemName: 'tax_identifier', name: 'VAT / Tax Code', dataType: 'STRING', uiComponent: 'text', isRequired: true, displayOrder: 2 },
          { systemName: 'account_tier', name: 'Client Tier', dataType: 'STRING', uiComponent: 'select', isRequired: true, displayOrder: 3, options: { choices: ['STANDARD', 'GOLD', 'PLATINUM', 'ENTERPRISE'] }, defaultValue: 'STANDARD' },
          { systemName: 'credit_limit_usd', name: 'Credit Limit (USD)', dataType: 'DECIMAL', uiComponent: 'number', isRequired: false, displayOrder: 4 },
        ],
      },
      {
        systemName: 'ent_invoice',
        name: 'Billing Invoice',
        description: 'Commercial invoice records and settlement statuses',
        attributes: [
          { systemName: 'invoice_number', name: 'Invoice Number', dataType: 'STRING', uiComponent: 'text', isRequired: true, displayOrder: 1 },
          { systemName: 'total_amount', name: 'Total Amount (USD)', dataType: 'DECIMAL', uiComponent: 'number', isRequired: true, displayOrder: 2 },
          { systemName: 'payment_status', name: 'Payment Status', dataType: 'STRING', uiComponent: 'select', isRequired: true, displayOrder: 3, options: { choices: ['DRAFT', 'ISSUED', 'PAID', 'OVERDUE', 'CANCELLED'] }, defaultValue: 'DRAFT' },
          { systemName: 'due_date', name: 'Due Date', dataType: 'DATE', uiComponent: 'datepicker', isRequired: true, displayOrder: 4 },
        ],
      },
    ],
    relationshipTypes: [
      {
        systemName: 'rel_invoice_to_account',
        name: 'Billed To Account',
        description: 'Connects billing invoice to corresponding corporate account',
        sourceEntityType: 'ent_invoice',
        targetEntityType: 'ent_account',
        cardinality: 'MANY_TO_ONE',
      },
    ],
  },
  {
    id: 'bp_blank_v1',
    name: 'Blank Canvas',
    category: 'GENERAL',
    description: 'Empty workspace with no pre-configured models. Perfect for custom tailored schema modeling.',
    icon: 'Layers',
    entityTypes: [],
    relationshipTypes: [],
  },
];

export const mockBlueprintSummaries: BlueprintSummaryDto[] = mockBlueprintManifests.map((m) => ({
  id: m.id,
  name: m.name,
  category: m.category,
  description: m.description,
  icon: m.icon,
  entityTypesCount: m.entityTypes.length,
  relationshipTypesCount: m.relationshipTypes.length,
}));
