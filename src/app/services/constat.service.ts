import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthserviceService } from './authservice.service';

@Injectable({
  providedIn: "root",
})
export class ConstatService {
  constructor(private http: HttpClient, private getAuth: AuthserviceService) {}
  addconstat(val: any) {
    //console.log(obj);
    let obj = {
      val,
    };
    return this.http.post(this.getAuth.gethttps() + "addconstat", obj);
  }
  showConstatPro(val: any) {
    //console.log(obj);
    let obj = {
      val,
    };
    return this.http.post(this.getAuth.gethttps() + "showConstatPro", obj);
  }
  updateConstat(val: any) {
    //console.log(obj);
    let obj = {
      val,
    };
    return this.http.post(this.getAuth.gethttps() + "updateConstat", obj);
  }
  showOneconstat(val: any) {
   let obj = {
     val,
   };
    return this.http.post(this.getAuth.gethttps() + "showOneconstat", obj);
  }
}
