import { isPlatformBrowser } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  user: any;
  getToken() {
    throw new Error('Method not implemented.');
  }

  constructor(private router: Router) { this.getUser();}

  login(token: string, user: any) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return typeof window !== 'undefined' && !!localStorage.getItem('token');
  }

  

  getUser() {
    //if (this.user) return this.user;

    if (isPlatformBrowser(this.platformId)) {
      const u = localStorage.getItem('user');
      this.user = u ? JSON.parse(u) : null;
    }
    return this.user;
  }
  platformId(platformId: any) {
    throw new Error('Method not implemented.');
  }
}



// import { Injectable, inject, PLATFORM_ID } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';
// import { isPlatformBrowser } from '@angular/common';
// import { Router } from '@angular/router';

// @Injectable({ providedIn: 'root' })
// export class AuthService {

//   private platformId = inject(PLATFORM_ID);
//   private userSubject = new BehaviorSubject<any>(null);
//   user$ = this.userSubject.asObservable();

//   constructor(private router: Router) {
//     if (isPlatformBrowser(this.platformId)) {
//       const user = localStorage.getItem('user');
//       if (user) {
//         this.userSubject.next(JSON.parse(user));
//       }
//     }
//   }

//   login(token: string, user: any) {
//     if (isPlatformBrowser(this.platformId)) {
//       localStorage.setItem('token', token);
//       localStorage.setItem('user', JSON.stringify(user));
//     }
//     this.userSubject.next(user);
//   }

//   logout() {
//     if (isPlatformBrowser(this.platformId)) {
//       localStorage.clear();
//     }
//     this.userSubject.next(null);
//   }

//   isLoggedIn(): boolean {
//     return isPlatformBrowser(this.platformId)
//       ? !!localStorage.getItem('token')
//       : false;
//   }

//   getUser() {
//     return this.userSubject.value;
//   }
// }

