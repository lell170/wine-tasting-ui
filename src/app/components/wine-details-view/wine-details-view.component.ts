import { AfterContentInit, AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Wine } from '../../model/wine';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { KeyValue } from '@angular/common';

@Component({
  selector: 'app-wine-details-view',
  template: `
    <div class="element-detail"
      [@detailExpand]="wine.expanded ? 'expanded' : 'collapsed'">
      <div id="details_view">
        <div class="wine_name">{{wine.name}}</div>
        <div class="wine_year">{{wine.year}}</div>
        <table class="wine_details_table">
          <tbody>
            <tr *ngFor="let wineAttr of wineAttributes | keyvalue : unsorted">
              <td class="wine_details_table_headline">{{wineAttr.value}}</td>
              <td class="wine_details_table_value">{{wine[wineAttr.key]}}</td>
            </tr>
          </tbody>
        </table>
        <div class="wine_details_button_area">
          <button mat-flat-button color="primary" (click)="wine.expanded = !wine.expanded">CLOSE</button>
        </div>
      </div>
    </div>`,
  styleUrls: ['./wine-details-view.component.css'],
  animations: [trigger('detailExpand', [
    state('collapsed', style({ height: '0px', minHeight: '0' })),
    state('expanded', style({ height: '*' })),
    transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
  ])]
})
export class WineDetailsViewComponent implements AfterViewInit {

  @Input()
  wine: Wine;
  wineAttributes = new Map([
    ['countryCode', 'Country'],
    ['name', 'Name'],
    ['wineMaker', 'Wine maker'],
    ['year', 'Year'],
    ['importDate', 'Import Date'],
    ['changeDate', 'Change Date'],
    ['description', 'Description']
  ]);

  constructor() {

  }

  ngAfterViewInit(): void {
  }

  unsorted(): number {
    return;
  }


}
