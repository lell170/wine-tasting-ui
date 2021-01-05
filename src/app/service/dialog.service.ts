import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/portal';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(public dialog: MatDialog) {
  }

  // TODO: pass height and width per inheritance or generics design!
  openDialog(component: ComponentType<any>, obj: any, widthSize: string, heightSize: string): void {
    const dialogRef = this.dialog.open(component, {
      width: widthSize,
      height: heightSize,
      data: {
        dataKey: obj
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('some debug infos...');
    });
  }
}
