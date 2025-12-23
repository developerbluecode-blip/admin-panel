import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environment';
import { Result } from '../../models/Result';
import { Property } from '../../models/PropertyDetails';

@Injectable({
  providedIn: 'root'
})
export class PropertyDetailsService {

  private apiUrl =
    environment.apiBaseUrl + '/PropertyDetails/PropertyDetailsList';

  constructor(private http: HttpClient) {}

  getPropertyDetailss(): Observable<Result<Property[]>> {
    return this.http.get<Result<Property[]>>(this.apiUrl);
  }

  createPropertyDetails(
    formData: FormData
  ): Observable<Result<Property>> {
    return this.http.post<Result<Property>>(
      `${environment.apiBaseUrl}/PropertyDetails/CreatePropertyDetails`,
      formData
    );
  }

  updatePropertyDetails(
    formData: FormData
  ): Observable<Result<Property>> {
    return this.http.put<Result<Property>>(
      `${environment.apiBaseUrl}/PropertyDetails/UpdatePropertyDetails`,
      formData
    );
  }

  deletePropertyDetails(id: number): Observable<Result<boolean>> {
    return this.http.delete<Result<boolean>>(
      `${environment.apiBaseUrl}/PropertyDetails/PropertyDetailsDelete?id=${id}`
    );
  }
}
