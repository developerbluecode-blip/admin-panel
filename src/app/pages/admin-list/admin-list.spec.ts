import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminList } from './admin-list';
import { AllUsers } from '../../models/AllUsers';
import { environment } from '../../../environment';
import { HttpClient } from '@angular/common/http';
import { Result } from '../../models/Result';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminListServices{

  private apiUrl = environment.apiBaseUrl + '/UserDetails/UserDetailList'; // 👈 adjust endpoint

  constructor(private http: HttpClient) {}

getAdminList(): Observable<Result<AllUsers[]>> {
  return this.http.get<Result<AllUsers[]>>(this.apiUrl);
}

createAdminList(formData: FormData): Observable<Result<AllUsers>> {
     return this.http.post<Result<AllUsers>>(`${environment.apiBaseUrl}/UserDetails/CreateUserDetail`, formData);
  }

  updateAdminList(formData: FormData) {
  return this.http.put<Result<AllUsers>>(`${environment.apiBaseUrl}/UserDetails/UpdateUserDetail`, formData);
}


deleteAdminList(id: number) {
  return this.http.delete<Result<boolean>>(
    `${environment.apiBaseUrl}/UserDetails/UserDetailDelete?id=${id}`
  );
}

}