import { Component, Input, OnInit } from '@angular/core';
import { DetailSection } from '../../../model/detailSection';
import { FieldType } from '../../../model/field';

@Component({
  selector: 'app-details-view-section',
  templateUrl: './details-view-section.component.html',
  styleUrls: ['./details-view-section.component.css']
})
export class DetailsViewSectionComponent implements OnInit {

  @Input()
  detailsSection: DetailSection;

  constructor() {
  }

  isStringType(fieldType: FieldType): boolean {
    return fieldType === FieldType.STRING;
  }

  isNumberType(fieldType: FieldType): boolean {
    return fieldType === FieldType.NUMBER;
  }

  ngOnInit(): void {
  }

}
