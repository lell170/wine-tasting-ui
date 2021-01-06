import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../components/dialog-components/dialogComponent';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(public dialog: MatDialog) {
  }

  openDialog(component: DialogComponent, obj: any): void {
    const dialogRef = this.dialog.open(component.componentType, {
      width: component.width,
      height: component.height,
      data: {
        dataKey: obj
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('some debug infos...');
    });
  }
}
