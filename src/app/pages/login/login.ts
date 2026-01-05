import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { environment } from '../../../environment';
import { __param } from 'tslib';
import { LoginResponse } from '../../models/UserDetails';
import { MaterialModule } from '../../shared/material/material-module';
import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'login',
  imports: [CommonModule, FormsModule, MaterialModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  standalone: true
})
export class LoginComponent {
  emails = '';
  passwords = '';

  constructor(private http: HttpClient, private router: Router) { }



  auth = inject(AuthService);
  onSubmit() {
    const loginUrl = environment.apiBaseUrl + '/UserDetails/userLogin';

    this.http.get<LoginResponse>(loginUrl, {
      params:
      {
        Email: this.emails, Password: this.passwords
      }
    })
      .subscribe({
        next: (res) => {
          if (res?.token) {
            this.auth.login(res.token, res.data);
            localStorage.setItem('UserId', res.data.userId.toString());
            localStorage.setItem('Email', res.data.emailAddress);
            localStorage.setItem('Name', res.data.fullNameEn);
            localStorage.setItem('UserTypeId', res.data.userTypeId.toString());
            localStorage.setItem('FckToken', res.token.toString());


            this.router.navigate(['/dashboard'])
              .then(success => console.log('Navigation success?', success))
              .catch(err => console.error('Navigation error:', err));
          }
        },
        error: (err) => {
          console.error('Login error:', err);
          alert('Invalid email or password!');
        }
      });
  }


}


