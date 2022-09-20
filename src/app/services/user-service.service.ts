import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HostService } from './host.service';
import { HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpRequest } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
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
    
  CreateUser(user: any) {
    // console.log(customer);
   // return this.https.post(this.getHost.gethttps() + 'createUser',user, { withCredentials: true });
    return this.https.post(this.getHost.gethttps() + 'createUser',user);
  }
  CreateProUser(Prouser: any) {
    // console.log(customer);
    return this.https.post(this.getHost.gethttps() + 'registePro',Prouser, { withCredentials: true });
  }
  CreateRenting(renting: any) {
    // console.log(customer);
    return this.https.post(this.getHost.gethttps() + 'rentings',renting, { withCredentials: true });
  }
  CreateEntr(entre: any) {
    // console.log(customer);
    return this.https.post(this.getHost.gethttps() + 'createEntr',entre, { withCredentials: true });
  }

  getListes() {
    return this.https.get(this.getHost.gethttps() + 'user', { withCredentials: true });
  }

  delete(idUser: number,): Observable<any> {

    return this.https.post(this.getHost.gethttps() + 'deleteUser', { id: idUser }, { withCredentials: true });
  }
  
  UpdateUserr(datas: any) {
    return this.https.post(this.getHost.gethttps() + 'updateUser', datas, { withCredentials: true });
  }
  
  public getUser(){
 
    return this.https.get(this.getHost.gethttps() + 'indexUser');

  } 

  public getUserFind(datas: any){
 
    return this.https.get(this.getHost.gethttps() + 'findUser/' + datas);

  } 
}

