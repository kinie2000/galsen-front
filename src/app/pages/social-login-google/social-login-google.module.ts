// import { BrowserModule } from '@angular/platform-browser';
// import { NgModule } from '@angular/core';
// import { LoginSocialGoogleComponent } from './social-login-google.component';
// import { ReactiveFormsModule } from '@angular/forms';
// import {
//   SocialLoginModule,
//   SocialAuthServiceConfig,
// } from 'angularx-social-login';
// import { GoogleLoginProvider } from 'angularx-social-login';
// @NgModule({
//   declarations: [LoginSocialGoogleComponent],
//   imports: [
//     BrowserModule,
//     ReactiveFormsModule,
//     SocialLoginModule,
//   ],
//   providers: [
//     {
//       provide: 'SocialAuthServiceConfig',
//       useValue: {
//         autoLogin: false,
//         providers: [
//           {
//             id: GoogleLoginProvider.PROVIDER_ID,
//             provider: new GoogleLoginProvider('Google-Client-ID-Goes-Here'),
//           },
//         ],
//       } as SocialAuthServiceConfig,
//     },
//   ],
//   bootstrap: [LoginSocialGoogleComponent],
// })
// export class LoginSocialGoogleModule {}


import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { LoginSocialGoogleComponent } from './social-login-google.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


export const routes: Routes = [
  { path: '', component: LoginSocialGoogleComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [LoginSocialGoogleComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
     ToastrModule.forRoot(),
    SharedModule
  ]
})
export class LoginSocialGoogleModule { }
