// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { CountryListComponent } from './country-list/country-list.component'; // Make sure to import CountryListComponent

@NgModule({
  declarations: [
    AppComponent,
    CountryListComponent // Ensure CountryListComponent is declared here
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
