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
import { LoginFacebookComponent } from './login-facebook.component';


export const routes: Routes = [
  { path: '', component: LoginFacebookComponent, pathMatch: 'full' }
];

  
@NgModule({
  declarations: [LoginFacebookComponent],
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
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('2103655826473467'),
          },
         
        ],
        onError: (err) => {
          console.error(err);
        },
      } as SocialAuthServiceConfig,
    },
    SocialAuthService,
  ],
  
  bootstrap: [LoginFacebookComponent],
})
export class LoginFacebookModule {}




