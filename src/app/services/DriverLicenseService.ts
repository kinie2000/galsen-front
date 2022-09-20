import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HostService } from './host.service';
import { HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpRequest } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DriverLicenseService {
  dialogresponse: any;
  elt = [];
  src: any;

  headers = new HttpHeaders();
  private user = [
    {
      id: 1,
     user_name: '',
      cni: '',
      surname: '',
      adresse: '',
      city: '',
      email: '1233@gmail.com',
      tel: '691638011',

    },
  ]
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
    
    CreateDriver(driverL: any) {
        // console.log(customer);
        return this.https.post(this.getHost.gethttps() + 'createDriver',driverL, { withCredentials: true });
      }
    

      getListesDriver(IdUser : number): Observable<any>{
   
        return this.https.get(this.getHost.gethttps() + 'driverLicenses/'+IdUser, { withCredentials: true });

      }
    
      deleteDriver(idDriver: number,): Observable<any> {
    
        return this.https.post(this.getHost.gethttps() + 'DeleteDriver', { id: idDriver }, { withCredentials: true });
      }
      
      UpdateDriver(datas: any) {
        return this.https.post(this.getHost.gethttps() + 'UpdateDriver', datas, { withCredentials: true });
      }
      

}

