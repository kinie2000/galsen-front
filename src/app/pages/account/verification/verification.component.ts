import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { emailValidator } from 'src/app/theme/utils/app-validators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss']
})
export class VerificationComponent implements OnInit {
  public infoForm!:UntypedFormGroup; 
  public infoFormEmail!:UntypedFormGroup; 
  public infoFormPhone!:UntypedFormGroup;
  constructor(public formBuilder: UntypedFormBuilder, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.infoForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      //email: ['', Validators.compose([Validators.required, emailValidator])],
     // phone: ['', Validators.required],
      NumeroPermis: ['', Validators.required],
      Pays: ['', Validators.required],
      DateObtention: [null, Validators.required],
      image: null,      
      //organization: null,
      facebook: null,
      // twitter: null,
      // linkedin: null,
      // instagram: null,
      website: null
    }); 
    this.infoFormEmail = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, emailValidator])]
    });
    this.infoFormPhone = this.formBuilder.group({
      phone: ['', Validators.required]
    });

  }

  public onInfoFormSubmit():void {
    if (this.infoForm.valid) { 
      this.snackBar.open('Your account information updated successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
    }
  } 

  public fileChange(files:any){ 
    if(files.length){
      this.infoForm.controls.image.patchValue(files[0].content); 
    } 
    else{
      this.infoForm.controls.image.patchValue(null); 
    }
  } 

}
