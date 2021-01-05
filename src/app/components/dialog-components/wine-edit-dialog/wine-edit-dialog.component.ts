import { Component, Inject } from '@angular/core';
import { Wine } from '../../../model/wine';
import { WineService } from '../../../service/wine.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Country } from '../../../model/country';
import { Constants } from '../../../constants';
import { WineTableDataService } from '../../../service/wine-table-data.service';

@Component({
  selector: 'app-wine-edit-dialog',
  template: `
    <form novalidate (ngSubmit)="saveWine()" #form="ngForm">
      <mat-dialog-content class="mat-typography">
        <div id="edit_dialog">
          <h2 mat-dialog-title>Wine Form</h2>
          <mat-grid-list cols="3" rowHeight="65px">
            <mat-grid-tile [colspan]="1" [rowspan]="1">
              <mat-form-field appearance="fill">
                <mat-label>Name</mat-label>
                <input matInput value="" name="name" [(ngModel)]="clonedWine.name">
              </mat-form-field>
            </mat-grid-tile>
            <mat-grid-tile [colspan]="1" [rowspan]="1">
              <mat-form-field appearance="fill">
                <mat-label>Wine maker</mat-label>
                <input matInput value="" name="wineMaker" [(ngModel)]="clonedWine.wineMaker">
              </mat-form-field>
            </mat-grid-tile>
            <mat-grid-tile [colspan]="1" [rowspan]="1">
              <mat-form-field appearance="fill">
                <mat-label>Year</mat-label>
                <mat-select name="year" [(ngModel)]="clonedWine.year">
                  <mat-option *ngFor="let year of years" [value]="year">
                    {{year}}
                  </mat-option>
                </mat-select>
              </mat-form-field>
            </mat-grid-tile>
            <mat-grid-tile [colspan]="1" [rowspan]="1">
              <mat-form-field appearance="fill">
                <mat-label>Country</mat-label>
                <mat-select name="countryCode" [(ngModel)]="clonedWine.countryCode">
                  <mat-option *ngFor="let country of countries" [value]="country.countryCode">
                    {{country.country}}
                  </mat-option>
                </mat-select>
              </mat-form-field>
            </mat-grid-tile>
            <mat-grid-tile [colspan]="1" [rowspan]="1">
              <mat-form-field appearance="fill">
                <mat-label>Grape</mat-label>
                <input matInput value="" name="grape" [(ngModel)]="clonedWine.grape">
              </mat-form-field>
            </mat-grid-tile>
            <mat-grid-tile [colspan]="1" [rowspan]="1">
              <mat-form-field appearance="fill">
                <mat-label>Type</mat-label>
                <mat-select name="type" [(ngModel)]="clonedWine.type">
                  <mat-option *ngFor="let wineType of wineTypes" [value]="wineType">
                    {{wineType}}
                  </mat-option>
                </mat-select>
              </mat-form-field>
            </mat-grid-tile>
            <mat-grid-tile [colspan]="3" [rowspan]="1.5">
              <mat-form-field appearance="fill">
                <mat-label>Description</mat-label>
                <textarea matInput name="description" [(ngModel)]="clonedWine.description" rows="4"></textarea>
              </mat-form-field>
            </mat-grid-tile>
          </mat-grid-list>
          <label>Upload Wine Picture
            <input #imageInput id="imageInput"
              type="file"
              accept="image/*"
              (change)="processFile(imageInput)">
          </label>
          <div>
            <mat-dialog-actions>
              <button mat-raised-button color="primary" [mat-dialog-close]="true" type="submit" [disabled]="!form.valid">Save</button>
              <button mat-button color="warn" mat-dialog-close>Cancel</button>
            </mat-dialog-actions>
          </div>
        </div>
      </mat-dialog-content>
    </form>
  `,
  styleUrls: ['./wine-edit-dialog.component.css'],
})

export class WineEditDialogComponent {

  static height = '500px;';
  static width = '80%';

  clonedWine: Wine;
  referencedWien: Wine;

  years = Constants.getYears();
  wineTypes: Array<string> = Constants.getWineTypes();
  countries: Array<Country> = Constants.getCountries();

  constructor(private wineService: WineService,
              private wineTableDataService: WineTableDataService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.referencedWien = data.dataKey;
    this.clonedWine = this.wineService.cloneWineObject(this.referencedWien, this.clonedWine);
  }

  saveWine(): void {
    if (!this.clonedWine.id) {
      this.wineService.createWine(this.clonedWine).subscribe(value => {
        this.clonedWine.id = value.body;
        this.uploadPicture();
        this.wineTableDataService.reloadData();
      });
    } else {
      this.wineService.updateWine(this.clonedWine).subscribe(value => {
        this.uploadPicture();
        this.wineTableDataService.reloadData();
      });
    }
  }

  processFile(imageInput: HTMLInputElement): void {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.clonedWine.picture = file;
    });

    reader.readAsDataURL(file);
  }

  private uploadPicture(): void {
    if (this.clonedWine.picture) {
      this.wineService.uploadPicture(this.clonedWine.picture, this.clonedWine.id).subscribe(value => {
        this.wineTableDataService.reloadData();
      });
    }
  }
}
