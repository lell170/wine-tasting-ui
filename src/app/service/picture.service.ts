import { Injectable } from '@angular/core';
import { Wine } from '../model/wine';
import { Picture } from '../model/picture';
import { WineService } from './wine.service';
import { RestClientService } from './rest-client.service';
import { WineTableDataService } from './wine-table-data.service';

@Injectable({
  providedIn: 'root'
})
export class PictureService {

  constructor(private wineService: WineService, private restClientService: RestClientService, private wineTableDataService: WineTableDataService) {
  }

  /**
   * gets path to picture file
   *
   * @param wine obj for which the path will be returnd
   */
  public getPicturePath(wine: Wine): string {
    if (wine.pictures && wine.pictures[0]) {
      if (wine.pictures && wine.pictures[0] === null || wine.pictures[0].fileName === '') {
        return '';
      } else {
        return 'assets/wine_pictures/' + wine.pictures[0].fileName;
      }
    }
  }

  public getPictureAsBase64(wine: Wine): string {
    if (wine.pictures[0] && wine.pictures[0].pictureAsBase64) {
      return 'data:image/jpeg;base64,' + wine.pictures[0].pictureAsBase64;
    }
    return '';
  }

  public getPictureFileName(wine: Wine): string {
    if (wine.pictures[0] && wine.pictures[0].fileName) {
      return wine.pictures[0].fileName;
    }
    return '';
  }

  public convertBase64ToFile(base64, filename): File {

    const arr = base64.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }

  public setPictureToWine(wine: Wine, picture: File, srcValue: string | ArrayBuffer): void {
    if (srcValue && !picture) {
      wine.pictures = [new Picture()];
      wine.pictures[0].pictureAsFile = this.convertBase64ToFile(srcValue, 'tmp.jpg');
    }

    if (picture) {
      wine.pictures = [new Picture()];
      wine.pictures[0].pictureAsFile = picture;
    }
  }

  public updatePictures(wine: Wine): void {
    if (wine.pictures && wine.pictures[0] && wine.id) {
      const picture = wine.pictures[0];
      const pictureAsFile = this.getPictureAsFile(picture);
      if (pictureAsFile) {
        const url = WineService.BASE_URL + 'update/' + wine.id + '/picture';
        const formData = new FormData();
        formData.append('pictureFile', picture.pictureAsFile);

        this.restClientService.httpPut(url, formData, {
          observe: 'response',
          responseType: 'text',
          widthCredentials: true
        }).subscribe(value => {
          this.wineTableDataService.reloadData();
        });
      }
    }
  }

  private getPictureAsFile(picture: Picture): File {
    if (picture && picture.pictureAsFile) {
      return picture.pictureAsFile;
    }
  }
}
