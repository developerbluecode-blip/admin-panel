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

import { PropertyCareTypeService } from './property-care-type.spec';
import { AddPropertyCareTypeDialog } from './add-property-care-type-dailog';
import { PropertyCareTypes } from '../../models/PropertyCareType';

@Component({
  selector: 'app-property-care-type',
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
  templateUrl: './property-care-type.html',
  styleUrls: ['./property-care-type.scss'],
})
export class PropertyCareTypeComponent
  implements OnInit, AfterViewInit {

  displayedColumns = [
    'PropertyCareTypeId',
    'PropertyCareTypeEn',
    'PropertyCareTypeAr',
    'isActive',
    'actions'
  ];

  dataSource = new MatTableDataSource<PropertyCareTypes>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
    private propertyCareTypeService: PropertyCareTypeService
  ) {}

  ngOnInit() {
    this.loadPropertyCareTypes();
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

  loadPropertyCareTypes() {
    this.propertyCareTypeService.getPropertyCareTypes().subscribe({
      next: res => this.dataSource.data = res.data,
      error: err => console.error('Failed to load property care types', err)
    });
  }

  openAddPropertyCareType() {
    const dialogRef = this.dialog.open(AddPropertyCareTypeDialog, {
      width: '500px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(ok => {
      if (ok) this.loadPropertyCareTypes();
    });
  }

  openEditPropertyCareType(row: PropertyCareTypes) {
    const dialogRef = this.dialog.open(AddPropertyCareTypeDialog, {
      width: '500px',
      disableClose: true,
      data: row
    });

    dialogRef.afterClosed().subscribe(ok => {
      if (ok) this.loadPropertyCareTypes();
    });
  }
}
