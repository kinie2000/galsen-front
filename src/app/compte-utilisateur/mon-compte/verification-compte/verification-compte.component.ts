import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { emailValidator } from 'src/app/theme/utils/app-validators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginserviceService } from 'src/app/services/loginservice.service';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: "app-verification-compte",
  templateUrl: "./verification-compte.component.html",
  styleUrls: ["./verification-compte.component.scss"],
})

export class VerificationCompteComponent implements OnInit {
  public VerificationCompteForm!: UntypedFormGroup;
  public infoFormEmail!: UntypedFormGroup;
  public infoFormPhone!: UntypedFormGroup;
  public userImage: any;
  show = false;
  dataUser: any;
  public userDetails: any;

  public userIn: any;
  public item: any;

  constructor(
    public formBuilder: UntypedFormBuilder,
    public snackBar: MatSnackBar,
    private service: UserServiceService,
    public loginService: LoginserviceService
  ) {}

  ngOnInit(): void {
    this.VerificationCompteForm = this.formBuilder.group({
      name: [
        "",
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],

      NumeroPermis: ["", Validators.required],
      Pays: ["", Validators.required],
      DateObtention: [null, Validators.required],
      image: null,

      facebook: null,
      website: null,
    });
 

    const storage = localStorage.getItem("facebook_auth");
    const storageAuth = localStorage.getItem("user");
    if (storageAuth) {
      this.userIn = JSON.parse(storageAuth);
    }

    // else {
    //   this.logout();
    // }
    console.log(this.userDetails?.email);
    this.userImage = this.userDetails?.photoUrl;
    this.service.getUserFind(this.userDetails.user.id).subscribe((data: any) => {
console.log( data[0].isVerified)
this.show = data[0].isVerified
this.dataUser= data[0].user_phone


     })


  }

  public onInfoFormSubmit(): void {
    if (this.VerificationCompteForm.valid) {
      this.snackBar.open(
        "Your account information updated successfully!",
        "×",
        { panelClass: "success", verticalPosition: "top", duration: 3000 }
      );
    }
  }

  public fileChange(files: any) {
    if (files.length) {
      this.VerificationCompteForm.controls.image.patchValue(files[0].content);
    } else {
      this.VerificationCompteForm.controls.image.patchValue(null);
    }
  }

}



