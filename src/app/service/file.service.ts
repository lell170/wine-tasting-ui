import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private httpClient: HttpClient) {
  }

  fileExists(url: string): Observable<boolean> {
    return this.httpClient.get(url)
      .pipe(
        map(response => {
          return true;
        }),
        catchError(error => {
          return of(false);
        })
      );
  }
}
