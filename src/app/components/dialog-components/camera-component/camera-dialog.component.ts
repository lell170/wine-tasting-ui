import { Component, OnInit, ViewChild } from '@angular/core';
import { WebcamComponent, WebcamImage, WebcamInitError } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogComponentFactory } from '../../../factory/dialogComponentFactory';
import { Wine } from '../../../model/wine';
import { DialogService } from '../../../service/dialog.service';
import { Picture } from '../../../model/picture';

@Component({
  selector: 'app-camera-component',
  templateUrl: './camera-dialog.component.html',
  styleUrls: ['./camera-dialog.component.css']
})

export class CameraDialogComponent {

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

  constructor(public dialogRef: MatDialogRef<CameraDialogComponent>, private dialogService: DialogService) {
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

  public createWine(): void {
    this.dialogRef.close();
    const wine = new Wine();
    const picture = new Picture();
    picture.pictureAsBase64 = this.webcamImage.imageAsBase64;
    wine.pictures.push(picture);
    this.dialogService.openDialog(DialogComponentFactory.getWineEditDialogComponent(), wine);
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


}
