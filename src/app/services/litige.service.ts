import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthserviceService } from './authservice.service';

@Injectable({
  providedIn: "root",
})
export class LitigeService {
  constructor(private http: HttpClient, private getAuth: AuthserviceService) {}
  addlitige(val: any) {
   let obj = {
     val,
   };
    return this.http.post(this.getAuth.gethttps() + "addlitige", obj);
  }
}
