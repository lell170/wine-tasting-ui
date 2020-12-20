export class Alert {
  private _content: string;
  private _type: AlertType;
  private _visible: boolean;

  constructor() {
    this._content = 'Alert is triggered';
    this._type = AlertType.INFO;
    this._visible = false;
  }

  get content(): string {
    return this._content;
  }

  set content(value: string) {
    this._content = value;
  }

  get type(): AlertType {
    return this._type;
  }

  set type(value: AlertType) {
    this._type = value;
  }

  get visible(): boolean {
    return this._visible;
  }

  set visible(value: boolean) {
    this._visible = value;
  }
}

export enum AlertType {
  PRIMARY = "alert alert-primary",
  SECONDARY = "alert alert-secondary",
  SUCCESS = "alert alert-success",
  DANGER = "alert alert-danger",
  WARNING = "alert alert-warning",
  INFO = "alert alert-info"
}
