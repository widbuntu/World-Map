import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private countryApiUrl = 'https://api.worldbank.org/v2/country';
  private indicatorApiUrl = 'https://api.worldbank.org/v2/country';

  constructor(private http: HttpClient) { }

  getCountryInfo(countryId: string): Observable<any> {
    const url = `${this.countryApiUrl}/${countryId}?format=json`;
    return this.http.get(url).pipe(
      map((data: any) => data[1][0])
    );
  }

  getCountryEmploymentInAgriculture(countryId: string): Observable<any> {
    const url = `${this.indicatorApiUrl}/${countryId}/indicator/SL.AGR.EMPL.ZS?format=json&date=2022`;
    return this.http.get(url).pipe(
      map((data: any) => data[1][0])
    );
  }

  getCountryDetails(countryId: string): Observable<any> {
    return forkJoin({
      countryInfo: this.getCountryInfo(countryId),
      employmentData: this.getCountryEmploymentInAgriculture(countryId)
    }).pipe(
      map(({ countryInfo, employmentData }) => ({
        name: countryInfo.name,
        region: countryInfo.region.value,
        incomeLevel: countryInfo.incomeLevel.value,
        capitalCity: countryInfo.capitalCity,
        lendingType: countryInfo.lendingType.value,
        employmentInAgriculture: employmentData.value ? employmentData.value.toFixed(2) : 'No data available'
      }))
    );
  }
}
