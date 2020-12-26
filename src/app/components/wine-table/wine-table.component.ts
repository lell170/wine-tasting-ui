import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { Wine } from '../../model/wine';
import { MatTableDataSource } from '@angular/material/table';
import { WineEditDialogComponent } from '../wine-edit-dialog/wine-edit-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-wine-table',
  template: `
    <div class="content_block">
      <table mat-table [dataSource]="datasource" multiTemplateDataRows matSort class="mat-elevation-z8">
        <ng-container matColumnDef="id">
          <th mat-header-cell mat-sort-header *matHeaderCellDef [ngClass]="'w-30'">ID</th>
          <td id="{{wine.id}}" mat-cell *matCellDef="let wine" [ngClass]="'w-30'"> {{wine.id}} </td>
        </ng-container>

        <ng-container matColumnDef="countryCode">
          <th mat-header-cell mat-sort-header *matHeaderCellDef [ngClass]="'w-75'">Country</th>
          <td mat-cell *matCellDef="let wine" [ngClass]="'w-75'">
            <img
              [src]="wine.countryCode !== null ? 'assets/countryFlags/' + wine.countryCode.toLowerCase() + '.svg' : null"
              [alt]="wine.countryCode !== null ? wine.countryCode : 'none'"
              style="width: 50px; height: 50px;" />
          </td>
        </ng-container>

        <ng-container matColumnDef="picture">
          <th mat-header-cell mat-sort-header *matHeaderCellDef [ngClass]="'w-90'"> Picture</th>
          <td mat-cell *matCellDef="let wine" [ngClass]="'w-90'">
            <img (click)="onImageClick($event.target)"
              src="assets/wine_pictures/{{wine.fileName}}" alt="foto"
              style="max-width: 80px;" /></td>
        </ng-container>

        <ng-container matColumnDef="year">
          <th mat-header-cell mat-sort-header *matHeaderCellDef [ngClass]="'w-75'">Year</th>
          <td mat-cell *matCellDef="let wine" [ngClass]="'w-75'">{{wine.year}}</td>
        </ng-container>

        <ng-container matColumnDef="name">
          <th mat-header-cell mat-sort-header *matHeaderCellDef>Name</th>
          <td mat-cell *matCellDef="let wine">{{wine.name}}</td>
        </ng-container>

        <ng-container matColumnDef="wineMaker">
          <th mat-header-cell mat-sort-header *matHeaderCellDef>Wine maker</th>
          <td mat-cell *matCellDef="let wine">{{wine.wineMaker}}</td>
        </ng-container>

        <ng-container matColumnDef="description">
          <th mat-header-cell mat-sort-header *matHeaderCellDef>Description</th>
          <td mat-cell *matCellDef="let wine">{{wine.description}}</td>
        </ng-container>

        <ng-container matColumnDef="importDate">
          <th mat-header-cell mat-sort-header *matHeaderCellDef [ngClass]="'w-150'">Import Date</th>
          <td mat-cell *matCellDef="let wine">{{wine.importDate | date:'dd.MM.yyyy HH:mm'}}</td>
        </ng-container>

        <ng-container matColumnDef="changeDate">
          <th mat-header-cell mat-sort-header *matHeaderCellDef [ngClass]="'w-150'"> Change Date</th>
          <td mat-cell *matCellDef="let wine">{{wine.changeDate | date:'dd.MM.yyyy HH:mm'}}</td>
        </ng-container>

        <ng-container matColumnDef="action">
          <th mat-header-cell mat-sort-header *matHeaderCellDef>Action</th>
          <td mat-cell *matCellDef="let wine">
            <button mat-raised-button color="primary" (click)="openEditDialog(wine)">Edit</button>
          </td>
        </ng-container>
        <!-- Expanded Content Column - The detail row is made up of this one column that spans across all columns -->
        <ng-container matColumnDef="expandedDetail">
          <td mat-cell *matCellDef="let wine" [attr.colspan]="displayedColumns.length" style="padding: 0">
            <app-wine-details-view [wine]="wine"></app-wine-details-view>
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr id="expanded_{{wine.id}}" mat-row *matRowDef="let wine; columns: displayedColumns;"
          class="example-element-row"
          [class.example-expanded-row]="expandedElement === wine"
          (click)="expandRow(wine, $event)">
        </tr>
        <tr mat-row *matRowDef="let row; columns: ['expandedDetail']" class="example-detail-row"></tr>
      </table>
    </div>
  `,
  styleUrls: ['./wine-table.component.css']
})
export class WineTableComponent implements AfterViewInit {

  displayedColumns = ['id', 'countryCode', 'picture', 'year', 'name', 'wineMaker', 'description', 'importDate', 'changeDate', 'action'];
  expandedElement: Wine | null;

  @Input() dialog: MatDialog;
  @Input() wines: Array<Wine>;
  @Input() datasource: MatTableDataSource<any>;
  @Input() modalCompponent: ModalComponent;

  @ViewChild(MatSort) sort: MatSort;

  constructor() {
  }

  /**
   * method for opening edit view for selected wine
   *
   * @param wine to edit
   */
  openEditDialog(wine: Wine): void {
    const dialogRef = this.dialog.open(WineEditDialogComponent, {
      width: '100%',
      data: {
        dataKey: wine
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('some debug infos...');
    });
  }

  /**
   * method to expand and show details of table row
   *
   * @param wineRow object from the row
   * @param event (javascript click event)
   */
  expandRow(wineRow, event): void {
    if (event.target.tagName !== 'IMG' && !event.target.className.includes('button')) {
      this.wines.map((wine) => {
        if (wineRow.id === wine.id) {
          wineRow.expanded = !wine.expanded;
        }
        return wine;
      });
    }
  }

  /**
   * handler for on image click event
   * image will be show as full size in separate modal window
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
   * search filter field method
   *
   * @param value filter string
   */
  doSearchFilter(value: any): void {
    this.datasource.filter = value.value.trim().toLocaleLowerCase();
  }

  ngAfterViewInit(): void {
    this.datasource.sort = this.sort;
  }

}
