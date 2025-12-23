import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environment';
import { Result } from '../../models/Result';
import { PropertyFacilitys } from '../../models/PropertyFacility';

@Injectable({
  providedIn: 'root'
})
export class PropertyFacilityService {

  private apiUrl =
    environment.apiBaseUrl + '/PropertyFacility/PropertyFacilityList';

  constructor(private http: HttpClient) {}

  getPropertyFacilitys(): Observable<Result<PropertyFacilitys[]>> {
    return this.http.get<Result<PropertyFacilitys[]>>(this.apiUrl);
  }

  createPropertyFacility(
    formData: FormData
  ): Observable<Result<PropertyFacilitys>> {
    return this.http.post<Result<PropertyFacilitys>>(
      `${environment.apiBaseUrl}/PropertyFacility/CreatePropertyFacility`,
      formData
    );
  }

  updatePropertyFacility(
    formData: FormData
  ): Observable<Result<PropertyFacilitys>> {
    return this.http.put<Result<PropertyFacilitys>>(
      `${environment.apiBaseUrl}/PropertyFacility/UpdatePropertyFacility`,
      formData
    );
  }

  deletePropertyFacility(id: number): Observable<Result<boolean>> {
    return this.http.delete<Result<boolean>>(
      `${environment.apiBaseUrl}/PropertyFacility/PropertyFacilityDelete?id=${id}`
    );
  }
}
