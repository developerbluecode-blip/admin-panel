import { Component, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { GovernarateService } from './governarate.spec';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Inject } from '@angular/core';
import { CountryService } from '../country/country.service';
import { Countrys } from '../../models/Country';
import { MatSelectModule } from '@angular/material/select';
import { NgSelectModule } from '@ng-select/ng-select';
import { ChangeDetectorRef } from '@angular/core';



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
    MatSelectModule 
  ],
  template: `
    <!-- HEADER -->
    <div class="dialog-header">
      <mat-icon>public</mat-icon>
      <h2 mat-dialog-title>
  {{ governarateId ? 'Edit Governarate' : 'Add Governarate' }}
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
            [(ngModel)]="governarateNameEn"
            class="form-control"
            placeholder="Enter Governarate Name(EN)"
            required>
        </div>

        <div class="col-sm-12 mb-3">
          <mat-label>Name(AR)</mat-label>
          <input
            matInput
            [(ngModel)]="governarateNameAr"
            class="form-control"
            placeholder="Enter Governarate Name(AR)" dir="rtl"
            required>
        </div>


        <div class="col-sm-12 mb-3">
  <label class="form-label fw-bold">Country</label>

  <ng-select
    class="mb-3"
    [items]="countries"
    bindLabel="countryNameEn"
    bindValue="countryId"
    [(ngModel)]="countryId"
    placeholder="Select Country"
    [searchable]="true"
    [clearable]="true"
    required>
  </ng-select>
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
export class AddGovernarateDialog {

  governarateId = 0;
  governarateNameEn = '';
  governarateNameAr = '';
  countryId!: number;
  status = true;
  selectedFile?: File;

  constructor(
    private dialogRef: MatDialogRef<AddGovernarateDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private governarateService: GovernarateService,
    private snackBar: MatSnackBar,
    private countryService: CountryService,
    private cdr: ChangeDetectorRef
  ) {
    if (data) {
      this.governarateId = data.governarateId;
      this.governarateNameEn = data.governarateNameEn;
      this.governarateNameAr = data.governarateNameAr;
      this.countryId = data.countryId;
      this.status = data.isActive;
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  save() {
    const formData = new FormData();

    formData.append('GovernarateId', this.governarateId.toString());
    formData.append('GovernarateNameEn', this.governarateNameEn);
    formData.append('GovernarateNameAr', this.governarateNameAr);
    formData.append('CountryId', this.countryId.toString());
    formData.append('IsActive', this.status.toString());

    if (this.selectedFile) {
      formData.append('file', this.selectedFile);
    }

    const request$ = this.governarateId
      ? this.governarateService.updateGovernarate(formData)
      : this.governarateService.createGovernarate(formData);

    request$.subscribe({
      next: () => {
        this.snackBar.open(
          `${this.governarateNameEn ?'Updated' : 'Added'} successfully`,
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
  this.loadCountries();
}

countries: Countrys[] = [];
loadCountries() {
  this.countryService.getCountries().subscribe({
    next: (res) => {
      this.countries = res.data.filter(c => c.isActive);
    },
    error: () => {
      this.snackBar.open('Failed to load countries', 'Close', {
        duration: 3000
      });
    }
  });
} 


}
