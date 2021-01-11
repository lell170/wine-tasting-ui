import { Observable } from 'rxjs';
import { AbstractControl } from '@angular/forms';

export class AutoCompleteBox {
  values: Array<string>;
  filteredValues: Observable<string[]>;
  valuesLoaded: Promise<boolean>;
  title: string;
  formControlName: string;
  abstractControl: AbstractControl;
  pageIsLoading: boolean;
}
