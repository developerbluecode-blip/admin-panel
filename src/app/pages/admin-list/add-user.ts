import { Component, OnInit } from '@angular/core'; import { CommonModule } from '@angular/common'; 
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms'; 
import { ActivatedRoute, Router, RouterModule } from '@angular/router'; import { NgSelectModule } from '@ng-select/ng-select'; 
import { MatSnackBar } from '@angular/material/snack-bar'; import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AdminListServices } from './admin-list.spec';
import { UserTypeService } from '../user-type/user-type.spec';
import { UserTypes } from '../../models/userType';
import { Gender } from '../../models/Genders'
import { Observable } from 'rxjs';
import { Result } from '../../models/Result';
import { environment } from '../../../environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-User',
  templateUrl: './add-User.html',
  styleUrls: ['./admin-list.scss'],
  imports:[
CommonModule, RouterModule, ReactiveFormsModule, NgSelectModule, MatSlideToggleModule,
  ],
  standalone: true,
})
export class AddUser implements OnInit {

  form!: FormGroup;
  isEditMode = false;
  userId!: number;
  selectedFile?: File;
    userTypes!: UserTypes[];
    genders!: Gender[];
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private UserTypeService: UserTypeService,
    private AdminListServices: AdminListServices,
    private http: HttpClient
  ) {}

ngOnInit(): void {
  this.buildForm();
  this.loadInitialData();


  const idParam = this.route.snapshot.paramMap.get('id');

if (idParam && !isNaN(+idParam)) {
  this.isEditMode = true;
  this.userId = Number(idParam);
  this.loadUserForEdit(this.userId);
}
}


  // ---------------- FORM ----------------
  buildForm() {
    this.form = this.fb.group({
      userId: [null],
      userTypeId: [null],
      fullNameEn: [''],
      fullNameAr: [''],
      mobileNumber: [''],
      emailAddress: [''],
      userPassword: [''],
      userAddressEn: [''],
      userAddressAr: [''],
      createDate: [''],
      createdBy: [''],
      updateDate: [''],
       updatedBy: [''],
      isActive: [true],
      isBlock: [false],
      fcmKey: [''],
        imageName: [''],
        gender: [null],
        note: [''],
        civilId: [null]
    });
  }


  // ---------------- LOAD DATA ----------------
  loadInitialData() {
    this.UserTypeService.getUserTypes().subscribe(res => this.userTypes = res.data.filter(c=> c.isActive == true));
   
    const loginUrl = environment.apiBaseUrl +'/Gender/GenderList';
    this.http.get<Result<Gender[]>>(loginUrl).subscribe(res =>this.genders = res.data);
      
  }

  

  // ---------------- EDIT ----------------


loadUserForEdit(UserId: number) {
  this.AdminListServices.getUserDetails(UserId).subscribe({
    next: res => {

      // if (!res || !res.data) {
      //   console.error('User not found');
      //   return;
      // }

      const p = res.data;

      // 1️⃣ Patch SIMPLE fields first
      this.form.patchValue({
        userId:p.userId,
        fullNameEn: p.fullNameEn,
        fullNameAr: p.fullNameAr,
        userTypeId: p.userTypeId,
        mobileNumber: p.mobileNumber,
        emailAddress: p.emailAddress,
        userPassword: p.userPassword,
        userAddressEn: p.userAddressEn,
        userAddressAr: p.userAddressAr,
        createDate: p.createDate,
        createdBy: p.createdBy,
        updateDate: p.updateDate,
        updatedBy:p.updatedBy,
        fcmKey:p.fcmKey,
        imageNmae:p.imageName,
        gender:p.gender,
        note:p.note,
        civilId:p.civilId,
        isActive: p.isActive,
        isBlock: p.isBlock
      });

     
    },
    error: err => console.error(err)
  });
}




  // ---------------- SAVE ----------------
  onSave() {
    if (this.form.invalid) return;

    const formData = new FormData();

    Object.entries(this.form.value).forEach(([k, v]) => {
      if (v !== null && v !== undefined) formData.append(k, v.toString());
    });

    if (this.selectedFile) {
      formData.append('file', this.selectedFile);
    }

    const api$ = this.isEditMode
      ? this.AdminListServices.updateAdminList(formData)
      : this.AdminListServices.createAdminList(formData);

    api$.subscribe({
      next: () => {
        this.snackBar.open(
          this.isEditMode ? 'User updated successfully' : 'User added successfully',
          'Close',
          {
            duration: 4000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['success-snackbar']
          }
        );
        this.router.navigate(['/User-details']);
      },
      error: () => {
        this.snackBar.open(
          'Operation failed ❌',
          'Close',
          {
            duration: 4000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['fail-snackbar']
          }
        );
      }
    });
  }
}
