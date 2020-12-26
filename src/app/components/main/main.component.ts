import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { WineService } from '../../service/wine.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Wine } from '../../model/wine';

@Component({
  selector: 'app-root',
  template: `
    <app-modal #modalComponent></app-modal>
    <app-header #headerComponent
      [dialog]="dialog"
      [wineTableComponent]="wineTableComponent">
    </app-header>
    <app-action-bar #actionBarComponent></app-action-bar>
    <app-wine-table #wineTableComponent
      [dialog]="dialog"
      [datasource]="dataSource"
      [wines]="wines"
      [modalCompponent]="modalComponent">
    </app-wine-table>
    <app-footer #footerComponent></app-footer>
  `,
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {

  @Output() dataSource = new MatTableDataSource();
  @Output() wines: Array<Wine>;
  title = 'Wine Tasting App';

  constructor(private wineService: WineService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.wineService.getAll().subscribe(value => {
      this.wines = value.body;
      console.log(this.wines);
      this.dataSource = new MatTableDataSource(value.body);
      this.dataSource.data = this.wines;
    });
  }
}
