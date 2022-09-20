import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { emailValidator } from 'src/app/theme/utils/app-validators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppService } from 'src/app/app.service';
import { LoginserviceService } from 'src/app/services/loginservice.service';

@Component({
  selector: "app-coordonnees-valide",
  templateUrl: "./coordonnees-valide.component.html",
  styleUrls: ["./coordonnees-valide.component.scss"],
})
export class CoordonneesValideComponent implements OnInit {
  public infoFormcoordonneesValide!: UntypedFormGroup;
  public countries: any[] = [];
  public userIn: any;
  public item: any;

  constructor(
    public formBuilder: UntypedFormBuilder,
    public appService: AppService,
    public snackBar: MatSnackBar,
    public loginService: LoginserviceService
  ) {}

  ngOnInit() {
    
     this.infoFormcoordonneesValide = this.formBuilder.group({
       civilite:"",
       Nom:"",
       Prenom:"",
       DateNaissance:"",
       Phone:"",
       Quelquesmots:"",
       Place:"",
       city:"",
       PostalCode:"",
       image: null,
       facebook: null,
       website: null,
       country: ["", Validators.required],
     });
    this.countries = this.appService.getCountries();

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

  public onInfoFormCoordonneesValideSubmit(): void {
    if (this.infoFormcoordonneesValide.valid) {
      window.location.href =
         "compte-utilisateur/mon-compte/mes-coodonnees";
    
    }
  }
}