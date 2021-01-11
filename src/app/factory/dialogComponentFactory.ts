import { DialogComponent } from '../components/dialog-components/dialogComponent';
import { CameraDialogComponent } from '../components/dialog-components/camera-component/camera-dialog.component';
import { WineEditDialogComponent } from '../components/dialog-components/wine-edit-dialog/wine-edit-dialog.component';
import { ConfirmDialogComponent } from '../components/dialog-components/confirm-dialog/confirm-dialog.component';

export class DialogComponentFactory {

  public static getCameraDialogComponent(): DialogComponent {
    return new DialogComponent(CameraDialogComponent, '100%', '100%');
  }

  public static getWineEditDialogComponent(): DialogComponent {
    return new DialogComponent(WineEditDialogComponent, '100%', '95%');
  }

  public static getConfirmDialogCompponent(): DialogComponent {
    return new DialogComponent(ConfirmDialogComponent, '15%', '40%');
  }

}
