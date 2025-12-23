import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Governarate } from './governarate';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment';
import { Result } from '../../models/Result';
import { HttpClient } from '@angular/common/http';
import { Governarates } from '../../models/Governarate';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GovernarateService {

  private apiUrl = environment.apiBaseUrl + '/Governarate/GovernarateList'; // 👈 adjust endpoint

  constructor(private http: HttpClient) {}

getGovernarates(): Observable<Result<Governarates[]>> {
  return this.http.get<Result<Governarates[]>>(this.apiUrl);
}


createGovernarate(formData: FormData): Observable<Result<Governarate>> {
     return this.http.post<Result<Governarate>>(`${environment.apiBaseUrl}/Governarate/CreateGovernarate`, formData);
  }

  updateGovernarate(formData: FormData) {
  return this.http.put<Result<Governarate>>(`${environment.apiBaseUrl}/Governarate/UpdateGovernarate`, formData);
}


deleteGovernarate(id: number) {
  return this.http.delete<Result<boolean>>(
    `${environment.apiBaseUrl}/Governarate/GovernarateDelete?id=${id}`
  );
}


}