import { AuthserviceService } from "./authservice.service";
import { Injectable } from "@angular/core";

import {
  HttpClient,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { catchError, Observable, of, throwError } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class LoginserviceService {
  constructor(private http: HttpClient, private getAuth: AuthserviceService) { }

  getAll(social: any) {
    return this.http.get(this.getAuth.gethttps() + "auth/" + social);
  }
  getuser(val: any) {
    let obj = {
      val,
    };
    return this.http.post(this.getAuth.gethttps() + "login", obj);
  }
  resetpass(val: any) {
    let obj = {
      val,
    };
    return this.http.post(this.getAuth.gethttps() + "forgetPassword", obj);
  }
  verifcode(val: any) {
    let obj = {
      val,
    };
    return this.http.post(this.getAuth.gethttps() + "verifyCode", obj);
  }
  newpass(val: any) {
    let obj = {
      val,
    };
    return this.http.post(this.getAuth.gethttps() + "changePassword", obj);
  }
  getinfouser() {
    return this.http.get(this.getAuth.gethttps() + "getuser");
  }
  createcmd(val: any) {
    let obj = {
      val,
    };
    return this.http.post(this.getAuth.gethttps() + "changePasswordUnik", obj);
  }
  changemail(val: any) {
    let obj = {
      val,
    };
    return this.http.post(this.getAuth.gethttps() + "changeEmail", obj);
  }
  updateUser(val: any, tabvaleur: any) {
    let obj = {
      val: val,
      tabvaleur: tabvaleur,
    };
    console.log(obj);
    return this.http.post(this.getAuth.gethttps() + "updateUser", obj);
  }

  updatePermis(val: any, tabvaleur: any) {
    let obj = {
      val: val,
      tabvaleur: tabvaleur,
    };
    console.log(obj);
    return this.http.post(this.getAuth.gethttps() + "updatePermis", obj);
  }


  getinfoUser(val: any) {
    let obj = {
      val,
    };
    return this.http.post(this.getAuth.gethttps() + "getinfoUser", obj);
  }

  createnotif(val: any) {
    let obj = {
      val,
    };
    return this.http.post(this.getAuth.gethttps() + "createnotif", obj);
  }
  findnotif(val: any) {
    let obj = {
      val,
    };
    return this.http.post(this.getAuth.gethttps() + "findnotif", obj);
  }


  ////

  createUtilisateurs(val: any) {
    //console.log(obj);
    return this.http.post(this.getAuth.gethttps() + "createUtilisateurs", val);
  }

  SendMailUtilisateurs(val: any) {
    //console.log(obj);
    return this.http.post(this.getAuth.gethttps() + "sendmailUtilisateurs", val);
  }

  verifyEmail(val: any) {
    //console.log(obj);
    return this.http.post(this.getAuth.gethttps() + 'email/verify/'+val,val);
  }
  //return this.https.get(this.getHost. getHttpsEmail() + 'email/verify/'+idUser+'/');

  //google

  CreateUtilisateursGoogle(val: any) {
    return this.http.get(this.getAuth.gethttps() + "auth/google/callback", val);
  }

}


