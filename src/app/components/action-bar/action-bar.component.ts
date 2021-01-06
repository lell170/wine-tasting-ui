import { Component, OnInit } from '@angular/core';
import { Wine } from '../../model/wine';
import { DialogService } from '../../service/dialog.service';
import { DialogComponentFactory } from '../../factory/dialogComponentFactory';

@Component({
  selector: 'app-action-bar',
  template: `
    <div class="content_block" id="action_bar">
      <div class="action_item">
        <button mat-icon-button color="primary" (click)="createNewWine()">
          <mat-icon>add_box</mat-icon>
        </button>
      </div>
      <div class="action_item">
        <button mat-icon-button color="primary">
          <mat-icon>camera_alt</mat-icon>
        </button>
      </div>

      <div class="action_item">
        <button mat-icon-button color="primary">
          <mat-icon>text_snippet</mat-icon>
        </button>
      </div>
    </div>`,
  styleUrls: ['./action-bar.component.css']
})
export class ActionBarComponent implements OnInit {

  constructor(private dialogService: DialogService) {
  }

  openCamera(): void {
    this.dialogService.openDialog(DialogComponentFactory.getCameraDialogComponent(), {});
  }

  createNewWine(): void {
    this.dialogService.openDialog(DialogComponentFactory.getWineEditDialogComponent(), new Wine());
  }

  ngOnInit(): void {
  }

}
