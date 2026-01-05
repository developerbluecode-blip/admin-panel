import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserType } from './user-type';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Result } from '../../models/Result';
import { UserTypes } from '../../models/userType';


@Injectable({
  providedIn: 'root'
})
export class UserTypeService {

  private apiUrl = environment.apiBaseUrl + '/UserType/UserTypeList'; // 👈 adjust endpoint

  constructor(private http: HttpClient) {}

getUserTypes(): Observable<Result<UserTypes[]>> {
  return this.http.get<Result<UserTypes[]>>(this.apiUrl);
}

createUserType(formData: FormData): Observable<Result<UserTypes>> {
     return this.http.post<Result<UserTypes>>(`${environment.apiBaseUrl}/UserType/CreateUserType`, formData);
  }

  updateUserType(formData: FormData) {
  return this.http.put<Result<UserTypes>>(`${environment.apiBaseUrl}/UserType/UpdateUserType`, formData);
}


deleteUserType(id: number) {
  return this.http.delete<Result<boolean>>(
    `${environment.apiBaseUrl}/UserType/UserTypeUserType?id=${id}`
  );
}

}