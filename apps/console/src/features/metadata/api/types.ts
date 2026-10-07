export type DataType =
  | 'STRING'
  | 'INTEGER'
  | 'DECIMAL'
  | 'BOOLEAN'
  | 'DATE'
  | 'DATETIME'
  | 'JSON'
  | 'RELATIONSHIP';

export type UiComponentType =
  | 'text'
  | 'textarea'
  | 'number'
  | 'switch'
  | 'select'
  | 'multiselect'
  | 'datepicker'
  | 'json_editor'
  | 'relation_picker';

export type CardinalityType =
  | 'ONE_TO_ONE'
  | 'ONE_TO_MANY'
  | 'MANY_TO_ONE'
  | 'MANY_TO_MANY';

export interface AttributeDefinitionOptions {
  choices?: string[];
  min?: number;
  max?: number;
  pattern?: string;
  targetEntityTypeId?: string | number;
  placeholder?: string;
  [key: string]: unknown;
}

export interface EntityType {
  id: string | number;
  name: string;
  systemName: string;
  description?: string;
  schemaVersion?: number;
  version?: number;
  createdDate?: string;
  updatedDate?: string;
}

export interface AttributeDefinition {
  id: string | number;
  entityTypeId?: string | number;
  name: string;
  systemName: string;
  dataType: DataType;
  uiComponent: UiComponentType;
  isRequired: boolean;
  isArchived?: boolean;
  displayOrder?: number;
  options?: AttributeDefinitionOptions;
  defaultValue?: string;
  version?: number;
  createdDate?: string;
  updatedDate?: string;
}

export interface EntityRecord {
  id: string | number;
  entityTypeId: string | number;
  tenantId?: string;
  attributes: Record<string, unknown>;
  version?: number;
  createdDate?: string;
  updatedDate?: string;
}

export interface RelationshipType {
  id: string | number;
  name: string;
  systemName: string;
  sourceEntityTypeId: string | number;
  targetEntityTypeId: string | number;
  cardinality: CardinalityType;
  description?: string;
  version?: number;
  createdDate?: string;
  updatedDate?: string;
}

export interface EntityRelationship {
  id: string | number;
  relationshipTypeId: string | number;
  sourceRecordId: string | number;
  targetRecordId: string | number;
  attributes?: Record<string, unknown>;
  version?: number;
  createdDate?: string;
  updatedDate?: string;
}

export interface CompiledSchema {
  entityTypeId: string | number;
  schemaVersion: number;
  jsonSchema: string | Record<string, unknown>;
  updatedDate?: string;
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number; // 1-indexed in unipost PageRequest
  size: number;
}

export interface PageRequestParams {
  number?: number;
  size?: number;
  sort?: string;
  tenantId?: string;
  direction?: 'incoming' | 'outgoing' | 'both';
  filters?: Record<string, string | Record<string, string>>;
  [key: string]: unknown;
}

export type CreateEntityTypeDto = Omit<EntityType, 'id' | 'createdDate' | 'updatedDate' | 'schemaVersion'>;
export type UpdateEntityTypeDto = Partial<CreateEntityTypeDto> & { version?: number };

export type CreateAttributeDefinitionDto = Omit<
  AttributeDefinition,
  'id' | 'createdDate' | 'updatedDate'
>;
export type UpdateAttributeDefinitionDto = Partial<CreateAttributeDefinitionDto> & { version?: number };

export type CreateEntityRecordDto = Omit<
  EntityRecord,
  'id' | 'createdDate' | 'updatedDate'
>;
export type UpdateEntityRecordDto = Partial<CreateEntityRecordDto> & { version?: number };

export type CreateRelationshipTypeDto = Omit<
  RelationshipType,
  'id' | 'createdDate' | 'updatedDate'
>;
export type UpdateRelationshipTypeDto = Partial<CreateRelationshipTypeDto> & { version?: number };

export type CreateEntityRelationshipDto = Omit<
  EntityRelationship,
  'id' | 'createdDate' | 'updatedDate'
>;

export interface ValidationErrorDetail {
  field?: string;
  message: string;
  code?: string;
}

export interface ValidateRecordResponse {
  valid: boolean;
  entityTypeId: string | number;
  schemaVersion: number;
  errors: ValidationErrorDetail[];
}

export interface SchemaDriftAnalysisResponse {
  entityTypeId: string | number;
  currentSchemaVersion: number;
  totalRecords: number;
  outdatedRecords: number;
  compliantRecords: number;
}

export interface BackfillFailureDetail {
  recordId: string | number;
  reason: string;
}

export interface SchemaBackfillExecutionResponse {
  entityTypeId: string | number;
  targetSchemaVersion: number;
  processedRecords: number;
  migratedRecords: number;
  failedRecords: number;
  failures: BackfillFailureDetail[];
}
