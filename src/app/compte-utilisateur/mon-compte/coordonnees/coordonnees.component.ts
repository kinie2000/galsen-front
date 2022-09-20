import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { emailValidator } from 'src/app/theme/utils/app-validators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppService } from 'src/app/app.service';
import { LoginserviceService } from 'src/app/services/loginservice.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: "app-coordonnees",
  templateUrl: "./coordonnees.component.html",
  styleUrls: ["./coordonnees.component.scss"],
})
export class CoordonneesComponent implements OnInit {
  public infoFormcoordonnees!: UntypedFormGroup;
  public countries: any[] = [];
  public data: any;
  public userIn: any;

  public item:any;
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
  ) {}

  ngOnInit() {
    this.countries = this.appService.getCountries();
    this.infoFormcoordonnees = this.formBuilder.group({

      Nom:"",
      Prenom: "",
      DateNaissance:"",
      Phone:"",
      Quelquesmots:"",
      Place:"",
      city:"",
      PostalCode:"",
      civilite:"",
      image: null,
      facebook: null,
      website: null,
      country: ["", Validators.required],
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
      this.infoFormcoordonnees.get("Nom")?.setValue(this.item?.user_name);
      this.infoFormcoordonnees.get("Prenom")?.setValue(this.item?.user_surname);
      this.infoFormcoordonnees.get("Phone")?.setValue(this.item?.user_phone);
      this.infoFormcoordonnees.get("Quelquesmots")?.setValue(this.item?.user_description);
      this.infoFormcoordonnees.get("Place")?.setValue(this.item?.user_adress);
      this.infoFormcoordonnees.get("city")?.setValue(this.item?.user_city);
      this.infoFormcoordonnees.get("PostalCode")?.setValue(this.item?.user_code_postal);
  }

  public onInfoFormCoordonneesSubmit(): void {
    

     const storage = localStorage.getItem("facebook_auth");
     const storageAuth = localStorage.getItem("user");
     if (storageAuth) {
       this.userIn = JSON.parse(storageAuth);
     }
     if (storage) {
       this.userIn = JSON.parse(storage);
     }
    
    const email = this.userIn.email;
    const maDate = this.datePipe.transform(this.infoFormcoordonnees.value.DateNaissance,"YYYY-MM-dd");
      this.loginService.getinfoUser(email).subscribe((data) => {
        this.item = data;
        console.log(data);
      });
       
     this.data = this.infoFormcoordonnees.value;
if (!this.data.Nom) {
  this.infoFormcoordonnees.get("Nom")?.setValue(this.item?.user_name);
}
if (!this.data.Prenom) {
  this.infoFormcoordonnees.get("Prenom")?.setValue(this.item?.user_surname);
}
if (!this.data.Phone) {
  this.infoFormcoordonnees.get("Phone")?.setValue(this.item?.user_phone);
}
if (!this.data.Quelquesmots) {
  this.infoFormcoordonnees
    .get("Quelquesmots")
    ?.setValue(this.item?.user_description);
}
if (!this.data.Place) {
  this.infoFormcoordonnees.get("Place")?.setValue(this.item?.user_adress);
}
if (!this.data.city) {
  this.infoFormcoordonnees.get("city")?.setValue(this.item?.user_city);
}
if (!this.data.PostalCode) {
  this.infoFormcoordonnees
    .get("PostalCode")
    ?.setValue(this.item?.user_code_postal);
}
if (!this.data.DateNaissance) {
  this.infoFormcoordonnees.get("DateNaissance")?.setValue(maDate);
} 
   
    if (this.infoFormcoordonnees.valid) {
       console.log(maDate);
      this.infoFormcoordonnees.get("DateNaissance")?.setValue(maDate);
      this.data = this.infoFormcoordonnees.value;
      console.log(this.data)     
      this.loginService.updateUser(email, this.data).subscribe((data) => {
        console.log(data);
        sessionStorage.setItem("user", JSON.stringify(data));
        localStorage.setItem("user", JSON.stringify(data));
      });      
    }
   this.router.navigateByUrl(
     "/compte-utilisateur/mon-compte/mes-coodonnees-valide"
   );
   
  }
}
