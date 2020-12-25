import { Component, Input, OnInit, ViewChild, ViewRef } from '@angular/core';
import { CameraComponent } from '../camera-component/camera.component';
import { MatDialog } from '@angular/material/dialog';
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
      <div>
        <a (click)="openCamera()">Camera</a>
      </div>
    </div>
  `,
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() dialog: MatDialog;
  @Input() wineTableComponent: WineTableComponent;

  constructor() {
  }

  /**
   * method for opening camera view
   */
  openCamera(): void {
    this.dialog.open(CameraComponent, {
      width: '750px',
      height: '650px'
    });
  }

  ngOnInit(): void {
  }

}
