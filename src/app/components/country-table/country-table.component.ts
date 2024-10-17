import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-country-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './country-table.component.html',
  styleUrl: './country-table.component.css',
})
export class CountryTableComponent {
  @Output() selectCountry = new EventEmitter<any>();
  movies$!: Observable<any>;
  countrySelected: any = null;

  constructor(private _httpClient: HttpClient) {}

  ngOnInit(): void {
    this.movies$ = this._httpClient.get(
      'https://restcountries.com/v3.1/region/South%20America'
    );
  }

  onCountrySelected(movie: any): void {
    this.countrySelected = movie;

    this.selectCountry.emit(movie);
  }
}
