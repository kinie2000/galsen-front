import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { emailValidator } from 'src/app/theme/utils/app-validators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: "app-locataire",
  templateUrl: "./locataire.component.html",
  styleUrls: ["./locataire.component.scss"],
})
export class LocataireComponent implements OnInit {
  public infoForm!: UntypedFormGroup;
  constructor(
    public formBuilder: UntypedFormBuilder,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.infoForm = this.formBuilder.group({
      name: [
        "",
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      email: ["", Validators.compose([Validators.required, emailValidator])],
      phone: ["", Validators.required],
      NumeroPermis: ["", Validators.required],
      Pays: ["", Validators.required],
      DateObtention: [null, Validators.required],
      image: null,
      //organization: null,
      facebook: null,
      // twitter: null,
      // linkedin: null,
      // instagram: null,
      website: null,
    });
  }

  public onInfoFormSubmit(): void {
    if (this.infoForm.valid) {
      this.snackBar.open(
        "Your account information updated successfully!",
        "×",
        { panelClass: "success", verticalPosition: "top", duration: 3000 }
      );
    }
  }
  public select()
  {
    
  }
}
