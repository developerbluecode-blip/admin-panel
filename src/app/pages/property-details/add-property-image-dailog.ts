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
  {{ imageId ? 'Edit Property Image' : 'Add Property Image' }}
</h2>

    </div>

    <!-- BODY -->
    <mat-dialog-content class="dialog-body">

      <div class="row">
        <div class="col-sm-12 mb-3" style="display: none;">
          <mat-label>imageId</mat-label>
          <input
            matInput
            [(ngModel)]="imageId"
            class="form-control"
            placeholder="property Id"
            required>
        </div>

        <div class="col-sm-12 mb-3" [hidden]="imageId">
          <mat-label>Upload Image</mat-label>
          <input
            type="file"
            class="form-control"
            (change)="onFileSelected($event)">
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
export class AddPropertyImageDialog {

  imageId = 0;
  propertyId = 0;
  //imageName= '';
  createdBy=0;
  status = false;
  selectedFile?: File;

  constructor(
    private dialogRef: MatDialogRef<AddPropertyImageDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private propertyService: PropertyDetailsService,
    private cdr: ChangeDetectorRef,
    private snackBar: MatSnackBar,
  ) {

    if (data) {
      this.imageId = data.imageId ?? 0;
    this.propertyId = data.propertyId ?? 2;
    //this.imageName = data.imageName;
    this.createdBy = 0;
    this.status = data.isActive ?? false;
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

 

  save() {
    const formData = new FormData();

    formData.append('imageId', this.imageId.toString());
    formData.append('propertyId', this.propertyId.toString());
    //formData.append('imageName', this.imageName.toString());
    formData.append('createdBy', this.createdBy.toString());
    formData.append('IsActive', this.status.toString());
    if (this.selectedFile) {
      formData.append('file', this.selectedFile);
    }

    const request$ = this.imageId
      ? this.propertyService.updatePropertyImage(formData)
      : this.propertyService.createPropertyImage(formData);

    request$.subscribe({
      next: () => {
        this.snackBar.open(
          `${this.imageId ?'Updated' : 'Added'} successfully`,
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
  return this.imageId > 0;
}



}
