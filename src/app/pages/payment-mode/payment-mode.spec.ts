import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentMode } from './payment-mode';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environment';
import { Result } from '../../models/Result';

@Injectable({
  providedIn: 'root'
})
export class PaymentModeService {

  private apiUrl = environment.apiBaseUrl + '/PaymentMode/PaymentModeList'; // 👈 adjust endpoint

  constructor(private http: HttpClient) {}

getPaymentModes(): Observable<Result<PaymentMode[]>> {
  return this.http.get<Result<PaymentMode[]>>(this.apiUrl);
}

createPaymentMode(formData: FormData): Observable<Result<PaymentMode>> {
     return this.http.post<Result<PaymentMode>>(`${environment.apiBaseUrl}/PaymentMode/CreatePaymentMode`, formData);
  }

  updatePaymentMode(formData: FormData) {
  return this.http.put<Result<PaymentMode>>(`${environment.apiBaseUrl}/PaymentMode/UpdatePaymentMode`, formData);
}


deletePaymentMode(id: number) {
  return this.http.delete<Result<boolean>>(
    `${environment.apiBaseUrl}/PaymentMode/PaymentModePaymentMode?id=${id}`
  );
}

}