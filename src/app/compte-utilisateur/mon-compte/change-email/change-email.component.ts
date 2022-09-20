import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { matchingPasswords } from 'src/app/theme/utils/app-validators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginserviceService } from 'src/app/services/loginservice.service';

@Component({
  selector: "app-change-email",
  templateUrl: "./change-email.component.html",
  styleUrls: ["./change-email.component.scss"],
})
export class EmailChangeComponent implements OnInit {
  public emailForm!: UntypedFormGroup;
  public data: any;
  public userIn: any;
  public email: any;
  constructor(
    public formBuilder: UntypedFormBuilder,
    public snackBar: MatSnackBar,
    public loginService: LoginserviceService
  ) {}

  ngOnInit(): void {
    const storage = localStorage.getItem("user");
     if (storage) {
       this.userIn = JSON.parse(storage);
     }
     this.email = this.userIn.email;
    this.emailForm = this.formBuilder.group({
      newEmail: [this.email, Validators.required],

    });
  }

  public onPasswordFormSubmit(): void {
    const storage = localStorage.getItem("user");

    if (storage) {
      this.userIn = JSON.parse(storage);
    }
    this.email = this.userIn.email;
    console.log(this.email);

    this.data = this.emailForm.value;
    console.log(this.data);
    if (this.emailForm.valid) {
      let obj = {
        code: this.email,
        Nemail: this.data.newEmail,
      };
      this.loginService.changemail(obj).subscribe((data) => {
        console.log(data);

        sessionStorage.setItem("user", JSON.stringify(data));
        localStorage.setItem("user", JSON.stringify(data));

      });
      this.snackBar.open("Your password changed successfully!", "×", {
        panelClass: "success",
        verticalPosition: "top",
        duration: 3000,
      });
    }
  }

}

