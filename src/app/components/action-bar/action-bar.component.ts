import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-action-bar',
  template: `
    <div class="content_block" id="action_bar" [class.mat-elevation-z8]=true>
      <div style="float: left; margin: 3px 3px 0 3px"><img src="assets/add.png" width="26px" height="26px" alt="add" /></div>
      <div style="float: left; margin: 3px 3px 0 3px"><img src="assets/add_camera.png" width="24px" height="25px" alt="make_foto" /></div>
    </div>`,
  styleUrls: ['./action-bar.component.css']
})
export class ActionBarComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}
