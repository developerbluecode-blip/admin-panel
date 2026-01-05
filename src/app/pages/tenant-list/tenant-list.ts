import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AllUsers } from '../../models/AllUsers';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TenantListServices } from './tenant-list.spec'

@Component({
  selector: 'app-tenant-list',
  imports: [
     CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './tenant-list.html',
  styleUrl: './tenant-list.scss',
})

export class TenantList {

  displayedColumns = ['userId', 'fullNameEn', 'mobileNumber','emailAddress', 'isActive', 'actions'];
  dataSource = new MatTableDataSource<AllUsers>();

  @ViewChild(MatPaginator, { static: false })
  paginator!: MatPaginator;

    constructor(private cdr: ChangeDetectorRef, private dialog: MatDialog, private TenantListServices: TenantListServices) {}

      ngOnInit() {
      this.loadTenantList();
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



  loadTenantList() {
    this.TenantListServices.getTenantList().subscribe({
      next: (res) => {
        this.dataSource.data = res.data.filter(s=>s.userTypeId == 3); // 🔥 IMPORTANT
      },
      error: (err) => {
        console.error('Failed to load', err);
      }
    });
  }
}