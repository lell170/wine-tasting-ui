import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  public hasLength(someString: string): boolean {
    return !!someString;
  }

}
