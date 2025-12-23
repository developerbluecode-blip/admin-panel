import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Country } from './country';
import { environment } from '../../../environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// describe('Country', () => {
//   let component: Country;
//   let fixture: ComponentFixture<Country>;

//   // beforeEach(async () => {
//   //   await TestBed.configureTestingModule({
//   //     imports: [Country]
//   //   })
//   //   .compileComponents();

//   //   fixture = TestBed.createComponent(Country);
//   //   component = fixture.componentInstance;
//   //   await fixture.whenStable();
//   // });

//   // it('should create', () => {
//   //   expect(component).toBeTruthy();
//   // });
// });

export class CountryService {

  private apiUrl = environment.apiBaseUrl + '/Country/CountryList'; // 👈 adjust endpoint

  constructor(private http: HttpClient) {}

  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(this.apiUrl);
  }
}