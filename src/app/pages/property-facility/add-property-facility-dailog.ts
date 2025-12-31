import { AfterViewInit, Component, InjectionToken, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { PropertyFacilityService } from './property-facility.spec';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Inject } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { NgSelectModule } from '@ng-select/ng-select';
import { ChangeDetectorRef } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Countrys } from '../../models/Country';
import { CountryService } from '../country/country.service';
import { PropertyFacilityTypes } from '../../models/PropertyFacilityType';
import { PropertyTypeService } from '../property-type/property-type.spec';
import { PropertyFacilityTypeService } from '../property-facility-type/property-facility-type.spec';
import { PropertyTypes } from '../../models/PropertyType';


@Component({
  standalone: true,
  imports: [
     CommonModule,
    FormsModule,
    NgSelectModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatIconModule,
    MatSelectModule,
    MatSnackBarModule
  ],
  template: `
    <!-- HEADER -->
    <div class="dialog-header">
      <mat-icon>public</mat-icon>
      <h2 mat-dialog-title>
  {{ propertyFacilityWithTypeId ? 'Edit PropertyFacility' : 'Add PropertyFacility' }}
</h2>

    </div>

    <!-- BODY -->
    <mat-dialog-content class="dialog-body">

      <div class="row">
        <!-- Name -->
        
        <div class="col-sm-12 mb-3">
  <label class="form-label fw-bold">Property Type</label>

  <ng-select
    class="mb-3"
    [items]="propertiesType"
    bindLabel="propertyTypeNameEn"
    bindValue="propertyTypeId"
    [(ngModel)]="propertyTypeId"
    placeholder="Select Property Type"
    [searchable]="true"
    [clearable]="true"
    required>
  </ng-select>
</div>

 
        <div class="col-sm-12 mb-3">
  <label class="form-label fw-bold">property Facility Type</label>
<ng-select
    class="mb-3"
    [items]="propertyFacilityType"
    bindLabel="propertyFacilityNameEn"
    bindValue="propertyFacilityTypeId"
    [(ngModel)]="propertyFacilityTypeId"
    placeholder="Select Property Facility Type"
    [searchable]="true"
    [clearable]="true"
    required>
  </ng-select>
</div>
        



        <!-- Status -->
        <div class="col-sm-12 mt-2">
         <mat-slide-toggle [(ngModel)]="status">
  Active
</mat-slide-toggle>
        </div>
      </div>

    </mat-dialog-content>

    <!-- FOOTER -->
    <mat-dialog-actions class="dialog-actions">
      <button mat-stroked-button color="warn" (click)="close()">Cancel</button>
      <button mat-raised-button color="primary" (click)="save()">Save</button>
    </mat-dialog-actions>
  `,
  styles: [`
    .dialog-header {
      display: flex;
      align-items: center;
      gap: 10px;
      background: linear-gradient(135deg, #1976d2, #42a5f5);
      color: #fff;
      padding: 16px 24px;
      border-radius: 8px 8px 0 0;
    }

    .dialog-body {
      padding: 24px;
    }

    .dialog-actions {
      padding: 16px 24px;
      display: flex;
      justify-content: flex-end;
      gap: 12px;
      border-top: 1px solid #eee;
    }
  `]
})
export class AddPropertyFacilityDialog  implements OnInit, AfterViewInit {

  propertyFacilityWithTypeId = 0;
  propertyTypeId = 0;
  propertyFacilityTypeId = 0;
  status = true;

  constructor(
    private dialogRef: MatDialogRef<AddPropertyFacilityDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private PropertyFacilityService: PropertyFacilityService,
    private cdr: ChangeDetectorRef,
    private snackBar: MatSnackBar,
        private countryService: CountryService,
    private  propertyTypeService: PropertyTypeService,
    private propertyFacilityTypeService: PropertyFacilityTypeService
  ) {
    if (data) {
      this.propertyFacilityWithTypeId = data.propertyFacilityWithTypeId;
    this.propertyTypeId = data.propertyTypeId;
    this.propertyFacilityTypeId = data.propertyFacilityTypeId;
    this.status = data.isActive;
    }
  }

 
   ngAfterViewInit() {
    this.loadProperties();
    this.loadPropertyFacilityType();
  }

 

  save() {
    const formData = new FormData();

    formData.append('PropertyFacilityWithTypeId', this.propertyFacilityWithTypeId.toString());
    formData.append('PropertyTypeId', this.propertyTypeId.toString());
    formData.append('PropertyFacilityTypeId', this.propertyFacilityTypeId.toString());
    formData.append('IsActive', this.status.toString());

    const request$ = this.propertyFacilityWithTypeId
      ? this.PropertyFacilityService.updatePropertyFacility(formData)
      : this.PropertyFacilityService.createPropertyFacility(formData);

    request$.subscribe({
      next: () => {
        this.snackBar.open(
          `${this.propertyFacilityWithTypeId ?'Updated' : 'Added'} successfully`,
          'Close',
          {
            duration: 4000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['success-snackbar']
          }
        );
        this.dialogRef.close(true);
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

  close() {
    this.dialogRef.close(false);
  }


  ngOnInit() {
  this.loadProperties();
  this.loadPropertyFacilityType();
}

getAllFacilityByType: any[]=[];
test(){
   this.PropertyFacilityService.getPropertyFacilitys().subscribe({
      next: res => this.getAllFacilityByType = res.data.filter(s=>s.propertyTypeId == this.propertyTypeId),
      error: err => console.error('Failed to load property Facility types', err)
    });
}

propertiesType: PropertyTypes[] = [];
loadProperties() {
  this.propertyTypeService.getPropertyTypes().subscribe({
    next: (res) => {
      this.propertiesType = res.data.filter(c => c.isActive);
    },
    error: () => {
      this.snackBar.open('Failed to load countries', 'Close', {
        duration: 3000
      });
    }
  });
} 

propertyFacilityType: PropertyFacilityTypes[] = [];
loadPropertyFacilityType() {
  this.propertyFacilityTypeService.getPropertyFacilityTypes().subscribe({
    next: (res) => {
      this.propertyFacilityType = res.data.filter(c => c.isActive);
    },
    error: () => {
      this.snackBar.open('Failed to load countries', 'Close', {
        duration: 3000
      });
    }
  });
} 



}
