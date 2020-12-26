import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
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
    return this.restClientService.httpGet(WineService.BASE_URL + 'all', { observe: 'response' });
  }

  // tslint:disable-next-line:ban-types
  updateOrCreate(wine: Wine): Observable<HttpResponse<any>> {
    const formData = new FormData();
    formData.append('image', wine.image);
    formData.append('wineDtoAsString', JSON.stringify(wine));

    // const jsonType = HttpHeadersFactory.getHeaderByContentType(ContentType.JSON);
    return this.restClientService.httpPost(WineService.BASE_URL + 'updateOrCreate', formData, { observe: 'response' });
  }
}
