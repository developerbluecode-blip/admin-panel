import { Component, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { PropertyDetailsService } from './property-details.spec';
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
  {{ propertyContractId ? 'Edit Property Contract' : 'Add Property Contract' }}
</h2>

    </div>

    <!-- BODY -->
    <mat-dialog-content class="dialog-body">

      <div class="row">
        <div class="col-sm-12 mb-3">
          <mat-label>Name</mat-label>
          <input
            matInput
            [(ngModel)]="propertyId"
            class="form-control"
            placeholder="property Id"
            required>
        </div>
        <div class="col-sm-12 mb-3">
          <mat-label>startDate</mat-label>
          <input type="date"
            matInput
            [(ngModel)]="startDate"
            class="form-control"
            placeholder="Enter Start Date"
            required>
        </div>
        <div class="col-sm-12 mb-3">
          <mat-label>endDate</mat-label>
          <input
           type="date"
            matInput
            [(ngModel)]="endDate"
            class="form-control"
            placeholder="Enter End Date"
            required>
        </div>
        <div class="col-sm-12 mb-3">
          <mat-label>Commision</mat-label>
          <input
            matInput
            [(ngModel)]="commision"
            class="form-control"
            placeholder="commision"
            required>
        </div>
        <div class="col-sm-12 mb-3">
          <mat-label>updatedBy</mat-label>
          <input
            matInput
            [(ngModel)]="updatedBy"
            class="form-control"
            placeholder="updatedBy"
            required>
        </div>
        <div class="col-sm-12 mb-3">
          <mat-label>createdBy</mat-label>
          <input
            matInput
            [(ngModel)]="createdBy"
            class="form-control"
            placeholder="Enter PaymentMode(EN)"
            required>
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
export class AddPropertyContractDialog {

  propertyContractId = 0;
  propertyId = 0;
  startDate!: Date;
  endDate!: Date;
  commision=0;
  updatedBy=0;
  createdBy=0;
  status = true;

  constructor(
    private dialogRef: MatDialogRef<AddPropertyContractDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private propertyService: PropertyDetailsService,
    private cdr: ChangeDetectorRef,
    private snackBar: MatSnackBar,
  ) {
    if (data) {
      this.propertyContractId = data.propertyContractId;
    this.propertyId = data.propertyId;
    this.startDate = data.startDate;
    this.endDate = data.endDate;
    this.commision = data.commision;
    this.updatedBy = 0;
    this.createdBy = 0;
    this.status = data.isActive;
    }
  }

 

  save() {
    const formData = new FormData();

    formData.append('propertyContractId', this.propertyContractId.toString());
    formData.append('propertyId', this.propertyId.toString());
    formData.append('startDate', this.startDate.toString());
    formData.append('endDate', this.endDate.toString());
    formData.append('commision', this.commision.toString());
    formData.append('updatedBy', this.updatedBy.toString());
    formData.append('createdBy', this.createdBy.toString());
    formData.append('IsActive', this.status.toString());

    const request$ = this.propertyContractId
      ? this.propertyService.updateContract(formData)
      : this.propertyService.createContract(formData);

    request$.subscribe({
      next: () => {
        this.snackBar.open(
          `${this.propertyContractId ?'Updated' : 'Added'} successfully`,
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




isEditMode(): boolean {
  return this.propertyContractId > 0;
}



}
