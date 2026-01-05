import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantList } from './tenant-list';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environment';
import { AllUsers } from '../../models/AllUsers';
import { Result } from '../../models/Result';

@Injectable({
  providedIn: 'root'
})
export class TenantListServices{

  private apiUrl = environment.apiBaseUrl + '/UserDetails/UserDetailList'; // 👈 adjust endpoint

  constructor(private http: HttpClient) {}

getTenantList(): Observable<Result<AllUsers[]>> {
  return this.http.get<Result<AllUsers[]>>(this.apiUrl);
}

createTenantList(formData: FormData): Observable<Result<AllUsers>> {
     return this.http.post<Result<AllUsers>>(`${environment.apiBaseUrl}/UserDetails/CreateUserDetail`, formData);
  }

  updateTenantList(formData: FormData) {
  return this.http.put<Result<AllUsers>>(`${environment.apiBaseUrl}/UserDetails/UpdateUserDetail`, formData);
}


deleteTenantList(id: number) {
  return this.http.delete<Result<boolean>>(
    `${environment.apiBaseUrl}/UserDetails/UserDetailDelete?id=${id}`
  );
}

}