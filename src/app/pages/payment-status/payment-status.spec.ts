import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentStatus } from './payment-status';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environment';
import { Result } from '../../models/Result';

@Injectable({
  providedIn: 'root'
})
export class PaymentStatusService {

  private apiUrl = environment.apiBaseUrl + '/PaymentStatus/PaymentStatusList'; // 👈 adjust endpoint

  constructor(private http: HttpClient) {}

getPaymentStatuss(): Observable<Result<PaymentStatus[]>> {
  return this.http.get<Result<PaymentStatus[]>>(this.apiUrl);
}

createPaymentStatus(formData: FormData): Observable<Result<PaymentStatus>> {
     return this.http.post<Result<PaymentStatus>>(`${environment.apiBaseUrl}/PaymentStatus/CreatePaymentStatus`, formData);
  }

  updatePaymentStatus(formData: FormData) {
  return this.http.put<Result<PaymentStatus>>(`${environment.apiBaseUrl}/PaymentStatus/UpdatePaymentStatus`, formData);
}


deletePaymentStatus(id: number) {
  return this.http.delete<Result<boolean>>(
    `${environment.apiBaseUrl}/PaymentStatus/PaymentStatusDelete?id=${id}`
  );
}

}