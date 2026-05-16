import { sqliteTable, text, integer, primaryKey, index } from 'drizzle-orm/sqlite-core';
import type { InferSelectModel } from 'drizzle-orm';

// 1. ENTITY (The Blueprint)
export const entities = sqliteTable('entities', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull().unique(), // e.g., 'Smartphone'
  description: text('description'),
});

// 2. ATTRIBUTE (The Metadata Schema)
export const attributes = sqliteTable('attributes', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  entityId: integer('entity_id').references(() => entities.id).notNull(),
  name: text('name').notNull(), // e.g., 'Battery Capacity'
  dataType: text('data_type').notNull(), // 'string', 'number', 'boolean'
});

// 3. RESOURCE OBJECT (The Instance Head)
export const resourceObjects = sqliteTable('resource_objects', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  entityId: integer('entity_id').references(() => entities.id).notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});

// 4. RESOURCE VALUES (The EAV Storage)
export const resourceValues = sqliteTable('resource_values', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  resourceObjectId: integer('resource_object_id').references(() => resourceObjects.id).notNull(),
  attributeId: integer('attribute_id').references(() => attributes.id).notNull(),
  value: text('value').notNull(), // Values stored as strings, casted in logic
});

// 5. TAGS (Decoupled Hierarchy)
export const tags = sqliteTable('tags', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull().unique(),
  parentId: integer('parent_id').references(() => tags.id),
});

// 6. TAG ASSIGNMENTS (Linking Tags to Resources)
export const resourceTags = sqliteTable('resource_tags', {
  resourceObjectId: integer('resource_object_id').references(() => resourceObjects.id).notNull(),
  tagId: integer('tag_id').references(() => tags.id).notNull(),
}, (t) => [{
  pk: primaryKey({ columns: [t.resourceObjectId, t.tagId] }),
}]);
