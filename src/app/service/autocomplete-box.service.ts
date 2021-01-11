import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { AutoCompleteBox } from '../model/autoCompleteBox';

@Injectable({
  providedIn: 'root'
})
export class AutocompleteBoxService {

  public loadValues(response: Observable<HttpResponse<any>>, autocompleteBox: AutoCompleteBox): void {
    response.subscribe(value => {
      autocompleteBox.valuesLoaded = Promise.resolve(true);
      autocompleteBox.values = value.body;
    });
  }
}
