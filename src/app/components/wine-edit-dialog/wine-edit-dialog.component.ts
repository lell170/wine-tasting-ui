import { Component, Inject } from '@angular/core';
import { Wine } from '../../model/wine';
import { WineService } from '../../service/wine.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Country } from '../../model/country';

@Component({
  selector: 'app-wine-edit-dialog',
  template: `
    <form novalidate (ngSubmit)="saveWine(form.value)" #form="ngForm">
      <mat-dialog-content class="mat-typography">
        <div id="edit_dialog">
          <h2 mat-dialog-title>Weinbeschreibung</h2>
          <mat-grid-list cols="3" rowHeight="65px">
            <mat-grid-tile [colspan]="2" [rowspan]="1">

              <mat-form-field appearance="fill" style="width: 100%">
                <mat-label>Name</mat-label>
                <input matInput value="" name="name" [ngModel]="wine.name" required>
              </mat-form-field>

            </mat-grid-tile>
            <mat-grid-tile [colspan]="1" [rowspan]="1">

              <mat-form-field appearance="fill" style="width: 100%">
                <mat-label>Year</mat-label>
                <mat-select name="year" [ngModel]="wine.year" required>
                  <mat-option *ngFor="let year of years" [value]="year">
                    {{year}}
                  </mat-option>
                </mat-select>
              </mat-form-field>

            </mat-grid-tile>
            <mat-grid-tile [colspan]="1" [rowspan]="1">

              <mat-form-field appearance="fill" style="width: 100%">
                <mat-label>Country</mat-label>
                <mat-select name="countryCode" [ngModel]="wine.countryCode" required>
                  <mat-option *ngFor="let country of countries" [value]="country.countryCode">
                    {{country.country}}
                  </mat-option>
                </mat-select>
              </mat-form-field>

            </mat-grid-tile>
            <mat-grid-tile [colspan]="1" [rowspan]="1">

              <mat-form-field appearance="fill" style="width: 100%">
                <mat-label>Grape</mat-label>
                <input matInput value="" name="grape" [ngModel]="wine.grape" required>
              </mat-form-field>

            </mat-grid-tile>
            <mat-grid-tile [colspan]="1" [rowspan]="1">

              <mat-form-field appearance="fill" style="width: 100%">
                <mat-label>Type</mat-label>
                <mat-select name="type" [ngModel]="wine.type" required>
                  <mat-option *ngFor="let wineType of wineTypes" [value]="wineType">
                    {{wineType}}
                  </mat-option>
                </mat-select>
              </mat-form-field>

            </mat-grid-tile>
            <mat-grid-tile [colspan]="3" [rowspan]="1.5">

              <mat-form-field appearance="fill" style="width: 100%;">
                <mat-label>Description</mat-label>
                <textarea matInput name="description" [ngModel]="wine.description" required rows="4"></textarea>
              </mat-form-field>

            </mat-grid-tile>
          </mat-grid-list>
          <div id="button_panel">
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
  years: Array<string> = new Array<string>();
  countries: Array<Country> = new Array<Country>();
  wineTypes: Array<string> = new Array<string>();

  constructor(private wineService: WineService, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.wine = data.dataKey;

    // fill year select
    for (let i = 2000; i < 2020; i++) {
      this.years.push(i.toString());
    }

    // fill counries
    this.countries.push(new Country('DE', 'Germany'));
    this.countries.push(new Country('IT', 'Italy'));
    this.countries.push(new Country('ES', 'Spain'));
    this.countries.push(new Country('FR', 'France'));
    this.countries.push(new Country('GE', 'Georgia'));

    // fill wine types
    this.wineTypes.push('RED');
    this.wineTypes.push('WHITE');
    this.wineTypes.push('ROSE');
    this.wineTypes.push('SPARKLING');
  }

  saveWine(wine: Wine): void {
    // set new values for wine object
    this.wine.name = wine.name;
    this.wine.description = wine.description;
    this.wine.year = wine.year;
    this.wine.type = wine.type;
    this.wine.countryCode  = wine.countryCode;
    this.wine.grape = wine.grape;

    this.wineService.saveWine(this.wine).subscribe();
  }
}

