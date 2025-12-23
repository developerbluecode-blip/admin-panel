import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserType } from './user-type';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Result } from '../../models/Result';


@Injectable({
  providedIn: 'root'
})
export class UserTypeService {

  private apiUrl = environment.apiBaseUrl + '/UserType/UserTypeList'; // 👈 adjust endpoint

  constructor(private http: HttpClient) {}

getUserTypes(): Observable<Result<UserType[]>> {
  return this.http.get<Result<UserType[]>>(this.apiUrl);
}

createUserType(formData: FormData): Observable<Result<UserType>> {
     return this.http.post<Result<UserType>>(`${environment.apiBaseUrl}/UserType/CreateUserType`, formData);
  }

  updateUserType(formData: FormData) {
  return this.http.put<Result<UserType>>(`${environment.apiBaseUrl}/UserType/UpdateUserType`, formData);
}


deleteUserType(id: number) {
  return this.http.delete<Result<boolean>>(
    `${environment.apiBaseUrl}/UserType/UserTypeUserType?id=${id}`
  );
}

}