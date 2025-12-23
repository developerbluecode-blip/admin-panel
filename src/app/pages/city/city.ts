import { AfterViewInit, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CountryService } from '../country/country.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Citys } from '../../models/City';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { environment } from '../../../environment';
import { Governarates } from '../../models/Governarate';
import { AddCityDialog } from './add-city-dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CityService } from './city.spec';
import { GovernarateService } from '../governarate/governarate.spec';


@Component({
  selector: 'app-city',
  imports: [
     CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './city.html',
  styleUrl: './city.scss',
})

export class City implements AfterViewInit {

  displayedColumns = ['cityId', 'imageName', 'cityNameEn', 'cityNameAr', 'governarateId', 'isActive', 'actions'];

  dataSource = new MatTableDataSource<Citys>();

  @ViewChild(MatPaginator, { static: false })
  paginator!: MatPaginator;

    constructor(private cdr: ChangeDetectorRef, private dialog: MatDialog, private CityService: CityService, private GovernarateService: GovernarateService) {}

      ngOnInit() {
      this.loadGovernarates();
      this.loadCitys();
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



  loadCitys() {
    this.CityService.getCitys().subscribe({
      next: (res) => {
        this.dataSource.data = res.data; // 🔥 IMPORTANT
      },
      error: (err) => {
        console.error('Failed to load countries', err);
      }
    });
  }

 confirmDelete(row: Citys) {
  if (!confirm(`Delete ${row.cityNameEn}?`)) return;

  this.CityService.deleteCity(row.cityId).subscribe({
    next: (res) => {
      if (res.isSuccess) {
        alert('City deleted successfully');
        this.loadCitys();
      } else {
        alert(res.message);
      }
    },
    error: () => {
      alert('Delete failed');
    }
  });
}


deleteCity(id: number) {
  this.CityService.deleteCity(id).subscribe({
    next: (res) => {
      if (res.isSuccess) {
        alert('City deleted successfully');
        this.loadCitys(); // 🔄 reload table
      } else {
        alert(res.message);
      }
    },
    error: () => {
      alert('Failed to delete City');
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


  openAddCity() {
    const dialogRef = this.dialog.open(AddCityDialog, {
      width: '500px',
      maxWidth: '90vw',
      minHeight: '300px',
      disableClose: true,
      autoFocus: false
    });

   dialogRef.afterClosed().subscribe(result => {
    if (result === true) {
      this.loadCitys(); // 🔥 RELOAD TABLE DATA
    }
  });
  }

  openEditCity(city: Citys) {
  const dialogRef = this.dialog.open(AddCityDialog, {
     width: '500px',
      maxWidth: '90vw',
      minHeight: '300px',
      disableClose: true,
      autoFocus: false,
    data: city // 🔥 pass selected row
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result === true) {
      this.loadCitys(); // refresh table
    }
  });
}


governarates: Governarates[] = [];
governarateMap = new Map<number, string>();
loadGovernarates() {
  this.GovernarateService.getGovernarates().subscribe(res => {
    this.governarateMap.clear();

    res.data.forEach(c => {
      this.governarateMap.set(
        c.governarateId,
        c.governarateNameEn ?? '-'
      );
    });
  });
}

getGovernarateName(governarateId: number): string {
  return this.governarateMap.get(governarateId) ?? '-';
}

}

