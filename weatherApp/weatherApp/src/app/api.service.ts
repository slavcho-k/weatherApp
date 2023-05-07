import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WeatherData } from './weather';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly API_KEY = '57ef66e323d346abbb6152521230705';
  private readonly BASE_URL = 'http://api.weatherapi.com/v1';

  constructor(private http: HttpClient) {}

  fetchData(city: string): Observable<WeatherData> {
    const url = `${this.BASE_URL}/current.json?key=${this.API_KEY}&q=${city}`;
    return this.http.get<WeatherData>(url);
  }
}
