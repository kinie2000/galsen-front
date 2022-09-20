import { LoginserviceService } from "src/app/services/loginservice.service";
import { Component, OnInit } from "@angular/core";
import {
  UntypedFormGroup,
  UntypedFormBuilder,
  Validators,
} from "@angular/forms";
import { DomSanitizer } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { AppSettings, Settings } from "src/app/app.settings";
import {
  SocialAuthService,
  FacebookLoginProvider,
  SocialUser,
  GoogleLoginProvider,
} from "angularx-social-login";
import { Socialusers } from "../Socialuser";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  public loginForm!: UntypedFormGroup;
  public hide = true;
  public bgImage: any;
  public settings: Settings;
  public data: any;
  public message: string | undefined;
  user: SocialUser = new SocialUser();
  isSignedin!: boolean;
  socialusers = new Socialusers();
  constructor(
    public fb: UntypedFormBuilder,
    public router: Router,
    private sanitizer: DomSanitizer,
    public appSettings: AppSettings,
    public loginService: LoginserviceService,
    private socialAuthService: SocialAuthService,
    public OAuth: SocialAuthService
  ) {
    this.settings = this.appSettings.settings;
  }

  ngOnInit(): void {
    this.bgImage = this.sanitizer.bypassSecurityTrustStyle(
      "url(assets/images/others/login.jpg)"
    );
    this.loginForm = this.fb.group({
      email: [
        null,
        Validators.compose([Validators.required, Validators.email]),
      ],
      password: [
        null,
        Validators.compose([Validators.required, Validators.minLength(6)]),
      ],
      rememberMe: false,
    });
    this.socialAuthService.authState.subscribe((user) => {
      this.user = user;
      this.isSignedin = user != null;
      console.log(this.user.firstName);
    });
  }

  public onLoginFormSubmit(): void {
    this.data = this.loginForm.value;
    console.log(this.data);
    // if (this.loginForm.valid) {
    //   this.loginService.getuser(this.data).subscribe(
    //     (data) => {
    //       console.log(data);

    //       sessionStorage.setItem("user", JSON.stringify(data));
    //       localStorage.setItem("user", JSON.stringify(data));
    //       this.router.navigate(["/", "admin"]);

    //       // this.AuthService.setStorage2("connectUser", "true");
    //     },
    //     (error) => {
    //       // this.AuthService.setStorage2("connectUser", "false");
    //       this.message = "information";
    //     }
    //   );
    // }
    this.loginService.getuser(this.data).subscribe(
      (data) => {
        console.log(data);

        sessionStorage.setItem("user", JSON.stringify(data));
        localStorage.setItem("user", JSON.stringify(data));
        this.router.navigateByUrl("/compte-utilisateur").then();
      },
      (error) => {
        this.message = "information";
      }
    );
  }
  // loginwithsocial() {
  //   let obj = {
  //     // id: this.idCustomer,
  //     // name: this.form.get("name").value,
  //     // surname: this.form.get("surname").value,
  //     // tel: this.form.get("tel").value,
  //     // email: this.form.get("email").value,
  //     // adresse: this.form.get("adresse").value,
  //     // city: this.form.get("city").value,
  //     // status: "INSCRIT",
  //   };
  //   this.loginService.getAll(obj).subscribe();
  // }

  // loginWith(social: string) {
  //   this.loginService.getAll(social).subscribe();
  // }
  // facebookSignin(): void {
  //   this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  // }
  // googleSignin(): void {
  //   this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  // }

  // logOut(): void {
  //   this.socialAuthService.signOut();
  // }
  // public socialSignIn(socialProvider: string) {
  //   let socialPlatformProvider;
  //   if (socialProvider === "facebook") {
  //     socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
  //   } else if (socialProvider === "google") {
  //     socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
  //   }

  //   this.OAuth.signIn(FacebookLoginProvider.PROVIDER_ID).then((socialusers) => {
  //     console.log(socialProvider, socialusers);
  //     console.log(socialusers);
  //     // this.Savesresponse(socialusers);
  //   });
  // }
  // public socialSignIngoogle(socialProvider: string) {
  //   let socialPlatformProvider;
  //   if (socialProvider === "facebook") {
  //     socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
  //   } else if (socialProvider === "google") {
  //     socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
  //   }

  //   this.OAuth.signIn(GoogleLoginProvider.PROVIDER_ID).then((socialusers) => {
  //     console.log(socialProvider, socialusers);
  //     console.log(socialusers);
  //     // this.Savesresponse(socialusers);
  //   });
  // }
  facebookSignin(): void {
    this.socialAuthService
      .signIn(FacebookLoginProvider.PROVIDER_ID)
      .then((data: any) => {
        console.log(data);
        sessionStorage.setItem("facebook_auth", JSON.stringify(data));
        localStorage.setItem("facebook_auth", JSON.stringify(data));
        this.router.navigateByUrl("/compte-utilisateur").then();
      });
      
      
  }
  // loginwithsocial() {
  //   let obj = {
  //     // id: this.idCustomer,
  //     // name: this.form.get("name").value,
  //     // surname: this.form.get("surname").value,
  //     // tel: this.form.get("tel").value,
  //     // email: this.form.get("email").value,
  //     // adresse: this.form.get("adresse").value,
  //     // city: this.form.get("city").value,
  //     // status: "INSCRIT",
  //   };
  //   this.loginService.getAll(obj).subscribe();
  // }

  // Savesresponse(socialusers: Socialusers) {
  //   this.SocialloginService.Savesresponse(socialusers).subscribe((res: any) => {
  //     debugger;
  //     console.log(res);
  //     this.socialusers = res;
  //     this.response = res.userDetail;
  //     localStorage.setItem("socialusers", JSON.stringify(this.socialusers));
  //     console.log(
  //       localStorage.setItem("socialusers", JSON.stringify(this.socialusers))
  //     );
  //     this.router.navigate([`/Dashboard`]);
  //   });
  // }
  resetpassword() {
    this.router.navigateByUrl("/reset");
  }
}
