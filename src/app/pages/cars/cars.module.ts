import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router'; 
import { SharedModule } from '../../shared/shared.module'; 
import { CarsComponent } from './cars.component';
import { CarsDialogComponent } from './cars-dialog/cars-dialog.component';

export const routes: Routes = [
  { path: '', component: CarsComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [
    CarsComponent,
    CarsDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule 
  ]
})
export class CarsModule { }
