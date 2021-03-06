import { Component } from '@angular/core';
// @ts-ignore
import { version } from '../../../../package.json';

@Component({
  selector: 'app-footer',
  template: `
    <div class="footer">
      <p>Wine-Tasting App. Version {{version}}</p>
    </div>`,
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  version: string = version;

}
