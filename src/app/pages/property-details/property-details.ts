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
import { Property } from '../../models/PropertyDetails';
import { PropertyDetailsService } from './property-details.spec';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-property-details',
  imports: [
    RouterModule,
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './property-details.html',
  styleUrl: './property-details.scss',
})

export class PropertyDetails
  implements OnInit, AfterViewInit {

  displayedColumns = [
    'propertyId',
    'propertyNameEn',
    'propertyNameAr',
    'cityId',
    'rentAmount',
    'isActive',
    'actions'
  ];

  dataSource = new MatTableDataSource<Property>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
    private propertyDetailsService: PropertyDetailsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadPropertyDetails();
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

  loadPropertyDetails() {
    this.propertyDetailsService.getPropertyDetails().subscribe({
      next: res => this.dataSource.data = res.data,
      error: err => console.error('Failed to load property Facility types', err)
    });
  }

  onEdit(id: number) {
  this.router.navigate(['/add-property', id]);
}

 onView(id: number) {
  this.router.navigate(['/property-view', id]);
 }

}
