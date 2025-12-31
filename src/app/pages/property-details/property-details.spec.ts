import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environment';
import { Result } from '../../models/Result';
import { Property } from '../../models/PropertyDetails';
import { PropertyImages } from '../../models/PropertyImage';
import { PropertyContractDoc } from '../../models/PropertyContractDoc';
import { PropertyContract } from '../../models/PropertyContract';
import { PropertyFacilityWithType } from '../../models/PropertyFacilityWithType';
import { PropertyFacilityTypes } from '../../models/PropertyFacilityType';

@Injectable({
  providedIn: 'root'
})
export class PropertyDetailsService {

  private apiUrl =
    environment.apiBaseUrl + '/Property/PropertyList';

  constructor(private http: HttpClient) {}

  getPropertyDetails(): Observable<Result<Property[]>> {
    return this.http.get<Result<Property[]>>(this.apiUrl);
  }

  getPropertyImages(propertyId: number): Observable<Result<PropertyImages[]>> {
    return this.http.get<Result<PropertyImages[]>>(
      `${environment.apiBaseUrl}/Property/PropertyImagesList?PropertyId=${propertyId}`
    );
  }

   getContractList(propertyId: number): Observable<Result<PropertyContract[]>> {
    return this.http.get<Result<PropertyContract[]>>(
      `${environment.apiBaseUrl}/PropertyContract/PropertyContractList?PropertyId=${propertyId}`
    );
  }

  getContractDocList(PropertyContractId: number): Observable<Result<PropertyContractDoc[]>> {
    return this.http.get<Result<PropertyContractDoc[]>>(
      `${environment.apiBaseUrl}/PropertyContract/ContractDocList?PropertyContractId=${PropertyContractId}`
    );
  }

   getFacilityType(propertyId: number): Observable<Result<PropertyFacilityTypes[]>> {
    return this.http.get<Result<PropertyFacilityTypes[]>>(
      `${environment.apiBaseUrl}/PropertyFacilityType/PropertyFacilityTypeView?PropertyId=${propertyId}`
    );
  }

   getFacilityTypeView(propertyId: number): Observable<Result<PropertyFacilityTypes[]>> {
    return this.http.get<Result<PropertyFacilityTypes[]>>(
      `${environment.apiBaseUrl}/PropertyFacilityType/PropertyFacilityTypeView?PropertyId=${propertyId}`
    );
  }

  getPropertyView(propertyId: number): Observable<Result<Property>> {
    return this.http.get<Result<Property>>(
      `${environment.apiBaseUrl}/Property/PropertyDetails?PropertyId=${propertyId}`
    );
  }

  createPropertyDetails(
    formData: FormData
  ): Observable<Result<Property>> {
    return this.http.post<Result<Property>>(
      `${environment.apiBaseUrl}/Property/CreateProperty`,
      formData
    );
  }

  createPropertyImage(
    formData: FormData
  ): Observable<Result<PropertyImages>> {
    return this.http.post<Result<PropertyImages>>(
      `${environment.apiBaseUrl}/Property/AddPropertyImages`,
      formData
    );
  }

   updatePropertyImage(
    formData: FormData
  ): Observable<Result<PropertyImages>> {
    return this.http.put<Result<PropertyImages>>(
      `${environment.apiBaseUrl}/Property/PropertyImageStatus`,
      formData
    );
  }

  updatePropertyDetails(
    formData: FormData
  ): Observable<Result<Property>> {
    return this.http.put<Result<Property>>(
      `${environment.apiBaseUrl}/Property/UpdateProperty`,
      formData
    );
  }

  deletePropertyDetails(id: number): Observable<Result<boolean>> {
    return this.http.delete<Result<boolean>>(
      `${environment.apiBaseUrl}/Property/PropertyDelete?id=${id}`
    );
  }

  createContract(formData: FormData): Observable<Result<PropertyContract>> {
       return this.http.post<Result<PropertyContract>>(`${environment.apiBaseUrl}/PropertyContract/CreatePropertyContract`, formData);
    }
  
    updateContract(formData: FormData) {
    return this.http.put<Result<PropertyContract>>(`${environment.apiBaseUrl}/PropertyContract/UpdatePropertyContract`, formData);
  }
}
