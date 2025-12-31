import { CommonModule } from "@angular/common";
import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { NgSelectModule } from "@ng-select/ng-select";
import { CityService } from "../city/city.spec";
import { CountryService } from "../country/country.service";
import { GovernarateService } from "../governarate/governarate.spec";
import { PropertyTypeService } from "../property-type/property-type.spec";
import { UserDetailsService } from "../user-details/user-details.spec";
import { PropertyDetailsService } from "./property-details.spec";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { MatDialog } from "@angular/material/dialog";
import { PropertyImages } from "../../models/PropertyImage";
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { environment } from "../../../environment";
import { Property } from "../../models/PropertyDetails";
import { Countrys } from "../../models/Country";
import {UserTypeService} from '../user-type/user-type.spec'
import { PropertyContract } from "../../models/PropertyContract";
import { AddPropertyContractDialog } from "./add-property-contract-dailog";
import { AddPropertyImageDialog } from "./add-property-image-dailog";
import { PropertyFacilityWithType } from '../../models/PropertyFacilityWithType';
import { PropertyFacilityTypes } from '../../models/PropertyFacilityType';
import { PropertyFacilityTypeService } from '../property-facility-type/property-facility-type.spec';
import { PropertyFacilityService } from '../property-facility/property-facility.spec';


@Component({
  selector: 'app-add-property',
  templateUrl: './property-view.html',
  styleUrls: ['./property-details.scss'],
  imports:[
CommonModule, RouterModule, ReactiveFormsModule, NgSelectModule, MatSlideToggleModule,MatPaginatorModule,MatTableModule,MatIconModule, MatTableModule,
    MatPaginatorModule,MatFormFieldModule,MatInputModule,
    MatIconModule,
  ],
  standalone: true,
})

export class PropertyView implements AfterViewInit  {

  activeTab: 'images' | 'contract' | 'facility' = 'images';

 constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private propertyService: PropertyDetailsService,
    private countryService: CountryService,
    private governarateService: GovernarateService,
    private cityService: CityService,
    private propertyTypeService: PropertyTypeService,
    private userService: UserDetailsService,
    private cdr: ChangeDetectorRef, 
    private dialog: MatDialog, 
    private UserTypeService: UserTypeService,
    private propertyFacilityTypeService: PropertyFacilityTypeService,
    private propertyFacilityService: PropertyFacilityService,
  ) {}

    form!: FormGroup;
  isEditMode = false;
  propertyId!: number;
  selectedFile?: File;
  governorateId: number | null = null;
  countryId: number | null = null;

  countries: any[] = [];
  governarates: any[] = [];
  citys: any[] = [];
  propertyTypes: any[] = [];
  propertyOwners: any[] = [];
  propertyViews!:Property;
  propertyImages: any[] =[];
  PropertyFacilityWithType: any[] =[];

  
  ngOnInit(): void {
  //this.buildForm();

  // ✅ FIRST setup listeners
  //this.setupCascadingDropdowns();

  const idParam = this.route.snapshot.paramMap.get('id');

if (idParam && !isNaN(+idParam)) {
  this.isEditMode = true;
  this.propertyId = Number(idParam);
}
this.loadProType();
this.loadUser();
this.loadCity();
this.loadCountries(); 
  this.loadInitialData();
  this.loadfacility();
  }
  
  
propertyViewsDataSource = new MatTableDataSource<Property>();
propertyImagesDataSource = new MatTableDataSource<any>();
propertyContractDataSource = new MatTableDataSource<any>();
propertyFacilityDataSource = new MatTableDataSource<any>();

loadInitialData() {
//   this.propertyService.getPropertyView(this.propertyId).subscribe(res => {
//   this.propertyViewsDataSource.data = res.data ? [res.data] : [];
// });

this.propertyService.getPropertyView(this.propertyId).subscribe({
  next: res => {
    this.propertyViewsDataSource.data = res.data ? [res.data] : [];

    const propertyTypeId =
      this.propertyViewsDataSource.data[0]?.propertyTypeId;

    if (!propertyTypeId) {
      console.warn('PropertyTypeId not found');
      return;
    }

    this.propertyFacilityService.getPropertyFacilitys().subscribe({
      next: facRes => {
        this.propertyFacilityDataSource.data =
          facRes.data.filter(s => s.propertyTypeId === propertyTypeId && s.isActive == true);
      },
      error: err => console.error('Facility API failed', err)
    });
  },
  error: err => console.error('PropertyView API failed', err)
});



  this.propertyService.getPropertyImages(this.propertyId).subscribe(res => {
    this.propertyImagesDataSource.data = res.data ?? [];
  });

  this.propertyService.getContractList(this.propertyId).subscribe(res => {
    this.propertyContractDataSource.data = res.data ?? [];
  });

//   this.propertyService.getFacilityType(this.propertyId).subscribe(res => {
//     this.propertyContractDataSource.data = res.data ?? [];
//   });

//   this.propertyFacilityService.getPropertyFacilitys().subscribe({
//       next: res => this.propertyFacilityDataSource.data = res.data.filter(s => s.propertyTypeId === this.propertyId),
//       error: err => console.error('Failed to load property Facility types', err)
//     });
}


     
 propertyViewsColumns = ['propertyId',
    'propertyNameEn',
    'propertyNameAr',
    'propertyTypeId',
    'propertyOwnerId',
    'countryId',
    'cityId',
    'propertyAddress',
    'createDate',
    'createBy',
    'updateDate',
    'updateBy',
    'latitude',
    'longitude',
    'totalRoom',
    'rentAmount',
    'propertyDescriptionEn',
    'propertyDescriptionAr',
    'isActive',
    'isBlock'];
  propertyImagesColumns =  ['imageId', 'imageName', 'createDate', 'createdBy', 'isActive', 'actions'];
  propertyContractColumns = ['propertyContractId', 'startDate', 'endDate', 'commision', 'createDate', 'createdBy', 'updateDate', 'updateBy', 'isActive', 'actions'];
  propertyFacilityColumns = ['Facility'];

  @ViewChild('viewsPaginator') viewsPaginator!: MatPaginator;
  @ViewChild('imagesPaginator') imagesPaginator!: MatPaginator;
  @ViewChild('contractPaginator') contractPaginator!: MatPaginator;
  @ViewChild('facilityPaginator') facilityPaginator!: MatPaginator;

    ngAfterViewInit() {
        this.propertyViewsDataSource.paginator = this.viewsPaginator;
    this.propertyImagesDataSource.paginator = this.imagesPaginator;
    this.propertyContractDataSource.paginator=this.contractPaginator;
    this.propertyFacilityDataSource.paginator=this.facilityPaginator;
     this.cdr.detectChanges();
  }
  

applyFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.propertyImagesDataSource.filter = value.trim().toLowerCase();
    this.propertyImagesDataSource.paginator?.firstPage();

    this.propertyContractDataSource.filter = value.trim().toLowerCase();
    this.propertyContractDataSource.paginator?.firstPage();
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


getCountryName(countryId: number | null): string {
  if (!countryId) return '-';
  return this.countryMap.get(countryId) ?? '-';
}

cityMap = new Map<number, string>();

loadCity() {
  this.cityService.getCitys().subscribe(res => {
    this.cityMap.clear();

    res.data.forEach(c => {
      this.cityMap.set(
        c.cityId,
        c.cityNameEn ?? '-'
      );
    });
  });
}


getCityName(cityId: number | null): string {
  if (!cityId) return '-';
  return this.cityMap.get(cityId) ?? '-';
}

userMap = new Map<number, string>();

loadUser() {
  this.userService.getUserDetails().subscribe(res => {
    this.userMap.clear();

    res.data.forEach(c => {
      this.userMap.set(
        c.userId,
        c.fullNameEn ?? '-'
      );
    });
  });
}


getUserName(userId: number | null): string {
  if (!userId) return '-';
  return this.userMap.get(userId) ?? '-';
}

proTypeMap = new Map<number, string>();

loadProType() {
  this.propertyTypeService.getPropertyTypes().subscribe(res => {
    this.proTypeMap.clear();

    res.data.forEach(c => {
      this.proTypeMap.set(
        c.propertyTypeId,
        c.propertyTypeNameEn ?? '-'
      );
    });
  });
}


getProTypeName(userTypeId: number | null): string {
  if (!userTypeId) return '-';
  return this.proTypeMap.get(userTypeId) ?? '-';
}

proTfacility = new Map<number, string>();

loadfacility() {
  this.propertyFacilityTypeService.getPropertyFacilityTypes().subscribe(res => {
    this.proTfacility.clear();

    res.data.forEach(c => {
      this.proTfacility.set(
        c.propertyFacilityTypeId,
        c.propertyFacilityNameEn ?? '-'
      );
    });
  });
}


getfacility(propertyTypeId: number | null): string {
  if (!propertyTypeId) return '-';
  return this.proTfacility.get(propertyTypeId) ?? '-';
}


  openAddContract() {
     const propertyIds = Number(this.route.snapshot.paramMap.get('id'));
      const dialogRef = this.dialog.open(AddPropertyContractDialog, {
        width: '500px',
        maxWidth: '90vw',
        minHeight: '300px',
        disableClose: true,
        autoFocus: false,
        data: {
      propertyId: propertyIds
    }
      });
  
     dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.loadInitialData(); // 🔥 RELOAD TABLE DATA
      }
    });
    }
  
    openEditContract(propertyContract: PropertyContract) {
    const dialogRef = this.dialog.open(AddPropertyContractDialog, {
       width: '500px',
        maxWidth: '90vw',
        minHeight: '300px',
        disableClose: true,
        autoFocus: false,
      data: propertyContract // 🔥 pass selected row
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.loadInitialData(); // refresh table
      }
    });
    this.loadInitialData();
  }


  openAddImage(){
    const propertyIds = Number(this.route.snapshot.paramMap.get('id'));
      const dialogRef = this.dialog.open(AddPropertyImageDialog, {
        width: '500px',
        maxWidth: '90vw',
        minHeight: '300px',
        disableClose: true,
        autoFocus: false,
        data: {
      propertyId: propertyIds
    }
      });
  
     dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.loadInitialData(); // 🔥 RELOAD TABLE DATA
      }
    });

}

    openEditImage(propertyImages: PropertyImages){
        const dialogRef = this.dialog.open(AddPropertyImageDialog, {
       width: '500px',
        maxWidth: '90vw',
        minHeight: '300px',
        disableClose: true,
        autoFocus: false,
      data: propertyImages // 🔥 pass selected row
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.loadInitialData(); // refresh table
      }
    });
    this.loadInitialData();
    
  }
  
}
