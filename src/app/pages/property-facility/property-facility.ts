import {
  ChangeDetectorRef,
  Component,
  OnInit,
  AfterViewInit,
  ViewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { PropertyFacilitys } from '../../models/PropertyFacility';
import { PropertyFacilityService } from './property-facility.spec';
import { AddPropertyFacilityDialog } from './add-property-facility-dailog';

@Component({
  selector: 'app-property-facility',
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './property-facility.html',
  styleUrl: './property-facility.scss',
})

export class PropertyFacility
  implements OnInit, AfterViewInit {

  displayedColumns = [
    'PropertyFacilityId',
    'PropertyFacilityEn',
    'PropertyFacilityAr',
    'isActive',
    'actions'
  ];

  dataSource = new MatTableDataSource<PropertyFacilitys>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
    private PropertyFacilityService: PropertyFacilityService
  ) {}

  ngOnInit() {
    this.loadPropertyFacilitys();
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

  loadPropertyFacilitys() {
    this.PropertyFacilityService.getPropertyFacilitys().subscribe({
      next: res => this.dataSource.data = res.data,
      error: err => console.error('Failed to load property Facility types', err)
    });
  }

  openAddPropertyFacility() {
    const dialogRef = this.dialog.open(AddPropertyFacilityDialog, {
      width: '500px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(ok => {
      if (ok) this.loadPropertyFacilitys();
    });
  }

  openEditPropertyFacility(row: PropertyFacilitys) {
    const dialogRef = this.dialog.open(AddPropertyFacilityDialog, {
      width: '500px',
      disableClose: true,
      data: row
    });

    dialogRef.afterClosed().subscribe(ok => {
      if (ok) this.loadPropertyFacilitys();
    });
  }
}
