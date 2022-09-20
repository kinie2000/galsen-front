import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HostService } from './host.service';
import { HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpRequest } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
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
    
    EmailValidate(idUser: any): Observable<any> {

        return this.https.get(this.getHost.gethttps() + 'email/verify/'+idUser+'/');
    
      }
}