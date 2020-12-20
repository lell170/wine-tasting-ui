
import {Alert, AlertType} from '../model/alert';

// alerts factory (static method pattern)
export class AlertsFactory {

  public static createWarningAlert(message: string): Alert {
    const alert = new Alert();
    alert.content = message;
    alert.type = AlertType.WARNING;
    return alert;
  }

  public static createInfoAlert(message: string): Alert {
    const alert = new Alert();
    alert.content = message;
    alert.type = AlertType.INFO;
    return alert;
  }

  public static createSuccessAlert(message: string): Alert {
    const alert = new Alert();
    alert.content = message;
    alert.type = AlertType.SUCCESS;
    return alert;
  }

  public static createDangerAlert(message: string): Alert {
    const alert = new Alert();
    alert.content = message;
    alert.type = AlertType.DANGER;
    alert.visible = true;
    return alert;
  }

  public static createHiddenAlert(message: string): Alert {
    const alert = new Alert();
   // alert.content = message;
   // alert.type = AlertType.;
    alert.visible = false;
    return alert;
  }

}
