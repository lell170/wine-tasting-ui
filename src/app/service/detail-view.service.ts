import { Injectable } from '@angular/core';
import { Field, FieldType } from '../model/field';
import { Wine } from '../model/wine';

@Injectable({
  providedIn: 'root'
})
export class DetailViewService {

  private static initializeWineFields(): Array<Field> {
    const fields = new Array<Field>();
    fields.push(new Field('countryCode', 'Land', FieldType.STRING));
    fields.push(new Field('winery', 'Winzer', FieldType.STRING));
    fields.push(new Field('grape', 'Rebsorte', FieldType.STRING));
    fields.push(new Field('name', 'Name', FieldType.STRING));
    fields.push(new Field('year', 'Jahr', FieldType.STRING));
    fields.push(new Field('tastingDate', 'Verkostungsdatum', FieldType.STRING));
    fields.push(new Field('description', 'Beschreibung', FieldType.STRING));
    fields.push(new Field('overallRating', 'Rating / Bewertung', FieldType.STRING));

    return fields;
  }


  private static initializeOpticalFields(): Array<Field> {
    const fields = new Array<Field>();
    fields.push(new Field('clarity', 'Klarheit', FieldType.STRING));
    fields.push(new Field('intensity', 'Intensität', FieldType.NUMBER));
    fields.push(new Field('color', 'Farbe', FieldType.STRING));

    return fields;
  }


  private static initializeNoseFields(): Array<Field> {
    const fields = new Array<Field>();
    fields.push(new Field('growth', 'Entwicklung', FieldType.STRING));
    fields.push(new Field('intensity', 'Intensität', FieldType.NUMBER));
    fields.push(new Field('expression', 'Ausdruck', FieldType.STRING));

    return fields;
  }

  private static initializeFlavorFields(): Array<Field> {
    const fields = new Array<Field>();
    fields.push(new Field('sweetness', 'Süße', FieldType.NUMBER));
    fields.push(new Field('acid', 'Säure', FieldType.NUMBER));
    fields.push(new Field('tannin', 'Gerbstoffe / Tannin', FieldType.NUMBER));
    fields.push(new Field('alcohol', 'Alkohol', FieldType.NUMBER));
    fields.push(new Field('body', 'Körper', FieldType.NUMBER));
    fields.push(new Field('expression', 'Ausdruck', FieldType.STRING));

    return fields;
  }

  public getWineFields(wine: Wine): Array<Field> {
    const fields = DetailViewService.initializeWineFields();
    for (const field of fields) {
      field.value = wine[field.propertyName];
    }

    return fields;
  }

  public getOpticalValueFields(wine: Wine): Array<Field> {
    const fields = DetailViewService.initializeOpticalFields();
    for (const field of fields) {
      field.value = wine.opticalValue[field.propertyName];
    }

    return fields;
  }

  public getNoseValueFields(wine: Wine): Array<Field> {
    const fields = DetailViewService.initializeNoseFields();
    for (const field of fields) {
      field.value = wine.noseValue[field.propertyName];
    }

    return fields;
  }

  public getFlavorValueFields(wine: Wine): Array<Field> {
    const fields = DetailViewService.initializeFlavorFields();
    for (const wineField of fields) {
      wineField.value = wine.flavorValue[wineField.propertyName];
    }

    return fields;
  }
}
