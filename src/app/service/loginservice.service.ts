import { AuthserviceService } from "./authservice.service";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class LoginserviceService {
  constructor(private http: HttpClient, private getAuth: AuthserviceService) {}

  getAll(social: any) {
    return this.http.get(this.getAuth.gethttps() + "auth/" + social);
  }
  getuser(val: any) {
    let obj = {
      val,
    };
    return this.http.post(this.getAuth.gethttps() + "login", obj);
  }
  getinfouser(val: any) {
    return this.http.get(this.getAuth.gethttps() + "getuser");
  }
}
