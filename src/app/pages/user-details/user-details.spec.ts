import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetails } from './user-details';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment';
import { Result } from '../../models/Result';
import { HttpClient } from '@angular/common/http';
import { AllUsers } from '../../models/AllUsers';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {

  private apiUrl = environment.apiBaseUrl + '/UserDetails/UserDetailList'; // 👈 adjust endpoint

  constructor(private http: HttpClient) {}

getUserDetails(): Observable<Result<AllUsers[]>> {
  return this.http.get<Result<AllUsers[]>>(this.apiUrl);
}


createUserDetails(formData: FormData): Observable<Result<AllUsers>> {
     return this.http.post<Result<AllUsers>>(`${environment.apiBaseUrl}/UserDetails/CreateUserDetail`, formData);
  }

  updateUserDetails(formData: FormData) {
  return this.http.put<Result<UserDetails>>(`${environment.apiBaseUrl}/UserDetails/UpdateUserDetail`, formData);
}


deleteUserDetails(id: number) {
  return this.http.delete<Result<boolean>>(
    `${environment.apiBaseUrl}/UserDetails/UserDetailsDelete?id=${id}`
  );
}


}