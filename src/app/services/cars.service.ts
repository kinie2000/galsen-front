import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HostService } from './host.service';
import { HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpRequest } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CarsService {
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
    
  CreateCar(cars: any) {
    // console.log(customer);
    return this.https.post(this.getHost.gethttps() + 'createCars',cars, { withCredentials: true });
  }

  getCars() {
    return this.https.get(this.getHost.gethttps() + 'cars', { withCredentials: true });
  }

  delete(cars: number,): Observable<any> {

    return this.https.post(this.getHost.gethttps() + 'deleteCars', { id: cars }, { withCredentials: true });
  }
  
  UpdateCars(datas: any) {
    return this.https.post(this.getHost.gethttps() + 'updateCars', datas, { withCredentials: true });
  }
  
  CreateDisponibility(dispo: any) {
    // console.log(customer);
    return this.https.post(this.getHost.gethttps() + 'CreateDisponibility',dispo);
  }
    week() {
    // console.log(customer);
    return this.https.get(this.getHost.gethttps() + 'week', { withCredentials: true });
  }
  dispoDay() {
    // console.log(customer);
    return this.https.get(this.getHost.gethttps() + 'dispoDay', { withCredentials: true });
  }
  dispoDayValue(disp: any) {
    // console.log(customer);
    return this.https.post(this.getHost.gethttps() + 'dispoDayValue',disp, { withCredentials: true });
  }
  weekValue(week: any) {
    // console.log(customer);
    return this.https.post(this.getHost.gethttps() + 'weekValue',week, { withCredentials: true });
  }
}
