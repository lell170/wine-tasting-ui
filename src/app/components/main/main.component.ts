import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-modal #modalComponent></app-modal>
    <app-header #headerComponent
      [wineTableComponent]="wineTableComponent">
    </app-header>
    <app-action-bar #actionBarComponent></app-action-bar>
    <app-wine-table #wineTableComponent
      [modalCompponent]="modalComponent">
    </app-wine-table>
    <app-footer #footerComponent></app-footer>
  `,
  styleUrls: ['./main.component.css']
})

export class MainComponent {

  title = 'Wine Tasting App';

  constructor() {
  }
}
