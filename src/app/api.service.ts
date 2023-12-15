// api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface Currency {
  name: string;
  symbol: string;
}

interface ApiResponse {
  name: {
    common: string;
    official: string;
    nativeName: Record<string, { official: string; common: string }>;
  };
  tld: string[];
  cca2: string;
  ccn3: string;
  cca3: string;
  currencies: Record<string, Currency>;
  capital: string[];
  region: string;
  subregion: string;
  languages: Record<string, string>;
  flag: string;
  population: number;
  latlng: number[];
}


@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'https://restcountries.com/v3.1/all';

  constructor(private http: HttpClient) {}
  

  getCountries(): Observable<ApiResponse[]> {
    return this.http.get<ApiResponse[]>(this.apiUrl);
  }

  getCountryDetails(countryId: string): Observable<ApiResponse | null> {
    return this.http.get<ApiResponse[]>(this.apiUrl).pipe(
      map((response) => {
        const country = response.find((c) => c.cca3 === countryId);
        return country || null;
      })
    );
  }
}
