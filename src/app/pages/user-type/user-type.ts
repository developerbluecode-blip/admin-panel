import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment';
import { UserTypes } from '../../models/userType';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { UserTypeService } from './user-type.spec';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AddUserTypeDialog } from './add-userType-dialog';

@Component({
  selector: 'app-user-type',
  standalone: true,
  imports: [
     CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './user-type.html',
  styleUrl: './user-type.scss'
})
export class UserType implements OnInit {

  displayedColumns = ['userTypeId', 'userTypeEn', 'userTypeAr', 'isActive', 'actions'];
  dataSource = new MatTableDataSource<UserTypes>();

  @ViewChild(MatPaginator, { static: false })
  paginator!: MatPaginator;

    constructor(private cdr: ChangeDetectorRef, private dialog: MatDialog, private UserTypeService: UserTypeService) {}

      ngOnInit() {
      this.loadUserTypes();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.cdr.detectChanges();
  }

  applyFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.dataSource.filter = value.trim().toLowerCase();
    this.dataSource.paginator?.firstPage();
  }



  loadUserTypes() {
    this.UserTypeService.getUserTypes().subscribe({
      next: (res) => {
        this.dataSource.data = res.data; // 🔥 IMPORTANT
      },
      error: (err) => {
        console.error('Failed to load countries', err);
      }
    });
  }


  openAddUserType() {
      const dialogRef = this.dialog.open(AddUserTypeDialog, {
        width: '500px',
        maxWidth: '90vw',
        minHeight: '300px',
        disableClose: true,
        autoFocus: false
      });
  
     dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.loadUserTypes(); // 🔥 RELOAD TABLE DATA
      }
    });
    }
  
    openEditUserType(userTypes: UserTypes) {
    const dialogRef = this.dialog.open(AddUserTypeDialog, {
       width: '500px',
        maxWidth: '90vw',
        minHeight: '300px',
        disableClose: true,
        autoFocus: false,
      data: userTypes // 🔥 pass selected row
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.loadUserTypes(); // refresh table
      }
    });
  }
  

}
