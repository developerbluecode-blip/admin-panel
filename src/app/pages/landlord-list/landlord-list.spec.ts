import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandlordList } from './landlord-list';
import { AllUsers } from '../../models/AllUsers';
import { environment } from '../../../environment';
import { HttpClient } from '@angular/common/http';
import { Result } from '../../models/Result';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LandlordListServices{

  private apiUrl = environment.apiBaseUrl + '/UserDetails/UserDetailList'; // 👈 adjust endpoint

  constructor(private http: HttpClient) {}

getLandlordList(): Observable<Result<AllUsers[]>> {
  return this.http.get<Result<AllUsers[]>>(this.apiUrl);
}

createLandlordList(formData: FormData): Observable<Result<AllUsers>> {
     return this.http.post<Result<AllUsers>>(`${environment.apiBaseUrl}/UserDetails/CreateUserDetail`, formData);
  }

  updateLandlordList(formData: FormData) {
  return this.http.put<Result<AllUsers>>(`${environment.apiBaseUrl}/UserDetails/UpdateUserDetail`, formData);
}


deleteLandlordList(id: number) {
  return this.http.delete<Result<boolean>>(
    `${environment.apiBaseUrl}/UserDetails/UserDetailDelete?id=${id}`
  );
}

}