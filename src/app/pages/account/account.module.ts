import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { AccountComponent } from './account.component';
import { DashboardComponent } from './dashboard/dashboard.component';
//import { ProfileComponent } from './profile/profile.component';
import { PreferenceComponent } from './preference/preference.component';
import { VerificationComponent } from './verification/verification.component';
import { ValidationComponent } from './validation/validation.component';
import { PasswordChangeComponent } from './password-change/password-change.component';
//import { AddressesComponent } from './addresses/addresses.component';
import { CoordonneesComponent } from './coordonnees/coordonnees.component';
//import { FavoritesComponent } from './favorites/favorites.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderComponent } from './orders/order/order.component';
import { CarsComponent } from './cars/cars.component';
import { CarsDialogComponent } from './cars/cars-dialog/cars-dialog.component';


export const routes: Routes = [
  { 
    path: '', 
    component: AccountComponent, children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
     // { path: 'profile', component: ProfileComponent },
      { path: 'verification', component: VerificationComponent },
      { path: 'validation', component: ValidationComponent },
      { path: 'preference', component: PreferenceComponent },
      { path: 'password-change', component: PasswordChangeComponent },
      //{ path: 'addresses', component: AddressesComponent },
      { path: 'monprofile', component: CoordonneesComponent },
     // { path: 'favorites', component: FavoritesComponent },
      { path: 'reservations', component: ReservationsComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'cars', component: CarsComponent },
      { path: 'orders/:id', component: OrderComponent } 
    ]
  }
];


@NgModule({
  declarations: [
    AccountComponent,
    DashboardComponent,
   // ProfileComponent,
    VerificationComponent,
    ValidationComponent,
    PreferenceComponent,
    PasswordChangeComponent,
    //AddressesComponent,
    CoordonneesComponent,
   // FavoritesComponent,
    ReservationsComponent,
    OrdersComponent,
    CarsComponent,
    CarsDialogComponent,
    OrderComponent 
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
  ]
})
export class AccountModule { }
