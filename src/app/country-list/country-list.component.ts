// country-list.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

interface Country {
  name: string;
  flag: string;
  population: number;
  region: string;
  capital: string;
}

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  
  styleUrls: ['./country-list.component.css']
})
export class CountryListComponent implements OnInit {
  constructor(private router: Router) {}
  countries: Country[] = [];

  viewCountryDetails(country: any) {
    this.router.navigate(['/country', country.name]);
  }


  ngOnInit(): void {
    this.getCountries().subscribe(data => {
      this.countries = data;
    });
  }

  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>('/assets/countries.json');
  }
}
