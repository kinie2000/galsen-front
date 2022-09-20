import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { emailValidator } from 'src/app/theme/utils/app-validators';
import { MatSnackBar } from '@angular/material/snack-bar';

import { LoginserviceService } from 'src/app/services/loginservice.service';

@Component({
  selector: "app-preference-valide",
  templateUrl: "./preference-valide.component.html",
  styleUrls: ["./preference-valide.component.scss"],
})
export class PreferenceValideComponent implements OnInit {
  public PreferenceValideForm!: UntypedFormGroup;
  public myModelMail = false;
  public myModelMobil = false;
  public myModelMess = false;
  public myModelTel = false;
  public item: any;
  public userIn: any;
  constructor(
    public formBuilder: UntypedFormBuilder,
    public snackBar: MatSnackBar,
    public loginService: LoginserviceService
  ) {}

  ngOnInit() {
    this.PreferenceValideForm = this.formBuilder.group({
      paremail: false,
      parnotificationmobile: "",
      parsms: false,
      partelephone: false,
    });
    this.chargement();
  }

  public onPreferenceValideFormSubmit(): void {
    if (this.PreferenceValideForm.valid) {
      window.location.href = "compte-utilisateur/mon-compte/mes-parametres";
      //this.snackBar.open('Your account information updated successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
    }
  }

  public fileChange(files: any) {
    if (files.length) {
      this.PreferenceValideForm.controls.image.patchValue(files[0].content);
    } else {
      this.PreferenceValideForm.controls.image.patchValue(null);
    }
  }
  public chargement() {
    const storage = localStorage.getItem("facebook_auth");
    const storageAuth = localStorage.getItem("user");
 if (storageAuth) {
   this.userIn = JSON.parse(storageAuth);
 }
    if (storage) {
      this.userIn = JSON.parse(storage);
    }
    const id = this.userIn.id;
    console.log(id);
    this.loginService.findnotif(id).subscribe((data) => {
      this.item = data;
      console.log(data);
       if (this.item?.notif_email === 1) {
         this.myModelMail = true;
       }
       if (this.item?.notif_sms === 1) {
         this.myModelMess = true;
       }
        if (this.item?.notif_mobile === 1) {
          this.myModelMobil = true;
        }
         if (this.item?.notif_phone === 1) {
           this.myModelTel = true;
         }
       
       console.log(this.item?.notif_phone);
    });
   
  }
}

