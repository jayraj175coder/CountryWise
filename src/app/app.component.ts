// app.component.ts
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CountryService } from './country.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
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

  constructor(
    private countryService: CountryService,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Load the dark mode setting from localStorage if available
      const storedTheme = localStorage.getItem('darkMode');
      this.isDarkMode = storedTheme === 'true';
      this.applyDarkMode(this.isDarkMode);
    }

    // Fetch country data
    this.countryService.getCountries().subscribe((data) => {
      this.countries = data;
      this.filteredCountries = this.countries;
    });
  }

  toggleDarkMode() {
    if (isPlatformBrowser(this.platformId)) {
      this.isDarkMode = !this.isDarkMode;
      localStorage.setItem('darkMode', this.isDarkMode.toString());
      this.applyDarkMode(this.isDarkMode);
    }
  }

  // Apply or remove dark mode class based on the state
  applyDarkMode(isDark: boolean) {
    if (isDark) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
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
