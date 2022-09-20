import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class AuthserviceService {
  constructor(private Http: HttpClient) {}

  gethttps() {
   // return "http://localhost:8000/api/";
   return "https://apigalsenauto.jainli.com/api/";
  }
}

