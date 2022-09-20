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
  selector: "app-verifcode",
  templateUrl: "./verifcode.component.html",
  styleUrls: ["./verifcode.component.scss"],
})
export class VerifcodeComponent implements OnInit {
  public loginForm!: UntypedFormGroup;
  public data: any;
  public bgImage: any;
  public val: any;
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
      code: [
        null,
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
    });
  }
  public onLoginFormSubmit(): void {
    this.data = this.loginForm.value;
    console.log(this.data.code);
    if (this.loginForm.valid) {
      this.loginService.verifcode(this.data).subscribe((data) => {
        console.log(data);

        this.router.navigate(["/newpass"], {
          queryParams: { code: this.data.code },
        });
        /** this.router.navigate(['/products'], { queryParams: { order: 'popular', 'price-range': 'not-cheap' } }); */
      });
    }
  }
}
