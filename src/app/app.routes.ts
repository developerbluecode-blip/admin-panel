import { Routes } from '@angular/router';
import { Layout } from './pages/layout/layout';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { LoginComponent } from './pages/login/login';
import { authGuard } from './core/guards/auth-guard';
import { AddProperty } from './pages/property-details/add-property-details';
import { PropertyView } from './pages/property-details/property-view';

export const routes: Routes = [

  // 🔓 PUBLIC LOGIN
  { path: 'login', component: LoginComponent },

  // 🔐 PROTECTED AREA
  {
    path: '',
    component: Layout,
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'user-type', loadComponent: () => import('./pages/user-type/user-type').then(m => m.UserType) },
      { path: 'country', loadComponent: () => import('./pages/country/country').then(m => m.Country) },
      { path: 'governarate', loadComponent: () => import('./pages/governarate/governarate').then(m => m.Governarate) },
      { path: 'city', loadComponent: () => import('./pages/city/city').then(m => m.City) },
      { path: 'property-facility-type', loadComponent: () => import('./pages/property-facility-type/property-facility-type').then(m => m.PropertyFacilityType) },
      { path: 'property-type', loadComponent: () => import('./pages/property-type/property-type').then(m => m.PropertyType) },
      { path: 'property-details', loadComponent: () => import('./pages/property-details/property-details').then(m => m.PropertyDetails) },
      { path: 'property-care-taker', loadComponent: () => import('./pages/property-care-taker/property-care-taker').then(m => m.PropertyCareTaker) },
      { path: 'property-care-type', loadComponent: () => import('./pages/property-care-type/property-care-type').then(m => m.PropertyCareTypeComponent) },
      { path: 'payment-mode', loadComponent: () => import('./pages/payment-mode/payment-mode').then(m => m.PaymentMode) },
      { path: 'payment-status', loadComponent: () => import('./pages/payment-status/payment-status').then(m => m.PaymentStatus) },
      { path: 'property-details', loadComponent: () => import('./pages/property-details/property-details').then(m => m.PropertyDetails) },
      { path: 'add-property', loadComponent: () => import('./pages/property-details/add-property-details').then(m => m.AddProperty) },
      { path: 'property-facility-type', loadComponent: () => import('./pages/property-facility-type/property-facility-type').then(m => m.PropertyFacilityType) },
      { path: 'property-facility', loadComponent: () => import('./pages/property-facility/property-facility').then(m => m.PropertyFacility) },
      { path: 'add-property',component: AddProperty },
      { path: 'add-property/:id', component: AddProperty },
      { path: 'property-view/:id',component: PropertyView }

    ]
  },

  // ✅ DEFAULT
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // ❌ FALLBACK
  { path: '**', redirectTo: 'login' }
];
