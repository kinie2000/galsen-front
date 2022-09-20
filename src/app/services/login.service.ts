import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';
import { Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LoginService {


  private auth2: gapi.auth2.GoogleAuth
  private subject = new ReplaySubject< gapi.auth2.GoogleUser>(1)

  constructor() { 
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '95066287503-gdluq89d01biiu69qs6mb3dvj9n36ibk.apps.googleusercontent.com'
      })
    })
  }

  
  public signGoogle() {
    
    this.auth2.signIn({
      scope: 'https://www.googleapis.com/auth/gmail.readonly'
    }).then(user => {
      this.subject.next(user)
    }).catch(() => {
      this.subject.next(null)
    })
  }
  public signOutGoogle() {
    this.auth2.signOut().then(() => {
      this.subject.next(null)
    })
  }

  public  observable(): Observable<gapi.auth2.GoogleUser>{
    return this.subject.asObservable()
  }
}
