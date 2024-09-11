import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountryService } from '../country.service';

@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.css']
})
export class CountryDetailsComponent implements OnInit {
  country: any;

  constructor(private route: ActivatedRoute, private countryService: CountryService) {}

  ngOnInit(): void {
    const countryName = this.route.snapshot.paramMap.get('name');
    this.countryService.getCountries().subscribe(data => {
      this.country = data.find((c: any) => c.name === countryName);
    });
  }
}
