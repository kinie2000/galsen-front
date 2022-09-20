import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router'; 
import { SharedModule } from '../../shared/shared.module';
import { LocataireComponent } from './locataire/locataire.component';
import { ProprietaireComponent } from './proprietaire/proprietaire.component';
// import { CarsComponent } from '../mes-vehicules/cars/cars.component';
// import { CarsDialogComponent } from '../mes-vehicules/cars/cars-dialog/cars-dialog.component';

export const routes: Routes = [ 
  { path: '', redirectTo: 'list', pathMatch: 'full'},
  { path: 'locataire', component: LocataireComponent, data: { breadcrumb: 'En tant que locataire' }},
  //{ path: 'locataire', component: CarsComponent, data: { breadcrumb: 'En tant que locataire' }},
  { path: 'proprietaire', component: ProprietaireComponent, data: { breadcrumb: 'En tant que proprietaire' }},
 
];

@NgModule({
  declarations: [
   LocataireComponent,
    //CarsComponent,
    ProprietaireComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class MenuItemsModule { }
