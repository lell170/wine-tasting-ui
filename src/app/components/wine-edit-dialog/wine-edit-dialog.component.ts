import { Component, Inject } from '@angular/core';
import { Wine } from '../../model/wine';
import { WineService } from '../../service/wine.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Country } from '../../model/country';
import { Constants } from '../../constants';

@Component({
  selector: 'app-wine-edit-dialog',
  template: `
    <form novalidate (ngSubmit)="saveWine(form.value)" #form="ngForm">
      <mat-dialog-content class="mat-typography">
        <div id="edit_dialog">
          <h2 mat-dialog-title>Wine Form</h2>
          <mat-grid-list cols="3" rowHeight="65px">
            <mat-grid-tile [colspan]="1" [rowspan]="1">
              <mat-form-field appearance="fill">
                <mat-label>Name</mat-label>
                <input matInput value="" name="name" [ngModel]="wine.name">
              </mat-form-field>
            </mat-grid-tile>
            <mat-grid-tile [colspan]="1" [rowspan]="1">
              <mat-form-field appearance="fill">
                <mat-label>Wine maker</mat-label>
                <input matInput value="" name="wineMaker" [ngModel]="wine.wineMaker">
              </mat-form-field>
            </mat-grid-tile>
            <mat-grid-tile [colspan]="1" [rowspan]="1">
              <mat-form-field appearance="fill">
                <mat-label>Year</mat-label>
                <mat-select name="year" [ngModel]="wine.year">
                  <mat-option *ngFor="let year of years" [value]="year">
                    {{year}}
                  </mat-option>
                </mat-select>
              </mat-form-field>
            </mat-grid-tile>
            <mat-grid-tile [colspan]="1" [rowspan]="1">
              <mat-form-field appearance="fill">
                <mat-label>Country</mat-label>
                <mat-select name="countryCode" [ngModel]="wine.countryCode">
                  <mat-option *ngFor="let country of countries" [value]="country.countryCode">
                    {{country.country}}
                  </mat-option>
                </mat-select>
              </mat-form-field>
            </mat-grid-tile>
            <mat-grid-tile [colspan]="1" [rowspan]="1">
              <mat-form-field appearance="fill">
                <mat-label>Grape</mat-label>
                <input matInput value="" name="grape" [ngModel]="wine.grape">
              </mat-form-field>
            </mat-grid-tile>
            <mat-grid-tile [colspan]="1" [rowspan]="1">
              <mat-form-field appearance="fill">
                <mat-label>Type</mat-label>
                <mat-select name="type" [ngModel]="wine.type">
                  <mat-option *ngFor="let wineType of wineTypes" [value]="wineType">
                    {{wineType}}
                  </mat-option>
                </mat-select>
              </mat-form-field>
            </mat-grid-tile>
            <mat-grid-tile [colspan]="3" [rowspan]="1.5">
              <mat-form-field appearance="fill">
                <mat-label>Description</mat-label>
                <textarea matInput name="description" [ngModel]="wine.description" rows="4"></textarea>
              </mat-form-field>
            </mat-grid-tile>
          </mat-grid-list>
          <label>Upload Wine Picture
            <input #imageInput id="imageInput"
              type="file"
              accept="image/*"
              (change)="processFile(imageInput)"
              name="fileName"></label>
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

  wine: Wine;

  years = Constants.getYears();
  wineTypes: Array<string> = Constants.getWineTypes();
  countries: Array<Country> = Constants.getCountries();

  constructor(private wineService: WineService, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.wine = data.dataKey;
  }

  saveWine(wine: Wine): void {
    // set new values for wine object
    this.wine.name = wine.name;
    this.wine.description = wine.description;
    this.wine.year = wine.year;
    this.wine.type = wine.type;
    this.wine.countryCode = wine.countryCode;
    this.wine.grape = wine.grape;
    this.wine.wineMaker = wine.wineMaker;

    this.wineService.updateOrCreate(this.wine).subscribe();
  }

  processFile(imageInput: HTMLInputElement): void {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.wine.image = file;
    });

    reader.readAsDataURL(file);
  }
}
