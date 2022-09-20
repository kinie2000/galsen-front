import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router'; 
import { SharedModule } from '../../../shared/shared.module';
import { MesPaiementsComponent } from './mes-paiements.component';

export const routes: Routes = [
  { path: '', component: MesPaiementsComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [MesPaiementsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes), 
    SharedModule
  ]
})
export class WithdrawalModule { }
