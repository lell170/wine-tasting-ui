import { Component, Input } from '@angular/core';
import { PictureService } from '../../service/picture.service';
import { CommonService } from '../../service/common.service';
import { Picture } from '../../model/picture';

@Component({
  selector: 'app-picture',
  templateUrl: './picture.component.html',
  styleUrls: ['./picture.component.css']
})
export class PictureComponent {

  constructor(public pictureService: PictureService, public commonService: CommonService) {
  }

  @Input()
  picture: Picture;

  public processPictureFile(imageInput: HTMLInputElement): void {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      this.picture.srcValue = reader.result;
      this.picture.pictureAsFile = file;
    };

    reader.readAsDataURL(file);
  }
}
