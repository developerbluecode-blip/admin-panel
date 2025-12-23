import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { ChangeDetectorRef } from '@angular/core';
import { AddCountryDialog } from './add-country-dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { CountryService } from './country.service';
import { Countrys } from '../../models/Country';
import { Result } from '../../models/Result';
import { environment } from '../../../environment';


@Component({
  selector: 'app-country',
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
  templateUrl: './country.html',
  styleUrl: './country.scss',
})
export class Country implements AfterViewInit {

  displayedColumns = ['countryId', 'imageName', 'countryNameEn', 'countryNameAr', 'countryCode', 'currencyEn', 'currencyAr',  'isActive', 'actions'];

  dataSource = new MatTableDataSource<Countrys>();

  @ViewChild(MatPaginator, { static: false })
  paginator!: MatPaginator;

    constructor(private cdr: ChangeDetectorRef, private dialog: MatDialog, private countryService: CountryService) {}

      ngOnInit() {
    this.loadCountries();
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



  loadCountries() {
    this.countryService.getCountries().subscribe({
      next: (res) => {
        this.dataSource.data = res.data; // 🔥 IMPORTANT
      },
      error: (err) => {
        console.error('Failed to load countries', err);
      }
    });
  }

 confirmDelete(row: Countrys) {
  if (!confirm(`Delete ${row.countryNameEn}?`)) return;

  this.countryService.deleteCountry(row.countryId).subscribe({
    next: (res) => {
      if (res.isSuccess) {
        alert('Country deleted successfully');
        this.loadCountries();
      } else {
        alert(res.message);
      }
    },
    error: () => {
      alert('Delete failed');
    }
  });
}


deleteCountry(id: number) {
  this.countryService.deleteCountry(id).subscribe({
    next: (res) => {
      if (res.isSuccess) {
        alert('Country deleted successfully');
        this.loadCountries(); // 🔄 reload table
      } else {
        alert(res.message);
      }
    },
    error: () => {
      alert('Failed to delete country');
    }
  });
}



getImageUrl(imageName: string): string {
  if (!imageName) {
    return 'assets/no-image.png';
  }

  // If API already returns full URL
  if (imageName.startsWith('http')) {
    return imageName;
  }

  // If relative path
  return `${environment.BaseUrl}/${imageName}`;
}


  openAddCountry() {
    const dialogRef = this.dialog.open(AddCountryDialog, {
      width: '500px',
      maxWidth: '90vw',
      minHeight: '300px',
      disableClose: true,
      autoFocus: false
    });

   dialogRef.afterClosed().subscribe(result => {
    if (result === true) {
      this.loadCountries(); // 🔥 RELOAD TABLE DATA
    }
  });
  }

  openEditCountry(country: Countrys) {
  const dialogRef = this.dialog.open(AddCountryDialog, {
     width: '500px',
      maxWidth: '90vw',
      minHeight: '300px',
      disableClose: true,
      autoFocus: false,
    data: country // 🔥 pass selected row
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result === true) {
      this.loadCountries(); // refresh table
    }
  });
}

  
}
