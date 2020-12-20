import { HttpHeaders } from '@angular/common/http';

export class HttpHeadersFactory {

  public static getHeaderByContentType(contentType: ContentType): HttpHeaders {
    return new HttpHeaders().set('Content-Type', contentType.toString());
  }

}

export enum ContentType {
  JSON = 'application/json; charset=utf-8',
}
