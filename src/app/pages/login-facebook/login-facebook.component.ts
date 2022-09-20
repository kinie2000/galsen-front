import { Component } from '@angular/core';
import { 
  SocialAuthService, 
  FacebookLoginProvider, 
  //GoogleLoginProvider 
    } from 'angularx-social-login';

@Component({
  selector: 'login-facebook-root',
  templateUrl: './login-facebook.component.html',
  styleUrls: ['./login-facebook.component.scss'],
})
export class LoginFacebookComponent {
  //title = 'angularbootstrap';
  public user: any;
  public loggedIn!: boolean;
  constructor(private authService: SocialAuthService) {}
  //Logion
  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  
  // Logout Function
  signOut(): void {
    this.authService.signOut();
  }
  ngOnInit() {
    //Get User Data
    this.authService.authState.subscribe((user) => {
      this.user = user;
      console.log(user);
      this.loggedIn = user != null;
    });
  }
}