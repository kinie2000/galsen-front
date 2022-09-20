// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import {
//   SocialAuthService,
//   GoogleLoginProvider,
//   SocialUser,
// } from 'angularx-social-login';
// @Component({
//   selector: 'app-social-login-google',
//   templateUrl: './social-login-google.component.html',
//   styleUrls: ['./social-login-google.component.scss'],
// })
// export class LoginSocialGoogleComponent implements OnInit {
//   loginForm!: FormGroup;
//   socialUser!: SocialUser;
//   isLoggedin?: boolean;
//   constructor(
//     private formBuilder: FormBuilder,
//     private socialAuthService: SocialAuthService
//   ) {}
//   ngOnInit() {
//     this.loginForm = this.formBuilder.group({
//       email: ['', Validators.required],
//       password: ['', Validators.required],
//     });
//     this.socialAuthService.authState.subscribe((user) => {
//       this.socialUser = user;
//       this.isLoggedin = user != null;
//       console.log(this.socialUser);
//     });
//   }
//   loginWithGoogle(): void {
//     this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
//   }
//   logOut(): void {
//     this.socialAuthService.signOut();
//   }
// }

import { Component, OnInit, Input, ViewChild, Injectable, ElementRef} from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { matchingPasswords, emailValidator } from 'src/app/theme/utils/app-validators';
import { DomSanitizer } from '@angular/platform-browser';
import { UserServiceService } from 'src/app/services/user-service.service';
import { EmailService } from 'src/app/services/Email.service';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService } from '@abacritt/angularx-social-login';
import { ToastrService } from 'ngx-toastr';
import { LoginserviceService } from 'src/app/services/loginservice.service';


@Component({
  selector: 'app-social-login-google',
  templateUrl: './social-login-google.component.html',
  styleUrls: ['./social-login-google.component.scss']
})
export class LoginSocialGoogleComponent implements OnInit {
  title = 'loginGoogle';
  public bgImage: any;
  auth2: any;
  public CreateUtilisateurForm!: UntypedFormGroup | any;
  public hide = true;
  isAccept = false;
  @ViewChild('loginRef', {static: true }) loginElement!: ElementRef;

  [x: string]: any;
  idUser: number | any;
  val: any;
  valid: any;
  public data: any;
  public googleImage: any;

     
  constructor(

    public service: UserServiceService,
    public EmailServices: EmailService,
    public router: Router,
    public loginService: LoginserviceService,
    public snackBar: MatSnackBar,

    public formBuilder: UntypedFormBuilder,
    private sanitizer: DomSanitizer
  ) { }
    
  /*------------------------------------------
  --------------------------------------------
  About 
  --------------------------------------------
  --------------------------------------------*/
  ngOnInit() {
     
    this.googleAuthSDK();
    this.bgImage = this.sanitizer.bypassSecurityTrustStyle('url(assets/images/others/register.jpg)');
    this.CreateUtilisateurForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, emailValidator])],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      AceptCondition: ['false', Validators.required]
    }, { validator: matchingPasswords('password', 'confirmPassword') });
  }

  onCreateUtilisateurFormSubmit(){

    //this.data = this.CreateUtilisateurForm.value;
    let obj = {
      email: this.CreateUtilisateurForm.get('email').value,
      password: this.CreateUtilisateurForm.get('password').value,
    }
    this.data = this.CreateUtilisateurForm.value;
    this.valid = this.CreateUtilisateurForm.get('email').value;

    if (this.CreateUtilisateurForm.valid) {

      // this.loginService.createUtilisateurs(obj).subscribe((data:any) => {
      //   this.toastr.success('utilisateur crée avec succes ');
      //   //console.log(obj);
      //   //this.EmailServices.EmailValidate( data.id).subscribe((data:any)=>{
      // //     this.loginService.verifyEmail( data.id).subscribe((data:any)=>{
      // //           this.toastr.success('utilisateur crée avec succes ');
      // //  //      this.router.navigateByUrl('/login').then();   
      // });

      
      this.loginService.createUtilisateurs(obj).subscribe((data:any) => {
       // console.log(obj);
        //console.log(data.id);
        this.toastr.success('utilisateur crée avec succes ');
       // this.router.navigateByUrl('/login').then();

      });

    }

  }
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  callLoginButton() {
     
    this.auth2.attachClickHandler(this.loginElement.nativeElement, {},
      (googleAuthUser:any) => {
     
        let profile = googleAuthUser.getBasicProfile();
        console.log('Token || ' + googleAuthUser.getAuthResponse().id_token);
        console.log('ID: ' + profile.getId());
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());
            
       /* Write Your Code Here */
    
      }, (error:any) => {
        alert(JSON.stringify(error, undefined, 2));
      });
 
  }
  
  /**
   * Write code on Method
   *
   * @return response()
   */
  googleAuthSDK() {
     
    (<any>window)['googleSDKLoaded'] = () => {
      (<any>window)['gapi'].load('auth2', () => {
        this.auth2 = (<any>window)['gapi'].auth2.init({
          client_id: '95066287503-4kmif1maajpb09nfbnu4jmh0421u7ss5.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
          scope: 'profile email'
        });
        this.callLoginButton();
      });
    }
     
    (function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement('script'); 
      js.id = id;
      js.src = "https://apis.google.com/js/platform.js?onload=googleSDKLoaded";
      fjs?.parentNode?.insertBefore(js, fjs);
    }(document, 'script', 'google-jssdk'));
   
  }
}