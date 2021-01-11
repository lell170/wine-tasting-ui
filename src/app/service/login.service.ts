import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { User } from '../model/user';
import { RestClientService } from './rest-client.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private static BASE_URL = 'api/user/';

  public userBehaviorSubject: BehaviorSubject<User> = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
  public userObservable: Observable<User>;

  constructor(private restClientService: RestClientService) {
    this.userObservable = this.userBehaviorSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.userBehaviorSubject.value;
  }

  login(user: User): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders({ Authorization: this.encodeAuthHeader(user.email, user.password) });
    return this.restClientService.httpGet(LoginService.BASE_URL + 'login', { headers, observe: 'response' });
  }

  logout(): void {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.userBehaviorSubject.next(null);
  }

  encodeAuthHeader(email: string, password: string): string {
    return 'Basic ' + btoa(email + ':' + password);
  }
}
