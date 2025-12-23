import { Component, InjectionToken } from '@angular/core';
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
  {{ PropertyFacilityId ? 'Edit PropertyFacility' : 'Add PropertyFacility' }}
</h2>

    </div>

    <!-- BODY -->
    <mat-dialog-content class="dialog-body">

      <div class="row">
        <!-- Name -->
        
        <div class="col-sm-12 mb-3">
  <label class="form-label fw-bold">Property</label>

  <ng-select
    class="mb-3"
    [items]="properties"
    bindLabel="countryNameEn"
    bindValue="propertyId"
    [(ngModel)]="propertyId"
    placeholder="Select Property"
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
    bindLabel="countryNameEn"
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
export class AddPropertyFacilityDialog {

  PropertyFacilityId = 0;
  propertyId = 0;
  propertyFacilityTypeId = 0;
  status = true;

  constructor(
    private dialogRef: MatDialogRef<AddPropertyFacilityDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private PropertyFacilityService: PropertyFacilityService,
    private cdr: ChangeDetectorRef,
    private snackBar: MatSnackBar,
        private countryService: CountryService
  ) {
    if (data) {
      this.PropertyFacilityId = data.PropertyFacilityId;
    this.propertyId = data.propertyFacilityNameEn;
    this.propertyFacilityTypeId = data.propertyFacilityNameAr;
    this.status = data.isActive;
    }
  }

 

  save() {
    const formData = new FormData();

    formData.append('PropertyFacilityId', this.PropertyFacilityId.toString());
    formData.append('propertyId', this.propertyId.toString());
    formData.append('propertyFacilityTypeId', this.propertyFacilityTypeId.toString());
    formData.append('IsActive', this.status.toString());

    const request$ = this.PropertyFacilityId
      ? this.PropertyFacilityService.updatePropertyFacility(formData)
      : this.PropertyFacilityService.createPropertyFacility(formData);

    request$.subscribe({
      next: () => {
        this.snackBar.open(
          `${this.PropertyFacilityId ?'Updated' : 'Added'} successfully`,
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


properties: Countrys[] = [];
loadProperties() {
  this.countryService.getCountries().subscribe({
    next: (res) => {
      this.properties = res.data.filter(c => c.isActive);
    },
    error: () => {
      this.snackBar.open('Failed to load countries', 'Close', {
        duration: 3000
      });
    }
  });
} 

propertyFacilityType: Countrys[] = [];
loadPropertyFacilityType() {
  this.countryService.getCountries().subscribe({
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
