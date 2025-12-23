import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { environment } from '../../../environment';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Governarates } from '../../models/Governarate';
import { GovernarateService } from './governarate.spec';
import { AddGovernarateDialog } from './add-governarate-dialog';
import { CountryService } from '../country/country.service';
import { Countrys } from '../../models/Country';

@Component({
  selector: 'app-governarate',
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './governarate.html',
  styleUrl: './governarate.scss',
})
export class Governarate implements AfterViewInit {

  displayedColumns = ['governarateId', 'imageName', 'governarateNameEn', 'governarateNameAr', 'countryId', 'isActive', 'actions'];

  dataSource = new MatTableDataSource<Governarates>();

  @ViewChild(MatPaginator, { static: false })
  paginator!: MatPaginator;

    constructor(private cdr: ChangeDetectorRef, private dialog: MatDialog, private GovernarateService: GovernarateService, private countryService: CountryService) {}

      ngOnInit() {
      this.loadCountries();
  this.loadGovernarates();
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



  loadGovernarates() {
    this.GovernarateService.getGovernarates().subscribe({
      next: (res) => {
        this.dataSource.data = res.data; // 🔥 IMPORTANT
      },
      error: (err) => {
        console.error('Failed to load countries', err);
      }
    });
  }

 confirmDelete(row: Governarates) {
  if (!confirm(`Delete ${row.governarateNameEn}?`)) return;

  this.GovernarateService.deleteGovernarate(row.governarateId).subscribe({
    next: (res) => {
      if (res.isSuccess) {
        alert('Governarate deleted successfully');
        this.loadGovernarates();
      } else {
        alert(res.message);
      }
    },
    error: () => {
      alert('Delete failed');
    }
  });
}


deleteGovernarate(id: number) {
  this.GovernarateService.deleteGovernarate(id).subscribe({
    next: (res) => {
      if (res.isSuccess) {
        alert('Governarate deleted successfully');
        this.loadGovernarates(); // 🔄 reload table
      } else {
        alert(res.message);
      }
    },
    error: () => {
      alert('Failed to delete Governarate');
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


  openAddgovernarate() {
    const dialogRef = this.dialog.open(AddGovernarateDialog, {
      width: '500px',
      maxWidth: '90vw',
      minHeight: '300px',
      disableClose: true,
      autoFocus: false
    });

   dialogRef.afterClosed().subscribe(result => {
    if (result === true) {
      this.loadGovernarates(); // 🔥 RELOAD TABLE DATA
    }
  });
  }

  openEditGovernarate(governarate: Governarates) {
  const dialogRef = this.dialog.open(AddGovernarateDialog, {
     width: '500px',
      maxWidth: '90vw',
      minHeight: '300px',
      disableClose: true,
      autoFocus: false,
    data: governarate // 🔥 pass selected row
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result === true) {
      this.loadGovernarates(); // refresh table
    }
  });
}


countries: Countrys[] = [];
countryMap = new Map<number, string>();
loadCountries() {
  this.countryService.getCountries().subscribe(res => {
    this.countryMap.clear();

    res.data.forEach(c => {
      this.countryMap.set(
        c.countryId,
        c.countryNameEn ?? '-'
      );
    });
  });
}

getCountryName(countryId: number): string {
  return this.countryMap.get(countryId) ?? '-';
}

}
