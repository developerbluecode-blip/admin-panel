import { ComponentFixture, TestBed } from '@angular/core/testing';

import { City } from './city';
import { environment } from '../../../environment';
import { Observable } from 'rxjs';
import { Result } from '../../models/Result';
import { Citys } from '../../models/City';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  private apiUrl = environment.apiBaseUrl + '/City/CityList'; // 👈 adjust endpoint

  constructor(private http: HttpClient) {}

getCitys(): Observable<Result<Citys[]>> {
  return this.http.get<Result<Citys[]>>(this.apiUrl);
}

createCity(formData: FormData): Observable<Result<City>> {
     return this.http.post<Result<City>>(`${environment.apiBaseUrl}/City/CreateCity`, formData);
  }

  updateCity(formData: FormData) {
  return this.http.put<Result<City>>(`${environment.apiBaseUrl}/City/UpdateCity`, formData);
}


deleteCity(id: number) {
  return this.http.delete<Result<boolean>>(
    `${environment.apiBaseUrl}/City/CityDelete?id=${id}`
  );
}

}