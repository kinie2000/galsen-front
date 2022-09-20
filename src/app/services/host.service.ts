import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class HostService {
  constructor() {}

  gethttps() {
    //return "http://localhost:8000/api/";
    return "https://apigalsenauto.jainli.com/api/";

  }

  getHttpsImage() {
    //return "http://localhost:8000/storage/";
    return "https://apigalsenauto.jainli.com/storage/";
 

  }

  getHttpsEmail() {
    //return "http://localhost:4200/";
    return "https://apigalsenauto.jainli.com/";

  }
}
