import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { emailValidator } from 'src/app/theme/utils/app-validators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppService } from 'src/app/app.service';
import { LoginserviceService } from 'src/app/services/loginservice.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: "app-permis",
  templateUrl: "./permis.component.html",
  styleUrls: ["./permis.component.scss"],
})
export class PermisComponent implements OnInit {
  public infoFormPermis!: UntypedFormGroup;
  public countries: any[] = [];
  public data: any;
  public userIn: any;
  public item: any;
  civilite = [
    { value: "Mr", viewValue: "Mr" },
    { value: "Mme", viewValue: "Mme" },
    { value: "Mlle", viewValue: "Mlle" },
  ];

  constructor(
    public formBuilder: UntypedFormBuilder,
    public appService: AppService,
    public snackBar: MatSnackBar,
    public loginService: LoginserviceService,
    private datePipe: DatePipe,
    public router: Router
  ) { }

  ngOnInit() {
    this.countries = this.appService.getCountries();
    this.infoFormPermis = this.formBuilder.group({
      //driver_licenses_country: "",
      driver_licenses_date: "",
      driver_licenses_number: "",
      driver_licenses_country: ["", Validators.required],
    });
    const storage = localStorage.getItem("facebook_auth");
    const storageAuth = localStorage.getItem("user");
    if (storageAuth) {
      this.userIn = JSON.parse(storageAuth);
    }
    if (storage) {
      this.userIn = JSON.parse(storage);
    }
    const email = this.userIn.email;
    this.loginService.getinfoUser(email).subscribe((data) => {
      this.item = data;
      console.log(data);
    });
    this.infoFormPermis.get("driver_licenses_number")?.setValue(this.item?.driver_licenses_number);
  }

  public onInfoFormPermisSubmit(): void {


    const storage = localStorage.getItem("facebook_auth");
    const storageAuth = localStorage.getItem("user");
    if (storageAuth) {
      this.userIn = JSON.parse(storageAuth);
    }
    if (storage) {
      this.userIn = JSON.parse(storage);
    }

    const email = this.userIn.email;
    const maDate = this.datePipe.transform(this.infoFormPermis.value.driver_licenses_date, "YYYY-MM-dd");
    this.loginService.getinfoUser(email).subscribe((data) => {
      this.item = data;
      console.log(data);
    });

    this.data = this.infoFormPermis.value;
    if (!this.data.driver_licenses_number) {
      this.infoFormPermis.get("driver_licenses_number")?.setValue(this.item?.driver_licenses_number);
    }
    if (!this.data.driver_licenses_date) {
      this.infoFormPermis.get("driver_licenses_date")?.setValue(maDate);
    }

    if (this.infoFormPermis.valid) {
      console.log(maDate);
      this.infoFormPermis.get("driver_licenses_date")?.setValue(maDate);
      this.data = this.infoFormPermis.value;
      console.log(this.data)
      this.loginService.updatePermis(email, this.data).subscribe((data) => {
        console.log(data);
        sessionStorage.setItem("user", JSON.stringify(data));
        localStorage.setItem("user", JSON.stringify(data));
      });
    }
    this.router.navigateByUrl(
      "/compte-utilisateur/mon-compte/permis-valide"
    );

  }
}