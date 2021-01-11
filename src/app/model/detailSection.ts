import { Field } from './field';

export class DetailSection {
  header: string;
  fields: Array<Field>;

  constructor(header: string, fields: Array<Field>) {
    this.header = header;
    this.fields = fields;
  }
}
