import { AfterViewInit, Component, Inject, ViewChild } from '@angular/core';
import { Wine } from '../../../model/wine';
import { WineService } from '../../../service/wine.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Country } from '../../../model/country';
import { WineTableDataService } from '../../../service/wine-table-data.service';
import { AbstractControl, FormGroup } from '@angular/forms';
import { PictureService } from '../../../service/picture.service';
import { Constants } from '../../../service/constants.service';
import { CommonService } from '../../../service/common.service';
import { AutoCompleteBox } from '../../../model/autoCompleteBox';
import { AutocompleteBoxService } from '../../../service/autocomplete-box.service';
import { WineColor } from '../../../model/winecolor';
import { SelectListComponent } from '../../dropdown/select-list.component';
import { Picture } from '../../../model/picture';

@Component({
  selector: 'app-wine-edit-dialog',
  templateUrl: './wine-edit-dialog.component.html',
  styleUrls: ['./wine-edit-dialog.component.css'],
})

export class WineEditDialogComponent implements AfterViewInit {

  grapesAutocompleteBox: AutoCompleteBox = new AutoCompleteBox();
  wineriesAutocompleteBox: AutoCompleteBox = new AutoCompleteBox();

  wine: Wine = new Wine();
  picture: Picture = new Picture();

  wineFormGroup: FormGroup;
  opticalValueFormGroup: FormGroup;
  noseValueFormGroup: FormGroup;
  flavorValueFormGroup: FormGroup;

  // Constants
  countries: Array<Country> = Constants.getCountries();
  wineColors: Array<WineColor> = Constants.getWineColorsList();

  wineEditFields: { [key: string]: AbstractControl; } = Constants.getWineEditFields();
  opticalValueFields: { [key: string]: AbstractControl; } = Constants.getWineOpticalFields();
  noseValueFields: { [key: string]: AbstractControl; } = Constants.getWineNoseFields();
  flavorValueFields: { [key: string]: AbstractControl; } = Constants.getWineFlavorFields();

  pageIsLoading: boolean;

  @ViewChild('colorsComponent') colorsComponent: SelectListComponent;

  wineTypeChanged = (wineType: any): void => {
    const colors = this.getColorsByWineType(wineType);
    if (colors) {
      this.colorsComponent.values = colors;
    }
  }

  constructor(private wineService: WineService,
              public constantsService: Constants,
              private wineTableDataService: WineTableDataService,
              public pictureService: PictureService, private autocompleteBoxService: AutocompleteBoxService,
              public commonServce: CommonService,
              @Inject(MAT_DIALOG_DATA) public data: any) {

    this.pageIsLoading = true;

    this.wine = this.wineService.cloneWine(data.dataKey);
    this.picture.wine = this.wine;

    // set picture src value if available
    if (!!this.pictureService.getPictureAsBase64(this.wine)) {
      this.picture.srcValue = this.pictureService.getPictureAsBase64(this.wine);
    }

    // create form groups and assign fields to object
    this.wineFormGroup = new FormGroup(this.wineEditFields);
    this.wineFormGroup.patchValue(this.wine);

    this.opticalValueFormGroup = new FormGroup(this.opticalValueFields);
    this.opticalValueFormGroup.patchValue(this.wine.opticalValue);

    this.noseValueFormGroup = new FormGroup(this.noseValueFields);
    this.noseValueFormGroup.patchValue(this.wine.noseValue);

    this.flavorValueFormGroup = new FormGroup(this.flavorValueFields);
    this.flavorValueFormGroup.patchValue(this.wine.flavorValue);

    // init autocomplete fields
    this.grapesAutocompleteBox.title = 'Grape';
    this.grapesAutocompleteBox.formControlName = 'grape';
    this.grapesAutocompleteBox.abstractControl = this.wineFormGroup.controls.grape;
    this.grapesAutocompleteBox.pageIsLoading = this.pageIsLoading;

    this.wineriesAutocompleteBox.title = 'Winery';
    this.wineriesAutocompleteBox.formControlName = 'winery';
    this.wineriesAutocompleteBox.abstractControl = this.wineFormGroup.controls.winery;
    this.wineriesAutocompleteBox.pageIsLoading = this.pageIsLoading;

    this.autocompleteBoxService.loadValues(constantsService.getGrapes(), this.grapesAutocompleteBox);
    this.autocompleteBoxService.loadValues(constantsService.getWineries(), this.wineriesAutocompleteBox);
  }

  ngAfterViewInit(): void {
    this.pageIsLoading = false;
  }

  public saveWine(): void {
    // assign new valeus to object
    Object.assign(this.wine, this.wineFormGroup.value);

    // set picture to wine obj
    this.pictureService.setPictureToWine(this.wine, this.picture.pictureAsFile, this.picture.srcValue);

    this.wine.opticalValue = this.opticalValueFormGroup.value;
    this.wine.noseValue = this.noseValueFormGroup.value;
    this.wine.flavorValue = this.flavorValueFormGroup.value;

    if (!this.wine.id) {
      this.wineService.createWine(this.wine).subscribe(value => {
        this.wine.id = value.body;
        this.updatePicture();
        this.wineTableDataService.reloadData();
      });
    } else {
      this.wineService.updateWine(this.wine).subscribe(() => {
        this.updatePicture();
        this.wineTableDataService.reloadData();
      });
    }
  }

  private updatePicture(): void {
    if (this.wine.pictures && this.wine.pictures[0]) {
      this.pictureService.updatePictures(this.wine);
    }
  }

  public setWineColors(wine: Wine): string[] {
    if (wine && wine.type) {
      return this.getColorsByWineType(wine.type);
    } else {
      return this.wineColors[0].colors;
    }
  }

  private getColorsByWineType(wineType: string): string[] {
    return this.wineColors.find(value1 => value1.wineType === wineType).colors;
  }
}
