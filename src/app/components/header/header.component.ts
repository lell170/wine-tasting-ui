import { Component, Input, OnInit, ViewChild, ViewRef } from '@angular/core';
import { WineTableComponent } from '../wine-table/wine-table.component';

@Component({
  selector: 'app-header',
  template: `
    <div id="header">
      <div>
        <img src="assets/logo.png" alt="logo" id="logo">
      </div>
      <div id="filter_field">
        <mat-form-field>
          <input matInput type="text" placeholder="Filter" (keyup)="wineTableComponent.doSearchFilter($event.target)">
        </mat-form-field>
      </div>
    </div>
  `,
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() wineTableComponent: WineTableComponent;

  constructor() {
  }

  ngOnInit(): void {
  }

}
