import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyType } from './property-type';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environment';
import { Result } from '../../models/Result';
import { PropertyTypes } from '../../models/PropertyType';

@Injectable({
  providedIn: 'root'
})
export class PropertyTypeService {

  private apiUrl = environment.apiBaseUrl + '/PropertyType/PropertyTypeList'; // 👈 adjust endpoint

  constructor(private http: HttpClient) {}

getPropertyTypes(): Observable<Result<PropertyTypes[]>> {
  return this.http.get<Result<PropertyTypes[]>>(this.apiUrl);
}

createPropertyType(formData: FormData): Observable<Result<PropertyType>> {
     return this.http.post<Result<PropertyType>>(`${environment.apiBaseUrl}/PropertyType/CreatePropertyType`, formData);
  }

  updatePropertyType(formData: FormData) {
  return this.http.put<Result<PropertyType>>(`${environment.apiBaseUrl}/PropertyType/UpdatePropertyType`, formData);
}


deletePropertyType(id: number) {
  return this.http.delete<Result<boolean>>(
    `${environment.apiBaseUrl}/PropertyType/PropertyTypeDelete?id=${id}`
  );
}

}