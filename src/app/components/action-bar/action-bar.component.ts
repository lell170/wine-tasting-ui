import { Component, OnInit } from '@angular/core';
import { Wine } from '../../model/wine';
import { DialogService } from '../../service/dialog.service';
import { DialogComponentFactory } from '../../factory/dialogComponentFactory';

@Component({
  selector: 'app-action-bar',
  templateUrl: './action-bar.component.html',
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
