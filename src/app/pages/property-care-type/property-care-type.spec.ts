import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environment';
import { Result } from '../../models/Result';
import { PropertyCareTypes } from '../../models/PropertyCareType';

@Injectable({
  providedIn: 'root'
})
export class PropertyCareTypeService {

  private apiUrl =
    environment.apiBaseUrl + '/PropertyCareType/PropertyCareTypeList';

  constructor(private http: HttpClient) {}

  getPropertyCareTypes(): Observable<Result<PropertyCareTypes[]>> {
    return this.http.get<Result<PropertyCareTypes[]>>(this.apiUrl);
  }

  createPropertyCareType(
    formData: FormData
  ): Observable<Result<PropertyCareTypes>> {
    return this.http.post<Result<PropertyCareTypes>>(
      `${environment.apiBaseUrl}/PropertyCareType/CreatePropertyCareType`,
      formData
    );
  }

  updatePropertyCareType(
    formData: FormData
  ): Observable<Result<PropertyCareTypes>> {
    return this.http.put<Result<PropertyCareTypes>>(
      `${environment.apiBaseUrl}/PropertyCareType/UpdatePropertyCareType`,
      formData
    );
  }

  deletePropertyCareType(id: number): Observable<Result<boolean>> {
    return this.http.delete<Result<boolean>>(
      `${environment.apiBaseUrl}/PropertyCareType/PropertyCareTypeDelete?id=${id}`
    );
  }
}
