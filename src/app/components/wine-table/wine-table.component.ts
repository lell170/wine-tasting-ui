import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { Wine } from '../../model/wine';
import { MatTableDataSource } from '@angular/material/table';
import { WineEditDialogComponent } from '../dialog-components/wine-edit-dialog/wine-edit-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { MatSort } from '@angular/material/sort';
import { WineService } from '../../service/wine.service';
import { WineTableDataService } from '../../service/wine-table-data.service';
import { Constants } from '../../constants';
import { DialogService } from '../../service/dialog.service';

@Component({
  selector: 'app-wine-table',
  template: `
    <div class="content_block">
      <table mat-table [dataSource]="datasource" multiTemplateDataRows matSort>
        <ng-container matColumnDef="id">
          <th mat-header-cell mat-sort-header *matHeaderCellDef [ngClass]="'w-30'">ID</th>
          <td id="{{wine.id}}" mat-cell *matCellDef="let wine" [ngClass]="'w-30'"> {{wine.id}} </td>
        </ng-container>

        <ng-container matColumnDef="countryCode">
          <th mat-header-cell mat-sort-header *matHeaderCellDef [ngClass]="'w-75'">Country</th>
          <td mat-cell *matCellDef="let wine" [ngClass]="'w-75'">
            <img class="country_flag"
              [src]="wine.countryCode !== null ? 'assets/countryFlags/' + wine.countryCode.toLowerCase() + '.svg' : null"
              [alt]="wine.countryCode !== null ? wine.countryCode : 'none'" />
          </td>
        </ng-container>

        <ng-container matColumnDef="picture">
          <th mat-header-cell mat-sort-header *matHeaderCellDef [ngClass]="'w-90'"> Picture</th>
          <td mat-cell *matCellDef="let wine" [ngClass]="'w-90'">
            <img (click)="onImageClick($event.target)"
              [src]="getPicturePath(wine)" [alt]="getPicturePath(wine)" class="wine_picture" /></td>
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

        <ng-container matColumnDef="creationDate">
          <th mat-header-cell mat-sort-header *matHeaderCellDef [ngClass]="'w-150'">Creation Date</th>
          <td mat-cell *matCellDef="let wine">{{wine.creationDate | date:'dd.MM.yyyy HH:mm'}}</td>
        </ng-container>

        <ng-container matColumnDef="changeDate">
          <th mat-header-cell mat-sort-header *matHeaderCellDef [ngClass]="'w-150'"> Change Date</th>
          <td mat-cell *matCellDef="let wine">{{wine.changeDate | date:'dd.MM.yyyy HH:mm'}}</td>
        </ng-container>

        <ng-container matColumnDef="details">
          <th mat-header-cell *matHeaderCellDef>Details</th>
          <td mat-cell *matCellDef="let wine">
            <button mat-icon-button color="primary" class="expand_more">
              <mat-icon class="expand_more">expand_more</mat-icon>
            </button>
          </td>
        </ng-container>

        <ng-container matColumnDef="delete">
          <th mat-header-cell *matHeaderCellDef>Delete</th>
          <td mat-cell *matCellDef="let wine">
            <button mat-icon-button color="primary">
              <mat-icon>delete</mat-icon>
            </button>
          </td>
        </ng-container>

        <ng-container matColumnDef="edit">
          <th mat-header-cell *matHeaderCellDef>Edit</th>
          <td mat-cell *matCellDef="let wine">
            <button mat-icon-button (click)="openEditDialog(wine)">
              <mat-icon>edit</mat-icon>
            </button>
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
          [class.example-expanded-row]="expandedWineObj === wine"
          (click)="expandRow(wine, $event)">
        </tr>
        <tr mat-row *matRowDef="let row; columns: ['expandedDetail']" class="example-detail-row"></tr>
      </table>
    </div>
  `,
  styleUrls: ['./wine-table.component.css']
})
export class WineTableComponent implements AfterViewInit {

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
    public dialogService: DialogService,
  ) {
    this.wineTableDataService.dataSourceSubject.subscribe(value => {
      this.datasource = value;
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
      this.wines.map((wine) => {
        if (wineRow.id === wine.id) {
          wineRow.expanded = !wine.expanded;
        }
        return wine;
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
   * gets path to picture file
   *
   * @param wine obj for which the path will be returnd
   */
  getPicturePath(wine: Wine): string {
    if (wine.pictureFileName === null || wine.pictureFileName === '') {
      return '';
    } else {
      return 'assets/wine_pictures/' + wine.pictureFileName;
    }
  }

  /**
   * opens edit dialog view for given wine
   *
   * @param wine obj for which the edit view will be open
   */
  openEditDialog(wine: Wine): void {
    this.dialogService.openDialog(WineEditDialogComponent, wine, WineEditDialogComponent.width, WineEditDialogComponent.height);
  }

  ngAfterViewInit(): void {
    this.datasource.sort = this.sort;
  }
}
