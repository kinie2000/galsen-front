import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AppService } from "src/app/app.service";

@Component({
  selector: "app-user-menu",
  templateUrl: "./user-menu.component.html",
  styleUrls: ["./user-menu.component.scss"],
})
export class UserMenuComponent implements OnInit {
  mailSnippets: string[] = [];
  public userDetails: any;
  show : boolean;
  check:any;
  constructor(public appService: AppService, public router: Router) {}
  ngOnInit() {
    const storage = localStorage.getItem("facebook_auth");
    const storageAuth = localStorage.getItem("user");

  //   if (storage) {
  //     this.userDetails = JSON.parse(storage);
    
  // }
  this.show = true;
    if (storageAuth) {
      this.userDetails = JSON.parse(storageAuth);

      this.show = false;

    }
    console.log(this.userDetails)

  }
  logout(): void {
    localStorage.removeItem("facebook_auth");
    sessionStorage.removeItem("facebook_auth");
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");

     this.router.navigateByUrl("/", { skipLocationChange: true })  .then(() => {
      window.location.reload();
    });
  }
}
