import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  public psConfig: PerfectScrollbarConfigInterface = {
    wheelPropagation:true
  };
  @ViewChild('sidenav') sidenav: any;
  public sidenavOpen:boolean = true;
  public links = [ 
    { name: 'Dashboard', href: 'dashboard', icon: 'dashboard' },
    { name: 'Mon Profile', href: 'monprofile', icon: 'person' },  
   // { name: 'Profile', href: 'profile', icon: 'person' },
    { name: 'Verification', href: 'verification', icon: 'verified_user' },

    //{ Sousname: 'test', href: 'verification', iconSS: 'verified_user' },

    { name: 'Validation permis', href: 'validation', icon: 'verified_user' },
    { name: 'Mes preferences', href: 'preference', icon: 'settings' },
    { name: 'Password Change', href: 'password-change', icon: 'vpn_key' },  
     //{ name: 'Addresses', href: 'addresses', icon: 'location_on' }, 
     { name: 'Cars', href: 'cars', icon: 'drive_eta' }, 
    // { name: 'Favorites', href: 'favorites', icon: 'favorite' }, 
    { name: 'Mes Reservations', href: 'reservations', icon: 'event' },
    { name: 'Mon argent', href: 'orders', icon: 'list_alt' },  
    { name: 'Logout', href: '/login', icon: 'power_settings_new' },    
  ]; 
  constructor(public router:Router) { }

  ngOnInit() {
    if(window.innerWidth < 960){
      this.sidenavOpen = false;
    };
  }

  @HostListener('window:resize')
  public onWindowResize():void {
    (window.innerWidth < 960) ? this.sidenavOpen = false : this.sidenavOpen = true;
  }

  ngAfterViewInit(){
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {  
        if(window.innerWidth < 960){
          this.sidenav.close(); 
        }
      }                
    });
  } 


}
