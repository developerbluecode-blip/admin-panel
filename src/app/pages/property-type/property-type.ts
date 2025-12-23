import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { AddPropertyTypeDialog } from './add-property-type-dailog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { PropertyTypeService } from './property-type.spec';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { PropertyTypes } from '../../models/PropertyType';

@Component({
  selector: 'app-property-type',
  imports: [
     CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './property-type.html',
  styleUrl: './property-type.scss',
})

export class PropertyType implements OnInit {

  displayedColumns = ['PropertyTypeId', 'PropertyTypeEn', 'PropertyTypeAr', 'isActive', 'actions'];
  dataSource = new MatTableDataSource<PropertyTypes>();

  @ViewChild(MatPaginator, { static: false })
  paginator!: MatPaginator;

    constructor(private cdr: ChangeDetectorRef, private dialog: MatDialog, private PropertyTypeService: PropertyTypeService) {}

      ngOnInit() {
      this.loadPropertyTypes();
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



  loadPropertyTypes() {
    this.PropertyTypeService.getPropertyTypes().subscribe({
      next: (res) => {
        this.dataSource.data = res.data; // 🔥 IMPORTANT
      },
      error: (err) => {
        console.error('Failed to load countries', err);
      }
    });
  }


  openAddPropertyType() {
      const dialogRef = this.dialog.open(AddPropertyTypeDialog, {
        width: '500px',
        maxWidth: '90vw',
        minHeight: '300px',
        disableClose: true,
        autoFocus: false
      });
  
     dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.loadPropertyTypes(); // 🔥 RELOAD TABLE DATA
      }
    });
    }
  
    openEditPropertyType(PropertyTypes: PropertyType) {
    const dialogRef = this.dialog.open(AddPropertyTypeDialog, {
       width: '500px',
        maxWidth: '90vw',
        minHeight: '300px',
        disableClose: true,
        autoFocus: false,
      data: PropertyTypes // 🔥 pass selected row
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.loadPropertyTypes(); // refresh table
      }
    });
  }
  

}
