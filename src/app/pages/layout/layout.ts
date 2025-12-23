import { Component } from '@angular/core';
import { HeaderComponent } from '../layout/header/header';
import { SidebarComponent } from '../layout/sidebar/sidebar';
import { RouterOutlet } from '@angular/router';
import { Footer } from './footer/footer';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    HeaderComponent,
    SidebarComponent,
    RouterOutlet,
    Footer
  ],
  templateUrl: './layout.html',
  styleUrls: ['./layout.scss']
})
export class Layout {}

