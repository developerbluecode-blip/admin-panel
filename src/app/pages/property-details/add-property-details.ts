import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Countrys } from '../../models/Country';
import { CountryService } from '../country/country.service';

import { Governarates } from '../../models/Governarate';
import { GovernarateService } from '../governarate/governarate.spec';

import { Citys } from '../../models/City';
import { CityService } from '../city/city.spec';

import { PropertyTypes } from '../../models/PropertyType';
import { PropertyTypeService } from '../property-type/property-type.spec';

@Component({
  selector: 'app-add-property',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    NgSelectModule
  ],
  templateUrl: './add-property-details.html',
  styleUrls: ['./property-details.scss']
})
export class AddProperty implements OnInit {

  form!: FormGroup;

  countries: Countrys[] = [];
  governarates: Governarates[] = [];
  citys: Citys[] = [];
  propertyType: PropertyTypes[] = [];

  constructor(
    private fb: FormBuilder,
    private countryService: CountryService,
    private governarateService: GovernarateService,
    private cityService: CityService,
    private propertyTypeServices: PropertyTypeService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      countryId: [null],
      governorateId: [null],
      cityId: [null],
      propertyTypeId: [null]
    });

    this.loadCountries();
    this.loadPropertyType();

    // Country → Governorate
    this.form.get('countryId')!.valueChanges.subscribe(countryId => {
      this.governarates = [];
      this.citys = [];

      this.form.patchValue({
        governorateId: null,
        cityId: null
      }, { emitEvent: false });

      if (countryId) {
        this.loadGovernarates(countryId);
      }
    });

    // Governorate → City
    this.form.get('governorateId')!.valueChanges.subscribe(governarateId => {
      this.citys = [];
      this.form.patchValue({ cityId: null }, { emitEvent: false });

      if (governarateId) {
        this.loadCitys(governarateId);
      }
    });
  }

  // ================= COUNTRY =================
  loadCountries() {
    this.countryService.getCountries().subscribe({
      next: res => {
        this.countries = (res?.data ?? []).filter(c => c.isActive);
      },
      error: () => {
        this.snackBar.open('Failed to load countries', 'Close', { duration: 3000 });
      }
    });
  }

  // ================= GOVERNORATE =================
  loadGovernarates(countryId: number) {
    this.governarateService.getGovernarates().subscribe({
      next: res => {
        this.governarates = (res?.data ?? [])
          .filter(g => g.isActive && g.countryId === countryId);
      },
      error: () => {
        this.governarates = [];
      }
    });
  }

  // ================= CITY =================
  loadCitys(governarateId: number) {
    this.cityService.getCitys().subscribe({
      next: res => {
        this.citys = (res?.data ?? [])
          .filter(c => c.isActive && c.governarateId === governarateId);
      },
      error: () => {
        this.citys = [];
      }
    });
  }

  // ================= PROPERTY TYPE =================
  loadPropertyType() {
    this.propertyTypeServices.getPropertyTypes().subscribe({
      next: res => {
        this.propertyType = (res?.data ?? []).filter(p => p.isActive);
      },
      error: () => {
        this.snackBar.open('Failed to load property types', 'Close', { duration: 3000 });
      }
    });
  }
}
