import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  countryInfo: any;

  displayCountryInfo(data: any): void {
    const { countryData, indicatorData, event } = data;
    const employmentInAgriculture = indicatorData.value ? indicatorData.value.toFixed(2) : 'No data available';

    this.countryInfo = {
      name: countryData.name,
      region: countryData.region.value,
      incomeLevel: countryData.incomeLevel.value,
      capitalCity: countryData.capitalCity,
      lendingType: countryData.lendingType.value,
      employmentInAgriculture
    };
  }
}
