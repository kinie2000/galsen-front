import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HostService } from './host.service';
import { HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpRequest } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SmsService {
  dialogresponse: any;
  elt = [];
  src: any;

  headers = new HttpHeaders();

  HttpClient: any;
  constructor(
        private https: HttpClient,
    private matDialog: MatDialog,
    private getHost: HostService
    ) { }
  
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

      return next.handle(req).pipe(
        catchError((error) => {
          console.log('error is intercept')
          console.error(error);
          return throwError(error.message);
        })
      )
    }
    
  VerifySms(sms: any) {
    // console.log(customer);
    return this.https.post(this.getHost.gethttps() + 'verify',sms, { withCredentials: true });
  }

  phoneNum(num: any) {
    // console.log(customer);
    return this.https.post(this.getHost.gethttps() + 'phoneNum',num, { withCredentials: true });
  }

  getVerification(data: any) {
    return this.https.post(this.getHost.gethttps() + 'verify',data, { withCredentials: true });
  }

}