import { Component, OnInit } from "@angular/core";
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { DomSanitizer } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { LoginserviceService } from "src/app/services/loginservice.service";

@Component({
  selector: "app-newpassword",
  templateUrl: "./newpassword.component.html",
  styleUrls: ["./newpassword.component.scss"],
})
export class NewpasswordComponent implements OnInit {
  public loginForm!: UntypedFormGroup;
  public data: any;
  public bgImage: any;
  public code: any;
  constructor(
    public fb: UntypedFormBuilder,
    private sanitizer: DomSanitizer,
    public loginService: LoginserviceService,
    public router: Router,
    private activetedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.bgImage = this.sanitizer.bypassSecurityTrustStyle(
      "url(assets/images/others/login.jpg)"
    );
    this.loginForm = this.fb.group({
      password: [
        null,
        Validators.compose([Validators.required, Validators.minLength(6)]),
      ],
    });
    this.code = this.activetedRoute.snapshot.queryParamMap.get("code");
    console.log(this.code);
  }
  public onLoginFormSubmit(): void {
    this.data = this.loginForm.value;
    let obj = {
      code: this.code,
      pwd: this.data.password,
    };

    console.log(obj);
    if (this.loginForm.valid) {
      this.loginService.newpass(obj).subscribe((data) => {
        console.log(data);
      });
      this.router.navigateByUrl("/login");
    }
  }
}
