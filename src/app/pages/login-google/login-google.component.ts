import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';



    
@Component({
  selector: 'login-google-root',
  templateUrl: './login-google.component.html'
 // styleUrls: ['./login-google.component.css']
})
export class LoginGoogleComponent implements OnInit {
  title = 'loginGoogle';
    
  auth2: any;
    
  @ViewChild('loginRef', {static: true }) loginElement!: ElementRef;
     
  constructor() { }
    
  /*------------------------------------------
  --------------------------------------------
  About 
  --------------------------------------------
  --------------------------------------------*/
  ngOnInit() {
     
    this.googleAuthSDK();
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
    
      }
      // , (error:any) => {
      //   alert(JSON.stringify(error, undefined, 2));
      // }
      );
 
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
          client_id: '8748397053-vgckqrn1s0o28m250alrac6psos8pseg.apps.googleusercontent.com',
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
