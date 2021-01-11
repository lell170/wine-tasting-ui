import { Component, Input, ViewChild } from '@angular/core';
import { Wine } from '../../model/wine';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { MatSort } from '@angular/material/sort';
import { WineService } from '../../service/wine.service';
import { WineTableDataService } from '../../service/wine-table-data.service';
import { DialogService } from '../../service/dialog.service';
import { DialogComponentFactory } from '../../factory/dialogComponentFactory';
import { PictureService } from '../../service/picture.service';
import { Subject } from 'rxjs';
import { Constants } from '../../service/constants.service';

@Component({
  selector: 'app-wine-table',
  templateUrl: './wine-table.component.html',
  styleUrls: ['./wine-table.component.css']
})
export class WineTableComponent {

  @Input() dialog: MatDialog;
  @Input() modalCompponent: ModalComponent;
  @ViewChild(MatSort) sort: MatSort;

  expandedWineObj: Wine;
  displayedColumns = Constants.getWineTableColumns();
  datasource = new MatTableDataSource<Wine>();
  wines = this.datasource.data;

  constructor(
    private wineService: WineService,
    private wineTableDataService: WineTableDataService,
    public pictureService: PictureService,
    public dialogService: DialogService,
  ) {
    this.wineTableDataService.dataSourceSubject.subscribe(value => {
      this.datasource = value;
      this.datasource.sort = this.sort;
      this.wines = value.data;
    });
    this.wineTableDataService.reloadData();
  }

  /**
   * method to expand and show details of given table row
   *
   * @param wineRow object from the row
   * @param event (javascript click event)
   */
  expandRow(wineRow, event): void {
    if (event.target.className.includes('expand_more')) {
      this.wines.forEach(value => {
        if (wineRow.id === value.id) {
          wineRow.expanded = !value.expanded;
        }
        return value;
      });
    }
  }

  /**
   * click event handler for picture
   * picture will be show full sized in separate modal window
   *
   * @param target EventTarget
   */
  onImageClick(target: EventTarget): void {
    if (target instanceof HTMLImageElement) {
      this.modalCompponent.modalCssDisplay = 'block';
      this.modalCompponent.modalImg.nativeElement.setAttribute('src', target.getAttribute('src'));
    }
  }

  /**
   * search field handler
   *
   * @param value filter string
   */
  doSearchFilter(value: any): void {
    this.datasource.filter = value.value.trim().toLocaleLowerCase();
  }

  /**
   * opens edit dialog view for given wine
   *
   * @param wine obj for which the edit view will be open
   */
  openEditDialog(wine: Wine): void {
    this.dialogService.openDialog(DialogComponentFactory.getWineEditDialogComponent(), wine);
  }

  deleteWine(wine): void {
    const subject = new Subject<boolean>();
    this.dialogService.openDialog(DialogComponentFactory.getConfirmDialogCompponent(), subject);
    subject.subscribe(confirm => {
      if (confirm) {
        this.wineService.deleteWine(wine).subscribe(response => this.wineTableDataService.reloadData());
      }
    });
  }
}
