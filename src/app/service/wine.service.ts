import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { RestClientService } from './rest-client.service';
import { Observable } from 'rxjs';
import { Wine } from '../model/wine';

@Injectable({
  providedIn: 'root'
})
export class WineService {

  private static BASE_URL = 'http://localhost/api/wine/';

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

  cloneWineObject(from: Wine, to: Wine): Wine {
    if (!to) {
      to = new Wine();
    }
    to.grape = from.grape;
    to.pictureFileName = from.pictureFileName;
    to.id = from.id;
    to.wineMaker = from.wineMaker;
    to.year = from.year;
    to.countryCode = from.countryCode;
    to.type = from.type;
    to.name = from.name;
    to.description = from.description;
    to.changeDate = from.changeDate;
    to.creationDate = from.creationDate;
    to.picture = from.picture;

    return to;
  }

  uploadPicture(picture: File, wineId: number): Observable<HttpResponse<any>> {
    const url = WineService.BASE_URL + 'update/' + wineId + '/picture';
    const formData = new FormData();
    formData.append('pictureFile', picture);

    return this.restClientService.httpPut(url, formData, { observe: 'response', responseType: 'text' });
  }
}
