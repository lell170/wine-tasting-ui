import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { RestClientService } from './rest-client.service';
import { Observable } from 'rxjs';
import { AbstractControl, FormControl } from '@angular/forms';
import { Country } from '../model/country';
import { WineColor } from '../model/winecolor';

@Injectable({
  providedIn: 'root'
})
export class Constants {

  private static BASE_URL = 'api/constants/';

  constructor(private restClientService: RestClientService) {
  }

  static getWineEditFields(): { [key: string]: AbstractControl; } {
    return {
      name: new FormControl(),
      pictureFileName: new FormControl(),
      description: new FormControl(),
      year: new FormControl(),
      countryCode: new FormControl(),
      type: new FormControl(),
      grape: new FormControl(),
      winery: new FormControl(),
      picture: new FormControl(),
      overallRating: new FormControl(),
      tastingDate: new FormControl()
    };
  }

  static getWineFlavorFields(): { [key: string]: AbstractControl; } {
    return {
      sweetness: new FormControl(),
      acid: new FormControl(),
      tannin: new FormControl(),
      alcohol: new FormControl(),
      body: new FormControl(),
      expression: new FormControl(),
      id: new FormControl()
    };
  }

  static getWineNoseFields(): { [key: string]: AbstractControl; } {
    return {
      intensity: new FormControl(),
      growth: new FormControl(),
      expression: new FormControl(),
      id: new FormControl()
    };
  }

  static getWineOpticalFields(): { [key: string]: AbstractControl; } {
    return {
      clarity: new FormControl(),
      intensity: new FormControl(),
      color: new FormControl(),
      id: new FormControl()
    };
  }

  static getWineColorsList(): Array<WineColor> {
    const redWineColors = new WineColor('RED', ['Granatrot', 'Ziegelrot', 'Purpurrot', 'Kirschrot', 'Rubinrot', 'Schwarzrot']);
    const whiteWineColors = new WineColor('WHITE', ['Glanzhell', 'Strohgelb', 'Zitronengelb', 'Gelbgrün', 'Goldgelb', 'Altgolden', 'Bernsteingelb', 'Mahagoni']);
    const roseWineColors = new WineColor('ROSE', ['Hellrose', 'Pink', 'Lachsfarbig', 'Orange']);

    return [redWineColors, whiteWineColors, roseWineColors];
  }

  static getExpressions(): Array<string> {
    return ['Früchte', 'Blumen', 'Gemüse', 'Kräuter', 'Gewürze', 'Holz'];
  }

  static getCountries(): Array<Country> {
    const countries = [];

    countries.push(new Country('DE', 'Germany'));
    countries.push(new Country('IT', 'Italy'));
    countries.push(new Country('ES', 'Spain'));
    countries.push(new Country('FR', 'France'));
    countries.push(new Country('GE', 'Georgia'));

    return countries;
  }

  static getWineTableColumns(): Array<string> {
    return [
      'id',
      'countryCode',
      'picture',
      'year',
      'name',
      'winery',
      'description',
      'tastingDate',
      'details',
      'delete',
      'edit'
    ];
  }

  public getYears(): Array<string> {
    const years = [];
    for (let i = 2020; i > 2000; i--) {
      years.push(i.toString());
    }

    return years;
  }

  public getWineTypes(): Array<string> {
    return ['RED', 'WHITE', 'ROSE'];
  }

  public getColorClarityOptions(): Array<string> {
    return ['Klar', 'Trüb'];
  }

  public getNoseClarityOptions(): Array<string> {
    return ['Sauber', 'Fehlerhaft'];
  }

  public getNoseGrowth(): Array<string> {
    return ['jugendlich', 'in der Entwicklung', 'entwickelt', 'auf dem Höhepunkt', 'Höhepunkt überschritten', 'hinüber'];
  }

  getGrapes(): Observable<HttpResponse<any>> {
    return this.restClientService.httpGet(Constants.BASE_URL + 'grapes', { observe: 'response' });
  }

  getWineries(): Observable<HttpResponse<any>> {
    return this.restClientService.httpGet(Constants.BASE_URL + 'wineries', { observe: 'response' });
  }
}
