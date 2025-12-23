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
import { PropertyFacilityTypes } from '../../models/PropertyFacilityType';
import { PropertyFacilityTypeService } from './property-facility-type.spec';
import { AddPropertyFacilityTypeDialog } from './add-property-facility-type-dailog';

@Component({
  selector: 'app-property-facility-type',
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './property-facility-type.html',
  styleUrl: './property-facility-type.scss',
})

export class PropertyFacilityType
  implements OnInit, AfterViewInit {

  displayedColumns = [
    'PropertyFacilityTypeId',
    'PropertyFacilityTypeEn',
    'PropertyFacilityTypeAr',
    'isActive',
    'actions'
  ];

  dataSource = new MatTableDataSource<PropertyFacilityTypes>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
    private propertyFacilityTypeService: PropertyFacilityTypeService
  ) {}

  ngOnInit() {
    this.loadPropertyFacilityTypes();
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

  loadPropertyFacilityTypes() {
    this.propertyFacilityTypeService.getPropertyFacilityTypes().subscribe({
      next: res => this.dataSource.data = res.data,
      error: err => console.error('Failed to load property Facility types', err)
    });
  }

  openAddPropertyFacilityType() {
    const dialogRef = this.dialog.open(AddPropertyFacilityTypeDialog, {
      width: '500px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(ok => {
      if (ok) this.loadPropertyFacilityTypes();
    });
  }

  openEditPropertyFacilityType(row: PropertyFacilityTypes) {
    const dialogRef = this.dialog.open(AddPropertyFacilityTypeDialog, {
      width: '500px',
      disableClose: true,
      data: row
    });

    dialogRef.afterClosed().subscribe(ok => {
      if (ok) this.loadPropertyFacilityTypes();
    });
  }
}
