import { AfterViewInit, Component, Input } from '@angular/core';
import { map, startWith } from 'rxjs/operators';
import { AutoCompleteBox } from '../../model/autoCompleteBox';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-autocomplete-box',
  templateUrl: './autocomplete-box.component.html',
  styleUrls: ['./autocomplete-box.component.css']
})
export class AutocompleteBoxComponent implements AfterViewInit {

  @Input()
  autocompleteBox: AutoCompleteBox;

  @Input()
  formGroup: FormGroup;

  ngAfterViewInit(): void {
    this.autocompleteBox.filteredValues = this.autocompleteBox.abstractControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this.valueFilter(value))
      );
  }

  private valueFilter(value: string): string[] {
    const filterValue = value.toLowerCase();
    if (this.autocompleteBox.pageIsLoading) {
      return this.autocompleteBox.values.filter(option => option.toLowerCase().includes(filterValue));
    }
  }
}
