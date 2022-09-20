import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { matchingPasswords } from 'src/app/theme/utils/app-validators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginserviceService } from 'src/app/services/loginservice.service';

@Component({
  selector: "app-password-change",
  templateUrl: "./password-change.component.html",
  styleUrls: ["./password-change.component.scss"],
})
export class PasswordChangeComponent implements OnInit {
  public passwordForm!: UntypedFormGroup;
  public data: any;
  public userIn: any;
  public message: string | undefined;
  constructor(
    public formBuilder: UntypedFormBuilder,
    public snackBar: MatSnackBar,
    public loginService: LoginserviceService
  ) {}

  ngOnInit(): void {
    this.passwordForm = this.formBuilder.group(
      {
        currentPassword: ["", Validators.required],
        newPassword: ["", Validators.required],
        confirmNewPassword: ["", Validators.required],
      },
      { validator: matchingPasswords("newPassword", "confirmNewPassword") }
    );
     
      
  }

  public onPasswordFormSubmit(): void {

    const storage = localStorage.getItem("facebook_auth");
    const storageAuth = localStorage.getItem("user");
    if (storageAuth) {
      this.userIn = JSON.parse(storageAuth);
    }

    if (storage) {
      this.userIn = JSON.parse(storage);
    }
    const email = this.userIn.email;
    console.log(email);

    this.data = this.passwordForm.value;
    console.log(this.data);
    if (this.passwordForm.valid) {
       let obj = {
         code: email,
         pwd: this.data.newPassword,
       };
      this.loginService.createcmd(obj).subscribe(
        (data) => {
          console.log(data);
          this.snackBar.open("Your password changed successfully!", "×", {
            panelClass: "success",
            verticalPosition: "top",
            duration: 3000,
          });
        },
        (error) => {
          this.message = "information";
        }
      );
     
    }
  }

}

