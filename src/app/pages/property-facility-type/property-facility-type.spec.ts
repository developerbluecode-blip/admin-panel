import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environment';
import { Result } from '../../models/Result';
import { PropertyFacilityTypes } from '../../models/PropertyFacilityType';

@Injectable({
  providedIn: 'root'
})
export class PropertyFacilityTypeService {

  private apiUrl =
    environment.apiBaseUrl + '/PropertyFacilityType/PropertyFacilityTypeList';

  constructor(private http: HttpClient) {}

  getPropertyFacilityTypes(): Observable<Result<PropertyFacilityTypes[]>> {
    return this.http.get<Result<PropertyFacilityTypes[]>>(this.apiUrl);
  }

  createPropertyFacilityType(
    formData: FormData
  ): Observable<Result<PropertyFacilityTypes>> {
    return this.http.post<Result<PropertyFacilityTypes>>(
      `${environment.apiBaseUrl}/PropertyFacilityType/CreatePropertyFacilityType`,
      formData
    );
  }

  updatePropertyFacilityType(
    formData: FormData
  ): Observable<Result<PropertyFacilityTypes>> {
    return this.http.put<Result<PropertyFacilityTypes>>(
      `${environment.apiBaseUrl}/PropertyFacilityType/UpdatePropertyFacilityType`,
      formData
    );
  }

  deletePropertyFacilityType(id: number): Observable<Result<boolean>> {
    return this.http.delete<Result<boolean>>(
      `${environment.apiBaseUrl}/PropertyFacilityType/PropertyFacilityTypeDelete?id=${id}`
    );
  }
}
