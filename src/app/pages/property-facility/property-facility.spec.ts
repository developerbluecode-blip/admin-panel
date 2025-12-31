import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environment';
import { Result } from '../../models/Result';
import { PropertyFacilitys } from '../../models/PropertyFacility';
import { PropertyFacilityWithType } from '../../models/PropertyFacilityWithType';

@Injectable({
  providedIn: 'root'
})

export class PropertyFacilityService {

  private apiUrl =
    environment.apiBaseUrl + '/PropertyFacilityWithType/PropertyFacilityWithTypeList';

  constructor(private http: HttpClient) {}

  getPropertyFacilitys(): Observable<Result<PropertyFacilityWithType[]>> {
    return this.http.get<Result<PropertyFacilityWithType[]>>(this.apiUrl);
  }

  createPropertyFacility(
    formData: FormData
  ): Observable<Result<PropertyFacilityWithType>> {
    return this.http.post<Result<PropertyFacilityWithType>>(
      `${environment.apiBaseUrl}/PropertyFacilityWithType/CreatePropertyFacilityWithType`,
      formData
    );
  }

  updatePropertyFacility(
    formData: FormData
  ): Observable<Result<PropertyFacilityWithType>> {
    return this.http.put<Result<PropertyFacilityWithType>>(
      `${environment.apiBaseUrl}/PropertyFacilityWithType/UpdatePropertyFacilityWithType`,
      formData
    );
  }

  deletePropertyFacility(id: number): Observable<Result<boolean>> {
    return this.http.delete<Result<boolean>>(
      `${environment.apiBaseUrl}/PropertyFacilityWithType/PropertyFacilityWithTypeDelete?id=${id}`
    );
  }
}
