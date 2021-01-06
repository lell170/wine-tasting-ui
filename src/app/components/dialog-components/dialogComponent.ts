import { ComponentType } from '@angular/cdk/portal';

export class DialogComponent {
  componentType: ComponentType<any>;
  width: string;
  height: string;

  constructor(componentType: ComponentType<any>, widthSize: string, heightSize: string) {
    this.componentType = componentType;
    this.width = widthSize;
    this.height = heightSize;
  }
}
