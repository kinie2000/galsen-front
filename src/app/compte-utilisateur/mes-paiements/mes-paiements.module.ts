import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router'; 
import { SharedModule } from '../../shared/shared.module';
import { MesRevenusComponent } from './mes-revenus/mes-revenus.component';
import { MesPaiementsComponent } from './mes-paiements/mes-paiements.component';

export const routes: Routes = [ 
  { path: '', redirectTo: 'list', pathMatch: 'full'},
  { path: 'mes-revenus', component: MesRevenusComponent, data: { breadcrumb: 'Mes revenus' }},
  { path: 'mes-paiements', component: MesPaiementsComponent, data: { breadcrumb: 'Mes paiements' }},
 
];

@NgModule({
  declarations: [
    MesRevenusComponent,
    MesPaiementsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class MenuItemsModule { }
