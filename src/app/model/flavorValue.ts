import { Wine } from './wine';

export class FlavorValue {
  id: number;

  sweetness: number;
  acid: number;
  tannin: number;
  alcohol: number;
  body: number;
  expression: string;

  wine: Wine;
}
