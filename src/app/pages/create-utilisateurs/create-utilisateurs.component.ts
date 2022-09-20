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
  selector: 'app-create-utilisateurs',
  templateUrl: './create-utilisateurs.component.html',
  styleUrls: ['./create-utilisateurs.component.scss']
})

@Injectable({
  providedIn: 'root'
})
export class CreateUtilisateursComponent implements OnInit {
  [x: string]: any;
  public CreateUtilisateurForm!: UntypedFormGroup | any;
  public hide = true;
  idUser: number | any;
  val: any;
  valid: any;
  isAccept = false;
  public bgImage: any;
  public data: any;
  public googleImage: any;

  //google

  auth2: any;
  @ViewChild('loginRef', {static: true }) loginElement!: ElementRef;


  constructor(
    public formBuilder: UntypedFormBuilder,
    private toastr: ToastrService,
    private authService: SocialAuthService,
    public service: UserServiceService,
    public EmailServices: EmailService,
    public router: Router,
    public loginService: LoginserviceService,
    public snackBar: MatSnackBar,
    private sanitizer: DomSanitizer) { }

  ngOnInit() {
  //google
  this.googleAuthSDK();

    this.bgImage = this.sanitizer.bypassSecurityTrustStyle('url(assets/images/others/register.jpg)');
    this.googleImage = this.sanitizer.bypassSecurityTrustStyle('url(assets/images/others/google.png)');
    this.CreateUtilisateurForm = this.formBuilder.group({
      // nom: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      // prenom: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      email: ['', Validators.compose([Validators.required, emailValidator])],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      AceptCondition: ['false', Validators.required]
    }, { validator: matchingPasswords('password', 'confirmPassword') });
  }


  public onCreateUtilisateurFormSubmit(): void {
    //this.data = this.CreateUtilisateurForm.value;
    let obj = {
      //  email: this.data.email,
      //  password: this.data.password,
      email: this.CreateUtilisateurForm.get('email').value,
      password: this.CreateUtilisateurForm.get('password').value,
    //  id: this.CreateUtilisateurForm.get('id').value,


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
        this.router.navigateByUrl('/login').then();

      });

    }


  }


   //google

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


  googleAuthSDK() {
     
    (<any>window)['googleSDKLoaded'] = () => {
      (<any>window)['gapi'].load('auth2', () => {
        this.auth2 = (<any>window)['gapi'].auth2.init({
          client_id: 'YOUR CLIENT ID HERE',
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
