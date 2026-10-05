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
  options?: AttributeDefinitionOptions;
  defaultValue?: string;
  createdDate?: string;
  updatedDate?: string;
}

export interface EntityRecord {
  id: string | number;
  entityTypeId: string | number;
  tenantId?: string;
  attributes: Record<string, unknown>;
  createdDate?: string;
  updatedDate?: string;
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number; // 1-indexed in project0 PageRequest
  size: number;
}

export interface PageRequestParams {
  number?: number;
  size?: number;
  sort?: string;
}

export type CreateEntityTypeDto = Omit<EntityType, 'id' | 'createdDate' | 'updatedDate'>;
export type UpdateEntityTypeDto = Partial<CreateEntityTypeDto>;

export type CreateAttributeDefinitionDto = Omit<
  AttributeDefinition,
  'id' | 'createdDate' | 'updatedDate'
>;
export type UpdateAttributeDefinitionDto = Partial<CreateAttributeDefinitionDto>;

export type CreateEntityRecordDto = Omit<
  EntityRecord,
  'id' | 'createdDate' | 'updatedDate'
>;
export type UpdateEntityRecordDto = Partial<CreateEntityRecordDto>;
