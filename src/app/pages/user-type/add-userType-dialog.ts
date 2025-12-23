import { Component, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { UserTypeService } from './user-type.spec';
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
  {{ userTypeId ? 'Edit UserType' : 'Add UserType' }}
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
            [(ngModel)]="userTypeNameEn"
            class="form-control"
            placeholder="Enter UserType Name(EN)"
            [disabled]="userTypeId > 0"
            required>
        </div>

        <div class="col-sm-12 mb-3">
          <mat-label>Name(AR)</mat-label>
          <input
            matInput
            [(ngModel)]="userTypeNameAr"
            class="form-control"
            placeholder="Enter UserType Name(AR)" dir="rtl"
            [disabled]="userTypeId > 0"
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
export class AddUserTypeDialog {

  userTypeId = 0;
  userTypeNameEn = '';
  userTypeNameAr = '';
  status = true;

  constructor(
    private dialogRef: MatDialogRef<AddUserTypeDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private UserTypeService: UserTypeService,
    private cdr: ChangeDetectorRef,
    private snackBar: MatSnackBar,
  ) {
    if (data) {
      this.userTypeId = data.userTypeId;
    this.userTypeNameEn = data.userTypeEn;
    this.userTypeNameAr = data.userTypeAr;
    this.status = data.isActive;
    }
  }

 

  save() {
    const formData = new FormData();

    formData.append('UserTypeId', this.userTypeId.toString());
    formData.append('UserTypeEn', this.userTypeNameEn);
    formData.append('UserTypeAr', this.userTypeNameAr);
    formData.append('IsActive', this.status.toString());

    const request$ = this.userTypeId
      ? this.UserTypeService.updateUserType(formData)
      : this.UserTypeService.createUserType(formData);

    request$.subscribe({
      next: () => {
        this.snackBar.open(
          `${this.userTypeId ?'Updated' : 'Added'} successfully`,
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
  return this.userTypeId > 0;
}



}
