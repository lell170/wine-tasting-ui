import { Country } from './model/country';

export class Constants {

  static getYears(): Array<string> {
    const years = [];
    for (let i = 2000; i < 2020; i++) {
      years.push(i.toString());
    }

    return years;
  }

  static getCountries(): Array<Country> {
    const countries = [];

    countries.push(new Country('DE', 'Germany'));
    countries.push(new Country('IT', 'Italy'));
    countries.push(new Country('ES', 'Spain'));
    countries.push(new Country('FR', 'France'));
    countries.push(new Country('GE', 'Georgia'));

    return countries;
  }

  static getWineTypes(): Array<string> {
    return ['RED', 'WHITE', 'ROSE', 'SPARKLING'];
  }

  static getWineTableColumns(): Array<string> {
    return [
      'id',
      'countryCode',
      'picture',
      'year',
      'name',
      'wineMaker',
      'description',
      'creationDate',
      'changeDate',
      'details',
      'delete',
      'edit'
    ];
  }
}
