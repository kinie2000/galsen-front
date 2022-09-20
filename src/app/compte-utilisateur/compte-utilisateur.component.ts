import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { AppSettings, Settings } from '../app.settings';
import { Router, NavigationEnd } from '@angular/router'; 
import { MenuService } from './components/menu/menu.service';
import { Menu } from './components/menu/menu.model';
import { LoginserviceService } from '../services/loginservice.service';

@Component({
  selector: "app-compte-utilisateur",
  templateUrl: "./compte-utilisateur.component.html",
  styleUrls: ["./compte-utilisateur.component.scss"],
})
export class CompteUtilisateurComponent implements OnInit {
  @ViewChild("sidenav") sidenav: any;
  public settings: Settings;
  public menuItems: Array<Menu> = [];
  public toggleSearchBar: boolean = false;
  public userImage: any;
  mailSnippets: string[] = [];
  public userDetails: any;
  public userIn: any;
  public item: any;
  constructor(
    public appSettings: AppSettings,
    public router: Router,
    private menuService: MenuService,
    public loginService: LoginserviceService
  ) {
    this.settings = this.appSettings.settings;
  }

  ngOnInit() {
    
    if (window.innerWidth <= 960) {
      this.settings.adminSidenavIsOpened = false;
      this.settings.adminSidenavIsPinned = false;
    }
    this.menuItems = this.menuService.getMenuItems();
    const storage = localStorage.getItem("facebook_auth");
    const storageAuth = localStorage.getItem("user");

     if (storageAuth) {
       this.userIn = JSON.parse(storageAuth);
     }
     if (storage) {
       this.userIn = JSON.parse(storage);
     }
     const email = this.userIn.email;
     console.log(this.userIn);
     this.loginService.getinfoUser(email).subscribe((data) => {
       this.item=data;
       console.log(data);
     });

    
  }
  logout(): void {
    localStorage.removeItem("facebook_auth");
    sessionStorage.removeItem("facebook_auth");
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");

    this.router.navigateByUrl("/login");
  }

  ngAfterViewInit() {
    if (document.getElementById("preloader")) {
      document.getElementById("preloader")?.classList.add("hide");
    }
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.scrollToTop();
      }
      if (window.innerWidth <= 960) {
        this.sidenav.close();
      }
    });
    this.menuService.expandActiveSubMenu(this.menuService.getMenuItems());
  }

  public toggleSidenav() {
    this.sidenav.toggle();
  }

  public scrollToTop() {
    var scrollDuration = 200;
    var scrollStep = -window.pageYOffset / (scrollDuration / 20);
    var scrollInterval = setInterval(() => {
      if (window.pageYOffset != 0) {
        window.scrollBy(0, scrollStep);
      } else {
        clearInterval(scrollInterval);
      }
    }, 10);
    if (window.innerWidth <= 768) {
      setTimeout(() => {
        window.scrollTo(0, 0);
      });
    }
  }

  @HostListener("window:resize")
  public onWindowResize(): void {
    if (window.innerWidth <= 960) {
      this.settings.adminSidenavIsOpened = false;
      this.settings.adminSidenavIsPinned = false;
    } else {
      this.settings.adminSidenavIsOpened = true;
      this.settings.adminSidenavIsPinned = true;
    }
  }
}
