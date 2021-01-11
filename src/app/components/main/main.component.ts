import { Component } from '@angular/core';
import { User } from '../../model/user';

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <router-outlet></router-outlet>
    </div>
  `,
  styleUrls: ['./main.component.css']
})

export class MainComponent {

  user: User;

  title = 'Wine Tasting App';

  constructor() {
  }
}
