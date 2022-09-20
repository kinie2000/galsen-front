import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthConfig, JwksValidationHandler, OAuthService } from 'angular-oauth2-oidc';
import { Observable, Subject } from 'rxjs';
import { HostService } from './host.service';

const authCodeFlowConfig: AuthConfig = {
  // Url of the Identity Provider
  issuer: 'https://localhost:4200/admin',

  // strict discovery document disallows urls which not start with issuers url
  strictDiscoveryDocumentValidation: false,

  // URL of the SPA to redirect the user to after login
   redirectUri:  window.location.origin ,

  // The SPA's id. The SPA is registerd with this id at the auth-server
  // clientId: 'server.code',
  clientId: '95066287503-gdluq89d01biiu69qs6mb3dvj9n36ibk.apps.googleusercontent.com',

  // set the scope for the permissions the client should request
  scope: 'openid profile email https://www.googleapis.com/auth/gmail.readonly',

  showDebugInformation: true,
};

export interface UserInfo {
  info: {
    sub: string
    email: string,
    name: string,
    picture: string
  }
}

@Injectable({
  providedIn: 'root'
})
export class GoogleApiService {

  gmail = 'https://gmail.googleapis.com'

  userProfileSubject = new Subject<UserInfo>()

  constructor(private readonly oAuthService: OAuthService, 
    private https: HttpClient,
    private getHost: HostService,
    private readonly httpClient: HttpClient) {
   
    }
   
  emails(userId: string): Observable<any> {
    return this.httpClient.get(`${this.gmail}/gmail/v1/users/${userId}/messages`, { headers: this.authHeader() })
  }

  getMail(userId: string, mailId: string): Observable<any> {
    return this.httpClient.get(`${this.gmail}/gmail/v1/users/${userId}/messages/${mailId}`, { headers: this.authHeader() })
  }

  isLoggedIn(): boolean {
    return this.oAuthService.hasValidAccessToken()
  }
GoogleConnect():Observable<any> {
 
   return this.httpClient.get(this.getHost.gethttps() + 'auth/google/callback',{ headers: this.authHeader() })

}


facebookConnect(): Observable<any>  {
  return this.httpClient.get(this.getHost.gethttps() + 'auth/facebook/callback',{ headers: this.authHeader() })
}

  signOut() {
    this.oAuthService.logOut()
  }

  private authHeader() : HttpHeaders {
    return new HttpHeaders ({
      'Authorization': `Bearer ${this.oAuthService.getAccessToken()}`
    })
  }
}
