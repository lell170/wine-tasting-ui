import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../../service/login.service';
import { User } from '../../model/user';
import { Router } from '@angular/router';
import { WineTableComponent } from '../wine-table/wine-table.component';

@Component({
  selector: 'app-header',
  template: `
    <div id="header">
      <div>
        <img src="assets/logo.png" alt="logo" id="logo">
      </div>
      <div (click)="logout()" class="logout">
        <div id="logout_link">Logout</div>
        <div *ngIf="user">
          {{user.email}}
        </div>
      </div>
      <div id="filter_field">
        <mat-form-field>
          <input matInput type="text" placeholder="Filter" (keyup)="wineTableComponent.doSearchFilter($event.target)">
        </mat-form-field>
      </div>
    </div>
  `,
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() wineTableComponent: WineTableComponent;

  user: User;

  constructor(private http: HttpClient, private loginService: LoginService, private router: Router) {
    loginService.userBehaviorSubject.subscribe(value => {
      this.user = value;
    });
  }

  ngOnInit(): void {
  }

  logout(): void {
    // this.http.get('/api/user/logout').subscribe();
    localStorage.removeItem('currentUser');
    this.loginService.userBehaviorSubject.next(null);
    this.router.navigate(['/login']);
  }

}
