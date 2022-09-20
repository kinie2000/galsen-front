import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-user-menu",
  templateUrl: "./user-menu.component.html",
  styleUrls: ["./user-menu.component.scss"],
})
export class UserMenuComponent implements OnInit {
  mailSnippets: string[] = [];
  public userDetails: any;
  constructor(public router: Router) {}
  ngOnInit() {
    const storage = localStorage.getItem("facebook_auth");
    const storageAuth = localStorage.getItem("user");

    if (storage) {
      this.userDetails = JSON.parse(storage);
    }
    if (storageAuth) {
      this.userDetails = JSON.parse(storageAuth);
    }
    // else {
    //   this.logout();
    // }
  }
  logout(): void {
    localStorage.removeItem("facebook_auth");
    sessionStorage.removeItem("facebook_auth");
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");

    this.router.navigateByUrl("/login");
  }
}
