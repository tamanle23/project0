import type { AttributeDefinition } from "./AttributeDefinition.ts";

export class EntityDefinition {
  id: number;
  name: string;
  attributes: AttributeDefinition[];

  constructor(row: EntityRow, attrRows: AttributeRow[] = []) {
    this.id = row.id;
    this.name = row.name;
    this.attributes = attrRows.map(a => new AttributeDefinition(a));
  }
}

