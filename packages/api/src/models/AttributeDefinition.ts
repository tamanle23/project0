export class AttributeDefinition {
  id: number;
  name: string;
  dataType: string;

  constructor(row: AttributeRow) {
    this.id = row.id;
    this.name = row.name;
    this.dataType = row.dataType;
  }
}