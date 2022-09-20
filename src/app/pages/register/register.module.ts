import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { RegisterComponent } from './register.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { SocialAuthService, SocialLoginModule } from '@abacritt/angularx-social-login';
export const routes: Routes = [
  { path: '', component: RegisterComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    // SocialLoginModule,
    ToastrModule.forRoot(),
  ]
})
export class RegisterModule { }