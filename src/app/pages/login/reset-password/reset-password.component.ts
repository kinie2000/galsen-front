import { Component, OnInit } from "@angular/core";
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { DomSanitizer } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { LoginserviceService } from "src/app/services/loginservice.service";

@Component({
  selector: "app-reset-password",
  templateUrl: "./reset-password.component.html",
  styleUrls: ["./reset-password.component.scss"],
})
export class ResetPasswordComponent implements OnInit {
  public loginForm!: UntypedFormGroup;
  public data: any;
  public bgImage: any;
  constructor(
    public fb: UntypedFormBuilder,
    private sanitizer: DomSanitizer,
    public loginService: LoginserviceService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.bgImage = this.sanitizer.bypassSecurityTrustStyle(
      "url(assets/images/others/login.jpg)"
    );
    this.loginForm = this.fb.group({
      email: [
        null,
        Validators.compose([Validators.required, Validators.email]),
      ],
    });
  }
  public onLoginFormSubmit(): void {
    this.data = this.loginForm.value;
    console.log(this.data);
    if (this.loginForm.valid) {
      this.loginService.resetpass(this.data).subscribe((data) => {
        console.log(data);
        this.router.navigateByUrl("/verif");
      });
    }
  }
}
