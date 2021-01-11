import { Wine } from './wine';

export class Picture {
  id: number;
  fileName: string;
  wine: Wine;
  pictureAsFile: File;
  pictureAsBase64: string;
  srcValue: string | ArrayBuffer;
  
  constructor() {
    this.wine = new Wine();
  }
}
