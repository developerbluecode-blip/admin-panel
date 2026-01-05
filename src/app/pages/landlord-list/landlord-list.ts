import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AllUsers } from '../../models/AllUsers';
import { LandlordListServices } from '../landlord-list/landlord-list.spec';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-landlord-list',
  imports: [
     CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './landlord-list.html',
  styleUrl: './landlord-list.scss',
})

export class LandlordList {

  displayedColumns = ['userId', 'fullNameEn', 'mobileNumber','emailAddress', 'isActive', 'actions'];
  dataSource = new MatTableDataSource<AllUsers>();

  @ViewChild(MatPaginator, { static: false })
  paginator!: MatPaginator;

    constructor(private cdr: ChangeDetectorRef, private dialog: MatDialog, private LandlordListServices: LandlordListServices) {}

      ngOnInit() {
      this.loadLandlordList();
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



  loadLandlordList() {
    this.LandlordListServices.getLandlordList().subscribe({
      next: (res) => {
        this.dataSource.data = res.data.filter(s=>s.userTypeId == 2); // 🔥 IMPORTANT
      },
      error: (err) => {
        console.error('Failed to load', err);
      }
    });
  }
}