import { Component, OnInit } from '@angular/core';
import { WineEditDialogComponent } from '../dialog-components/wine-edit-dialog/wine-edit-dialog.component';
import { Wine } from '../../model/wine';
import { DialogService } from '../../service/dialog.service';
import { CameraDialogComponent } from '../dialog-components/camera-component/camera-dialog.component';

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
    this.dialogService.openDialog(CameraDialogComponent, {}, CameraDialogComponent.width, CameraDialogComponent.height);
  }

  createNewWine(): void {
    this.dialogService.openDialog(WineEditDialogComponent, new Wine(), WineEditDialogComponent.width, WineEditDialogComponent.height);
  }

  ngOnInit(): void {
  }

}
