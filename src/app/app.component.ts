// app.component.ts
import { Component, OnInit } from '@angular/core';
import { CountryService } from './country.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class AppComponent implements OnInit {
  countries: any[] = [];
  filteredCountries: any[] = [];
  searchTerm: string = '';
  selectedRegion: string = '';
  isDarkMode: boolean = false;
  selectedCountry: any;

  constructor(private countryService: CountryService) {}

  ngOnInit() {
    this.countryService.getCountries().subscribe((data) => {
      this.countries = data;
      this.filteredCountries = this.countries;
    });
     // Load dark mode preference from local storage
  const darkModePreference = localStorage.getItem('darkMode');
  if (darkModePreference) {
    this.isDarkMode = JSON.parse(darkModePreference);
    document.body.classList.toggle('dark-mode', this.isDarkMode);
  }

  // Load country data
  this.countryService.getCountries().subscribe((data) => {
    this.countries = data;
    this.filteredCountries = this.countries;
  });
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    console.log('Dark mode toggled:', this.isDarkMode); // Debugging log
    document.body.classList.toggle('dark-mode', this.isDarkMode);
    localStorage.setItem('darkMode', JSON.stringify(this.isDarkMode));
  }
  

  filterCountries() {
    this.filteredCountries = this.countries.filter((country) => {
      const matchesSearchTerm = country.name
        .toLowerCase()
        .includes(this.searchTerm.toLowerCase());
      const matchesRegion =
        !this.selectedRegion || country.region === this.selectedRegion;
      return matchesSearchTerm && matchesRegion;
    });
  }

  viewCountryDetails(country: any) {
    this.selectedCountry = {
      ...country,
      languagesString: country.languages.map((lang: any) => lang.name).join(', '),
    };
  }

  goBack() {
    this.selectedCountry = null;
  }
}
