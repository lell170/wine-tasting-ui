import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { RestClientService } from './rest-client.service';
import { Observable } from 'rxjs';
import { Wine } from '../model/wine';
import { OpticalValue } from '../model/opticalValue';
import { FlavorValue } from '../model/flavorValue';
import { NoseValue } from '../model/noseValue';
import { Picture } from '../model/picture';

@Injectable({
  providedIn: 'root'
})
export class WineService {

  public static BASE_URL = 'api/wine/';

  constructor(private httpClient: HttpClient, private restClientService: RestClientService) {
  }

  getAll(): Observable<HttpResponse<any>> {
    const httpHeaders = new HttpHeaders();
    httpHeaders.set('Cache-Control', 'no-cache');
    httpHeaders.set('Pragma', 'no-cache');

    const url = WineService.BASE_URL + 'all';
    return this.restClientService.httpGet(url, { observe: 'response', headers: httpHeaders });
  }

  createWine(wine: Wine): Observable<any> {
    const url = WineService.BASE_URL + 'create';
    return this.restClientService.httpPost(url, wine, { observe: 'response' });
  }

  updateWine(wine: Wine): Observable<any> {
    const url = WineService.BASE_URL + 'update/' + wine.id + '/json';
    return this.restClientService.httpPut(url, wine, {});
  }

  cloneWine(from: Wine): Wine {

    const wine = new Wine();

    wine.grape = from.grape;
    if (!from.pictures) {
      wine.pictures = new Array<Picture>(new Picture());
    } else {
      wine.pictures = from.pictures;
    }
    wine.id = from.id;
    wine.winery = from.winery;
    wine.year = from.year;
    wine.countryCode = from.countryCode;
    wine.type = from.type;
    wine.name = from.name;
    wine.description = from.description;
    wine.updated = from.updated;
    wine.created = from.created;
    wine.overallRating = from.overallRating;
    wine.tastingDate = from.tastingDate;

    if (!from.opticalValue) {
      from.opticalValue = new OpticalValue();
    }
    if (!from.noseValue) {
      from.noseValue = new NoseValue();
    }
    if (!from.flavorValue) {
      from.flavorValue = new FlavorValue();
    }
    wine.opticalValue = from.opticalValue;
    wine.noseValue = from.noseValue;
    wine.flavorValue = from.flavorValue;

    return wine;
  }

  deleteWine(wine: Wine): Observable<any> {
    const url = WineService.BASE_URL + 'delete/' + wine.id;
    return this.restClientService.httpDelete(url);
  }
}
