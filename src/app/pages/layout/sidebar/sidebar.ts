import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule], // ✅ REQUIRED
  templateUrl: './sidebar.html'
})
export class SidebarComponent {
  openMenu: string | null = null;

  constructor(private router: Router) {}

  toggle(menu: string) {
    this.openMenu = this.openMenu === menu ? null : menu;
  }

  isActive(path: string): boolean {
    return this.router.url.startsWith(path);
  }
}

