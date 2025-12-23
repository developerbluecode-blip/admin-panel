import { Component, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { CityService } from './city.spec';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Inject } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { NgSelectModule } from '@ng-select/ng-select';
import { ChangeDetectorRef } from '@angular/core';
import { Governarates } from '../../models/Governarate';
import { GovernarateService } from '../governarate/governarate.spec';
import { MatSnackBarModule } from '@angular/material/snack-bar';


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
  {{ cityId ? 'Edit City' : 'Add City' }}
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
            [(ngModel)]="cityNameEn"
            class="form-control"
            placeholder="Enter City Name(EN)"
            required>
        </div>

        <div class="col-sm-12 mb-3">
          <mat-label>Name(AR)</mat-label>
          <input
            matInput
            [(ngModel)]="cityNameAr"
            class="form-control"
            placeholder="Enter City Name(AR)" dir="rtl"
            required>
        </div>


        <div class="col-sm-12 mb-3">
  <label class="form-label fw-bold">Governarate</label>

  <ng-select
    class="mb-3"
    [items]="governarates"
    bindLabel="governarateNameEn"
    bindValue="governarateId"
    [(ngModel)]="governarateId"
    placeholder="Select Governarate"
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
export class AddCityDialog {

  cityId = 0;
  cityNameEn = '';
  cityNameAr = '';
  governarateId!: number;
  status = true;
  selectedFile?: File;

  constructor(
    private dialogRef: MatDialogRef<AddCityDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private CityService: CityService,
    private cdr: ChangeDetectorRef,
    private governarateService: GovernarateService,
    private snackBar: MatSnackBar,
  ) {
    if (data) {
      this.cityId = data.cityId;
      this.cityNameEn = data.cityNameEn;
      this.cityNameAr = data.cityNameAr;
      this.governarateId = data.governarateId;
      this.status = data.isActive;
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  save() {
    const formData = new FormData();

    formData.append('CityId', this.cityId.toString());
    formData.append('CityNameEn', this.cityNameEn);
    formData.append('CityNameAr', this.cityNameAr);
    formData.append('GovernarateId', (this.governarateId ?? 0).toString());
    formData.append('IsActive', this.status.toString());

    if (this.selectedFile) {
      formData.append('file', this.selectedFile);
    }

    const request$ = this.cityId
      ? this.CityService.updateCity(formData)
      : this.CityService.createCity(formData);

    request$.subscribe({
      next: () => {
        this.snackBar.open(
          `${this.cityId ?'Updated' : 'Added'} successfully`,
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
  this.loadGovernarates();
}



governarates: Governarates[] = [];

loadGovernarates() {
  this.governarateService.getGovernarates().subscribe({
    next: res => {
      this.governarates = res.data;
    },
    error: err => {
      console.error('Failed to load governarates', err);
    }
  });
}




}
