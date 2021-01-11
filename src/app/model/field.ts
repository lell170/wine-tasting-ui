export class Field {
  propertyName: string;
  title: string;
  fieldType: FieldType;
  value: string;

  constructor(properyName: string, title: string, fieldType: FieldType) {
    this.propertyName = properyName;
    this.title = title;
    this.fieldType = fieldType;
  }
}

export enum FieldType {
  STRING,
  NUMBER
}
