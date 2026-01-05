import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AllUsers } from '../../models/AllUsers';
import { AdminListServices } from './admin-list.spec';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-list',
  imports: [
     CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './admin-list.html',
  styleUrl: './admin-list.scss',
})
export class AdminList {

  displayedColumns = ['userId', 'fullNameEn', 'mobileNumber','emailAddress', 'isActive', 'actions'];
  dataSource = new MatTableDataSource<AllUsers>();

  @ViewChild(MatPaginator, { static: false })
  paginator!: MatPaginator;

    constructor(private cdr: ChangeDetectorRef, private dialog: MatDialog, private adminListServices: AdminListServices) {}

      ngOnInit() {
      this.loadAdminList();
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



  loadAdminList() {
    this.adminListServices.getAdminList().subscribe({
      next: (res) => {
        this.dataSource.data = res.data.filter(s=>s.userTypeId == 1); // 🔥 IMPORTANT
      },
      error: (err) => {
        console.error('Failed to load', err);
      }
    });
  }
}
