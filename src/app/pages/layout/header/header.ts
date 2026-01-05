import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, inject } from '@angular/core';
import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrls: ['./header.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class HeaderComponent implements OnInit {


  private platformId = inject(PLATFORM_ID);


  userlog: any;

  constructor(private auth: AuthService) { }
  Name: string = '';
  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const UserId = localStorage.getItem('UserId');
      if (UserId) {
        const Email = localStorage.getItem('Email');
        this.Name = localStorage.getItem('Name') ?? '';

      }
    }
  }



 logout() {
    localStorage.clear();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  }
  
  isUserDropdownOpen = false;

  toggleUserDropdown() {
    this.isUserDropdownOpen = !this.isUserDropdownOpen;
  }

  closeUserDropdown() {
    this.isUserDropdownOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.nav-item.dropdown')) {
      this.isUserDropdownOpen = false;
    }
  }

  toggleSidebar() {
    document.body.classList.toggle('sidebar-collapse');
  }
}
