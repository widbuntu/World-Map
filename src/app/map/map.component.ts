import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit {
  countryInfo: any = null;
  currentCountryId: string | null = null;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.fetchSvgMap();
  }

  fetchSvgMap(): void {
    fetch('/assets/world.svg')
      .then(response => response.text())
      .then(svgText => {
        const svgContainer = document.getElementById('svg-container');
        if (svgContainer) {
          svgContainer.innerHTML = svgText;
          const svgElement = svgContainer.querySelector('svg');

          if (svgElement) {
            // Add event listeners to country elements
            svgElement.querySelectorAll<SVGPathElement | SVGPolygonElement | SVGCircleElement>('path, polygon, circle').forEach(country => {
              country.addEventListener('mouseover', (event) => {
                const countryId = country.getAttribute('id')?.toLowerCase();
                if (countryId && countryId !== this.currentCountryId) {
                  this.currentCountryId = countryId;
                  this.fetchCountryData(countryId);
                }
              });
            });
          }
        }
      })
      .catch(error => {
        console.error('Error fetching SVG map:', error);
      });
  }

  fetchCountryData(countryId: string): void {
    this.apiService.getCountryDetails(countryId).subscribe(
      data => {
        this.countryInfo = data;
      },
      error => {
        console.error('Error fetching country details:', error);
      }
    );
  }

  ngAfterViewInit() {
    document.addEventListener('mouseover', (event) => {
      const target = event.target as Element | null;
      if (!target || !target.closest('path, polygon, circle')) {
        this.currentCountryId = null;
      }
    });
  }
}
