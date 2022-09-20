import { Component, OnInit } from "@angular/core";
import {UntypedFormBuilder,UntypedFormGroup,Validators,} from "@angular/forms";
import { emailValidator } from "src/app/theme/utils/app-validators";
import { MatSnackBar } from "@angular/material/snack-bar";
import { LoginserviceService } from "src/app/services/loginservice.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-preference",
  templateUrl: "./preference.component.html",
  styleUrls: ["./preference.component.scss"],
})
export class PreferenceComponent implements OnInit {

  public infoForm!: UntypedFormGroup;
  public userIn: any;
  public data: any;
  public item: any;
  public myModelMail = false;
  public myModelMobil = false;
  public myModelMess = false;
  public myModelTel = false;
  public obj: any;
 
  constructor(
    public formBuilder: UntypedFormBuilder,
    public snackBar: MatSnackBar,
    public loginService: LoginserviceService,
    public router: Router
  ) {}

  ngOnInit() {
    this.infoForm = this.formBuilder.group({
      email: "",
      phone: "",
      mobile: "",
      sms: "",
      id_user: "",
    });
  this.chargement();
  }

  public onInfoFormSubmit(): void {
    const storage = localStorage.getItem("facebook_auth");
    const storageAuth = localStorage.getItem("user");
    if (storageAuth) {
      this.userIn = JSON.parse(storageAuth);
    }
    if (storage) {
      this.userIn = JSON.parse(storage);

    }
    const id_user = this.userIn.id;
    id_user: this.infoForm.get("id_user")?.setValue(id_user);
   this.obj = {
     notif_email: false,
     notif_mobile: false,
     notif_sms: false,
     notif_phone: false,
     id_user:0,
   };
    if (this.obj.notif_email==1) {
       this.infoForm.get("email")?.setValue(this.item?.notif_email);
    }
     if (this.obj.notif_mobile == 1) {
       this.infoForm.get("mobile")?.setValue(this.item?.notif_mobile);
     }
      if (this.obj.notif_sms == 1) {
        this.infoForm.get("sms")?.setValue(this.item?.notif_sms);
      }
       if (this.obj.notif_phone == 1) {
         this.infoForm.get("phone")?.setValue(this.item?.notif_phone);
       } 
         this.obj = {
           notif_email: this.infoForm.get("email")?.value,
           notif_mobile: this.infoForm.get("mobile")?.value,
           notif_sms: this.infoForm.get("sms")?.value,
           notif_phone: this.infoForm.get("phone")?.value,
           id_user: this.infoForm.get("id_user")?.value,
         };
    if (this.infoForm.valid) {
      this.loginService.createnotif(this.obj).subscribe((data) => {
        console.log(data);
      });
      this.snackBar.open(
        "Your account information updated successfully!",
        "×",
        { panelClass: "success", verticalPosition: "top", duration: 3000 }
      );
      this.router.navigateByUrl(
        "/compte-utilisateur/mon-compte/mes-parametres-valide"
      );
    }
  }

  public fileChange(files: any) {
    if (files.length) {
      this.infoForm.controls.image.patchValue(files[0].content);
    } else {
      this.infoForm.controls.image.patchValue(null);
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