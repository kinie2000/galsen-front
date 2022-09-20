import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { RegisterProComponent } from './registerPro.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


export const routes: Routes = [
  { path: '', component: RegisterProComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [RegisterProComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
     ToastrModule.forRoot(),
    SharedModule
  ]
})
export class RegisterProModule { }
