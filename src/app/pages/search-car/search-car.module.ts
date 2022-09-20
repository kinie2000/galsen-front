import { SharedModule } from './../../shared/shared.module';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SearchCarComponent } from './search-car.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

export const routes: Routes = [
  { path: '', component: SearchCarComponent, pathMatch: 'full'  }
];

@NgModule({
  declarations: [SearchCarComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    InfiniteScrollModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule, 
    MatSelectModule
  ],
  exports: [
    InfiniteScrollModule
  ]
})
export class SearchCarModule { }