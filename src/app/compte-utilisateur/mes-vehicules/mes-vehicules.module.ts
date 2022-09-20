import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router'; 
import { MesDisponibilitesComponent } from './mes-disponibilites/mes-disponibilites.component';
import { CarsComponent } from './cars/cars.component';
import { CarsDialogComponent } from './cars/cars-dialog/cars-dialog.component';
import { SharedModule } from '../../shared/shared.module';

import { EditCarsComponent } from './cars/edit-cars/edit-cars.component';
import { MatTabsModule } from "@angular/material/tabs";
import { FormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
export const routes: Routes = [ 
  { path: '', redirectTo: 'list', pathMatch: 'full'},
 
  { path: 'mes-disponibilites', component: MesDisponibilitesComponent, data: { breadcrumb: 'Mes disponibilités' }},
  { path: 'ajouter-vehicule', component: CarsComponent, data: { breadcrumb: 'Ajouter un Véhicules' }},
  { path: 'edit-vehicule', component: EditCarsComponent, data: { breadcrumb: 'Modifier un Véhicules' }},
 
];

@NgModule({
  declarations: [
    CarsComponent,
    CarsDialogComponent,
    MesDisponibilitesComponent,
    EditCarsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyB76qIj0I7XKmrBsU4Z16DLVXy7Neh-dFQ",
      libraries: ["places"],
    }),
  ],
})
export class MenuItemsModule {}
