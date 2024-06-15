import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  constructor(private http: HttpClient) {}

  fetchCountryData(countryId: string): Observable<any> {
    const countryApiUrl = `https://api.worldbank.org/v2/country/${countryId}?format=json`;
    const indicatorApiUrl = `https://api.worldbank.org/v2/country/${countryId}/indicator/SL.AGR.EMPL.ZS?format=json&date=2022`;

    return forkJoin([
      this.http.get(countryApiUrl),
      this.http.get(indicatorApiUrl)
    ]);
  }
}
