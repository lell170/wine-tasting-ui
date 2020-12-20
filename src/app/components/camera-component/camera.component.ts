import { Component, OnInit, ViewChild } from '@angular/core';
import { WebcamComponent, WebcamImage, WebcamInitError } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-camera-component',
  template: `
    <div style="text-align:center">
      <div>
        <webcam #webcam [height]="500" [width]="500" [trigger]="triggerObservable" (imageCapture)="handleImage($event)" *ngIf="showWebcam"
          [videoOptions]="videoOptions"
          [imageQuality]="1"
          (initError)="handleInitError($event)"
          (click)="triggerSnapshot()"
        ></webcam>
        <div class="snapshot" *ngIf="webcamImage" (click)="triggerSnapshot()">
          <img [src]="webcamImage.imageAsDataUrl" alt="" />
        </div>
        <br />
        <button mat-raised-button color="primary" (click)="triggerSnapshot()" *ngIf="!webcamImage">Make picture</button>
        <button mat-raised-button color="accent" mat-dialog-close (click)="closeWebcam()" *ngIf="webcamImage">Save picture and create new Item</button>
        <button mat-raised-button (click)="triggerSnapshot()" *ngIf="webcamImage">Retake</button>
        <button mat-raised-button mat-dialog-close (click)="closeWebcam()">Close Webcam</button>
        <br />
      </div>
    </div>

    <h4 *ngIf="errors.length > 0">Messages:</h4>
    <ul *ngFor="let error of errors">
      <li>{{error | json}}</li>
    </ul>
  `,
  styleUrls: ['./camera.component.css']
})
export class CameraComponent implements OnInit {
  public showWebcam = true;
  public deviceId: string;
  public videoOptions: MediaTrackConstraints = {
    // width: {ideal: 1024},
    // height: {ideal: 576}
  };
  public errors: WebcamInitError[] = [];
  public webcamImage: WebcamImage = null;
  private trigger: Subject<void> = new Subject<void>();
  private nextWebcam: Subject<boolean | string> = new Subject<boolean | string>();

  @ViewChild('webcam') webcam: WebcamComponent;

  constructor(public dialogRef: MatDialogRef<CameraComponent>) {
  }

  public triggerSnapshot(): void {
    if (!this.showWebcam) {
      this.showWebcam = true;
      this.webcamImage = null;
    } else {
      this.showWebcam = !this.showWebcam;
      this.trigger.next();
    }
  }

  public closeWebcam(): void {
    this.showWebcam = false;
    this.dialogRef.close();
  }

  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }

  public handleImage(webcamImage: WebcamImage): void {
    console.log('received webcam image', webcamImage);
    this.webcamImage = webcamImage;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<boolean | string> {
    return this.nextWebcam.asObservable();
  }

  public ngOnInit(): void {

  }
}
