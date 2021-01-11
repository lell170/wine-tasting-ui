import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-select-list',
  templateUrl: './select-list.component.html',
  styleUrls: ['./select-list.component.css']
})
export class SelectListComponent {

  @Input()
  values: string[];

  @Input()
  controlName: string;

  @Input()
  formGroup: FormGroup;

  @Input()
  valueChangedFunction: (args: any) => void;

  @Input()
  label: string;

  constructor() {
    // default empty function
    this.valueChangedFunction = () => {};
  }

}
