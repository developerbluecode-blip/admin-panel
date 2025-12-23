import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Countrys } from '../../models/Country';
import { environment } from '../../../environment';
import { Result } from '../../models/Result';
import { Country } from './country';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private apiUrl = environment.apiBaseUrl + '/Country/CountryList'; // 👈 adjust endpoint

  constructor(private http: HttpClient) {}

getCountries(): Observable<Result<Countrys[]>> {
  return this.http.get<Result<Countrys[]>>(this.apiUrl);
}

createCountry(formData: FormData): Observable<Result<Country>> {
     return this.http.post<Result<Country>>(`${environment.apiBaseUrl}/Country/CreateCountry`, formData);
  }

  updateCountry(formData: FormData) {
  return this.http.put<Result<Country>>(`${environment.apiBaseUrl}/Country/UpdateCountry`, formData);
}


deleteCountry(id: number) {
  return this.http.delete<Result<boolean>>(
    `${environment.apiBaseUrl}/Country/CountryDelete?CountryId=${id}`
  );
}



}