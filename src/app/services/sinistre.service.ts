import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthserviceService } from './authservice.service';

@Injectable({
  providedIn: "root",
})
export class SinistreService {
  constructor(private http: HttpClient, private getAuth: AuthserviceService) {}
  addsinistre(val: any) {
    //console.log(obj);
    return this.http.post(this.getAuth.gethttps() + "addsinistre", val);
  }
  saveimage(val: any) {
    //console.log(obj);
    return this.http.post(this.getAuth.gethttps() + "saveimage", val);
  }
}
