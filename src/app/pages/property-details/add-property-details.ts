import { Component, OnInit } from '@angular/core'; import { CommonModule } from '@angular/common'; import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms'; import { ActivatedRoute, Router, RouterModule } from '@angular/router'; import { NgSelectModule } from '@ng-select/ng-select'; import { MatSnackBar } from '@angular/material/snack-bar'; import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { PropertyDetailsService } from './property-details.spec';
import { CountryService } from '../country/country.service';
import { GovernarateService } from '../governarate/governarate.spec';
import { CityService } from '../city/city.spec';
import { PropertyTypeService } from '../property-type/property-type.spec';
import { UserDetailsService } from '../user-details/user-details.spec';
import { City } from '../city/city';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property-details.html',
  styleUrls: ['./property-details.scss'],
  imports:[
CommonModule, RouterModule, ReactiveFormsModule, NgSelectModule, MatSlideToggleModule,
  ],
  standalone: true,
})
export class AddProperty implements OnInit {

  form!: FormGroup;
  isEditMode = false;
  propertyId!: number;
  selectedFile?: File;
  governorateId: number | null = null;


  countries: any[] = [];
  governarates: any[] = [];
  citys: any[] = [];
  propertyTypes: any[] = [];
  propertyOwners: any[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private propertyService: PropertyDetailsService,
    private countryService: CountryService,
    private governarateService: GovernarateService,
    private cityService: CityService,
    private propertyTypeService: PropertyTypeService,
    private userService: UserDetailsService
  ) {}

ngOnInit(): void {
  this.buildForm();
  this.loadInitialData();

  // ✅ FIRST setup listeners
  this.setupCascadingDropdowns();

  const idParam = this.route.snapshot.paramMap.get('id');

if (idParam && !isNaN(+idParam)) {
  this.isEditMode = true;
  this.propertyId = Number(idParam);
  this.loadPropertyForEdit(this.propertyId);
}
}


  // ---------------- FORM ----------------
  buildForm() {
    this.form = this.fb.group({
      propertyId: [null],
      countryId: [null],
      governorateId: [null],
      cityId: [null],
      propertyTypeId: [null],
      propertyOwnerId: [null],
      propertyNameEn: [''],
      propertyNameAr: [''],
      latitude: [''],
      longitude: [''],
      totalRoom: [0],
      rentAmount: [0],
      propertyDescriptionEn: [''],
      propertyDescriptionAr: [''],
      propertyAddress: [''],
      isActive: [true],
      isBlock: [false]
    });
  }

  // ---------------- LOAD DATA ----------------
  loadInitialData() {
    this.countryService.getCountries().subscribe(res => this.countries = res.data.filter(c=> c.isActive == true));
    this.propertyTypeService.getPropertyTypes().subscribe(res => this.propertyTypes = res.data.filter(c=> c.isActive == true));
    this.userService.getUserDetails().subscribe(res =>
      this.propertyOwners = res.data.filter((u: any) => u.userTypeId === 2 && u.isActive == true)
    );
  }

  setupCascadingDropdowns() {
    this.form.get('countryId')!.valueChanges.subscribe(id => {
      this.governarates = [];
      this.citys = [];
      this.form.patchValue({ governorateId: null, cityId: null }, { emitEvent: false });
      if (id) this.governarateService.getGovernarates()
        .subscribe(res => this.governarates = res.data.filter((g: any) => g.countryId === id && g.isActive == true));
    });

    this.form.get('governorateId')!.valueChanges.subscribe(id => {
      this.citys = [];
      this.form.patchValue({ cityId: null }, { emitEvent: false });
      if (id) this.cityService.getCitys()
        .subscribe(res => this.citys = res.data.filter((c: any) => c.governarateId === id  && c.isActive == true));
    });
  }

  // ---------------- EDIT ----------------


loadPropertyForEdit(propertyId: number) {
  this.propertyService.getPropertyView(propertyId).subscribe({
    next: res => {

      // if (!res || !res.data) {
      //   console.error('Property not found');
      //   return;
      // }

      const p = res.data;

      // 1️⃣ Patch SIMPLE fields first
      this.form.patchValue({
        propertyId:p.propertyId,
        propertyNameEn: p.propertyNameEn,
        propertyNameAr: p.propertyNameAr,
        propertyTypeId: p.propertyTypeId,
        propertyOwnerId: p.propertyOwnerId,
        latitude: p.latitude,
        longitude: p.longitude,
        totalRoom: p.totalRoom,
        rentAmount: p.rentAmount,
        propertyDescriptionEn: p.propertyDescriptionEn,
        propertyDescriptionAr: p.propertyDescriptionAr,
        propertyAddress: p.propertyAddress,
        isActive: p.isActive,
        isBlock: p.isBlock
      });

      // 2️⃣ COUNTRY
      this.form.patchValue({ countryId: p.countryId });

      // 3️⃣ Load GOVERNORATES
      this.governarateService.getGovernarates().subscribe(govs => {
        this.governarates = govs.data.filter(
          (g: any) => g.countryId === p.countryId && g.isActive == true
        );

        // 4️⃣ Load CITY → get governorateId
        this.cityService.getCitys().subscribe(cities => {
          const city = cities.data.find(
            (c: any) => c.cityId === p.cityId && c.isActive == true
          );

          if (!city) return;

          // 5️⃣ Patch governorate
          this.form.patchValue({
            governorateId: city.governarateId
          });

          // 6️⃣ Load cities
          this.citys = cities.data.filter(
            (c: any) => c.governarateId === city.governarateId && c.isActive == true
          );

          // 7️⃣ Patch city
          this.form.patchValue({
            cityId: p.cityId
          });
        });
      });
    },
    error: err => console.error(err)
  });
}



  // ---------------- FILE ----------------
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  // ---------------- SAVE ----------------
  onSave() {
    if (this.form.invalid) return;

    const formData = new FormData();

    Object.entries(this.form.value).forEach(([k, v]) => {
      if (v !== null && v !== undefined) formData.append(k, v.toString());
    });

    if (this.selectedFile) {
      formData.append('file', this.selectedFile);
    }

    const api$ = this.isEditMode
      ? this.propertyService.updatePropertyDetails(formData)
      : this.propertyService.createPropertyDetails(formData);

    api$.subscribe({
      next: () => {
        this.snackBar.open(
          this.isEditMode ? 'Property updated successfully' : 'Property added successfully',
          'Close',
          {
            duration: 4000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['success-snackbar']
          }
        );
        this.router.navigate(['/property-details']);
      },
      error: () => {
        this.snackBar.open(
          'Operation failed ❌',
          'Close',
          {
            duration: 4000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['fail-snackbar']
          }
        );
      }
    });
  }
}
