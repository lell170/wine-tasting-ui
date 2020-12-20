import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Alert } from '../model/alert';
import { AlertsFactory } from '../factory/alertsFactory';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  subject: Subject<Alert> = new Subject<Alert>();

  hideAlert(): void {
    this.subject.next(AlertsFactory.createHiddenAlert(''));
  }
}
