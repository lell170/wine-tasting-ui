import { OpticalValue } from './opticalValue';
import { NoseValue } from './noseValue';
import { FlavorValue } from './flavorValue';
import { Picture } from './picture';

export class Wine {
  id: number;
  name: string;
  pictures: Array<Picture>;
  created: Date;
  updated: Date;
  expanded: boolean;
  description: string;
  year: string;
  countryCode: string;
  type: string;
  grape: string;
  winery: string;
  overallRating: string;
  tastingDate: Date;

  opticalValue: OpticalValue;
  noseValue: NoseValue;
  flavorValue: FlavorValue;

  // some default values for avoid null
  constructor() {
    this.pictures = new Array<Picture>();
    this.opticalValue = new OpticalValue();
    this.noseValue = new NoseValue();
    this.flavorValue = new FlavorValue();
  }
}
