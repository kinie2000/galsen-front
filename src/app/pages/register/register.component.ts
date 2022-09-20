import { Component, OnInit, Input, ViewChild, Injectable } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router'; 
import { MatSnackBar } from '@angular/material/snack-bar';
import { matchingPasswords, emailValidator } from 'src/app/theme/utils/app-validators';
import { DomSanitizer } from '@angular/platform-browser';
import { UserServiceService } from 'src/app/services/user-service.service';
import { EmailService } from 'src/app/services/Email.service';
import { LoginserviceService } from 'src/app/services/loginservice.service';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService } from '@abacritt/angularx-social-login';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

@Injectable({
  providedIn: 'root'
})
export class RegisterComponent implements OnInit {
  [x: string]: any;
  public registerForm!: UntypedFormGroup| any;
  public hide = true; 
  idUser:number | any ;
  val:any;
  valid:any;
  isAccept = false; 
  public bgImage:any;
  public data:any;
  public googleImage:any;
  constructor(public fb: UntypedFormBuilder,
      private toastr: ToastrService,
      private authService: SocialAuthService, public service:UserServiceService, 
      public EmailServices:EmailService,
      public LoginserviceService:LoginserviceService,
      public router:Router, public snackBar: MatSnackBar, private sanitizer:DomSanitizer) { }

  ngOnInit() {
    this.bgImage = this.sanitizer.bypassSecurityTrustStyle('url(assets/images/others/register.jpg)');
    this.googleImage = this.sanitizer.bypassSecurityTrustStyle('url(assets/images/others/google.png)');
    this.registerForm = this.fb.group({ 
      user_name: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      email: ['', Validators.compose([Validators.required, emailValidator])],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      receiveNewsletter:[ 'false',Validators.required ]                            
    },{validator: matchingPasswords('password', 'confirmPassword')});
    console.log(this.registerForm);
  }


  public onRegisterFormSubmit():void {
    let obj={

      user_name:this.registerForm.get('user_name').value,
      email:this.registerForm.get('email').value,
      password:this.registerForm.get('password').value,
      confirmPassword:this.registerForm.get('confirmPassword').value,

      }
    this.data = this.registerForm.value
      this.valid = this.registerForm.get('email').value

      // this.val =  this.this.registerForm.value.id;

     
    if (this.registerForm.valid) {
      this.service.CreateUser(obj).subscribe((data:any)=>{

        console.log('user_data',data),
        this.val= data.user
          this.toastr.success('utilisateur crée avec succes '); 
        //  this.EmailServices.EmailValidate( this.val).subscribe((data:any)=>{
        //    console.log('user_data',data.id)
        // //          this.toastr.success('utilisateur crée avec succes ');

       
               
        // //      this.router.navigateByUrl('/login').then();
        //     },(error:any) => {
             
        //     this.toastr.error(error.error['message']);
       
        // //    throw error;
        //    }
        //    );

         this.router.navigateByUrl('/login').then();
         

    },(error:any) => {
      
     this.toastr.error(error.error['message']);

    throw error;
    }
    );
    
     
   
      // this.snackBar.open('You registered successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
    }
    // this.EmailServices.EmailValidate( this.val, this.valid).subscribe((data:any)=>{
    //    console.log(data)
    //         this.toastr.success('utilisateur crée avec succes ');
  
          
    //       this.router.navigateByUrl('/login').then();
    //   },(error:any) => {
        
    //    this.toastr.error(error.error['message']);
  
    //   throw error;
    //   }
    //   );
  }

  GetUser (){

  }

  signInHandler(): void {
    // console.log("GoogleLoginProvider.PROVIDER_ID");
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((data:any) => {
      // console.log(data)
      sessionStorage.setItem("google_auth", JSON.stringify(data))
      localStorage.setItem('google_auth', JSON.stringify(data));
      this.toastr.success('connexion effectué avec succés ');
     
      this.router.navigateByUrl('/').then();
    }
    ,(error:any) => { 
     this.toastr.error(error.error['message']);
     // throw error;
    }
    ); 
  }
  signInHandlerFacebook(): void {
    console.log(FacebookLoginProvider.PROVIDER_ID);
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then((data: any) => {
      console.log(data)
      sessionStorage.setItem("facebook_auth", JSON.stringify(data))
      localStorage.setItem('facebook_auth', JSON.stringify(data));
       this.toastr.success('connexion effectué avec succés ');

      this.router.navigateByUrl('/').then();
    },(error:any) => { 
        this.toastr.error(error.error['message']);
     // throw error;
    })
  }
  
}