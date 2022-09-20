// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { RouterModule, Routes } from '@angular/router';
// import { SharedModule } from '../../shared/shared.module';
// import { LoginGoogleComponent } from './login-google.component';
// import { ToastrModule, ToastrService } from 'ngx-toastr';
// import { SocialAuthService, SocialLoginModule } from '@abacritt/angularx-social-login';
// export const routes: Routes = [
//   { path: '', component: LoginGoogleComponent, pathMatch: 'full' }
// ];

// @NgModule({
//   declarations: [LoginGoogleComponent],
//   imports: [
//     CommonModule,
//     RouterModule.forChild(routes),
//     SharedModule,
//     // SocialLoginModule,
//     ToastrModule.forRoot(),
//   ]
// })
// export class LoginGoogleModule { }



//import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { 
  SocialAuthServiceConfig, 
  FacebookLoginProvider, GoogleLoginProvider,
  SocialAuthService 
} from 'angularx-social-login'; 
import { LoginGoogleComponent } from './login-google.component';


export const routes: Routes = [
  { path: '', component: LoginGoogleComponent, pathMatch: 'full' }
];

  
@NgModule({
  declarations: [LoginGoogleComponent],
  imports: [CommonModule,
    RouterModule.forChild(routes),
    SharedModule,],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('8748397053-vgckqrn1s0o28m250alrac6psos8pseg.apps.googleusercontent.com'),
          },
         
        ],
        onError: (err) => {
          console.error(err);
        },
      } as SocialAuthServiceConfig,
    },
    SocialAuthService,
  ],
  
  bootstrap: [LoginGoogleComponent],
})
export class LoginGoogleModule {}




