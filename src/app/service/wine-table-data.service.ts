import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { Wine } from '../model/wine';
import { WineService } from './wine.service';

@Injectable({
  providedIn: 'root'
})
export class WineTableDataService {

  dataSourceSubject: Subject<MatTableDataSource<Wine>>;

  constructor(private wineService: WineService) {
    this.dataSourceSubject = new Subject<MatTableDataSource<Wine>>();
  }

  reloadData(): void {
    this.wineService.getAll().subscribe(value => {
      console.log('reload data again');
      console.log(value.body);
      this.dataSourceSubject.next(new MatTableDataSource<Wine>(value.body));
    });
  }
}
