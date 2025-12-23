import { Component, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { environment } from '../../../environment';
import { CountryService } from './country.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Inject } from '@angular/core';


@Component({
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatIconModule
  ],
  template: `
    <!-- HEADER -->
    <div class="dialog-header">
      <mat-icon>public</mat-icon>
      <h2 mat-dialog-title>
  {{ countryId ? 'Edit Country' : 'Add Country' }}
</h2>

    </div>

    <!-- BODY -->
    <mat-dialog-content class="dialog-body">

      <div class="row">
        <!-- Name -->
        <div class="col-sm-12 mb-3">
          <mat-label>Name(EN)</mat-label>
          <input
            matInput
            [(ngModel)]=" countryNameEn"
            class="form-control"
            placeholder="Enter Country Name(EN)"
            required>
        </div>

        <div class="col-sm-12 mb-3">
          <mat-label>Name(AR)</mat-label>
          <input
            matInput
            [(ngModel)]=" countryNameAr"
            class="form-control"
            placeholder="Enter Country Name(AR)" dir="rtl"
            required>
        </div>

         <div class="col-sm-12 mb-3">
          <mat-label>Country Code</mat-label>
          <input
            matInput
            [(ngModel)]=" countryCode"
            class="form-control"
            placeholder="Enter Country Code"
            required>
        </div>

        <div class="col-sm-12 mb-3">
          <mat-label>Currency(EN)</mat-label>
          <input
            matInput
            [(ngModel)]=" currencyEn"
            class="form-control"
            placeholder="Enter Currency Name(AR)" 
            required>
        </div>

         <div class="col-sm-12 mb-3">
          <mat-label>Currency(AR)</mat-label>
          <input
            matInput
            [(ngModel)]=" currencyAr"
            class="form-control"
            placeholder="Enter Currency Name(AR)" dir="rtl"
            required>
        </div>

        <!-- Image Upload -->
        <div class="col-sm-12 mb-3">
          <mat-label>Upload Image</mat-label>
          <input
            type="file"
            class="form-control"
            (change)="onFileSelected($event)">
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
export class AddCountryDialog {
countryId=0;
 countryNameEn = '';
  countryNameAr = '';
  countryCode = '';
  currencyEn = '';
  currencyAr = '';
  status = true;
  selectedFile!: File;

  //constructor(private dialogRef: MatDialogRef<AddCountryDialog>, private countryService: CountryService, private snackBar: MatSnackBar) {}

  constructor(
  private dialogRef: MatDialogRef<AddCountryDialog>,
  @Inject(MAT_DIALOG_DATA) public data: any,
  private countryService: CountryService,
  private snackBar: MatSnackBar
) {
  if (data) {
    // EDIT MODE
    this.countryId = data.countryId;
    this.countryNameEn = data.countryNameEn;
    this.countryNameAr = data.countryNameAr;
    this.countryCode = data.countryCode;
    this.currencyEn = data.currencyEn;
    this.currencyAr = data.currencyAr;
    this.status = data.isActive;
  }
  
}



onFileSelected(event: any) {
  this.selectedFile = event.target.files[0];
}


save() {
  const formData = new FormData();

  formData.append('CountryId', this.countryId?.toString() || '0');
  formData.append('CountryNameEn', this.countryNameEn);
  formData.append('CountryNameAr', this.countryNameAr);
  formData.append('CountryCode', this.countryCode);
  formData.append('CurrencyEn', this.currencyEn);
  formData.append('CurrencyAr', this.currencyAr);
  formData.append('IsActive', this.status ? 'true' : 'false');

  if (this.selectedFile !=null) {
    formData.append('file', this.selectedFile);
  }
  else
  {
    formData.append('file', this.selectedFile);
  }

  const request$ = this.countryId
    ? this.countryService.updateCountry(formData) // EDIT
    : this.countryService.createCountry(formData); // ADD

  request$.subscribe({
    next: () => {
      this.snackBar.open(
        `${this.countryNameEn ? 'Updated' : 'Added'} successfully`,
        'Close',
        {
            duration: 5000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['success-snackbar']
          }
      );
      this.dialogRef.close(true);
    },
    error: () => {
      this.snackBar.open(
        'Failed ❌',
        'Close',
        { 
            duration: 5000,
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
}


