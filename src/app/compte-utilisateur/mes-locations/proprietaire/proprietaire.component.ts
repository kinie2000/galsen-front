import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { emailValidator } from 'src/app/theme/utils/app-validators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-proprietaire',
  templateUrl: './proprietaire.component.html',
  styleUrls: ['./proprietaire.component.scss']
})
export class ProprietaireComponent implements OnInit {

  public VerificationCompteForm!:UntypedFormGroup; 
  public infoFormEmail!:UntypedFormGroup; 
  public infoFormPhone!:UntypedFormGroup;
  constructor(public formBuilder: UntypedFormBuilder, public snackBar: MatSnackBar) { }

  ngOnInit(): void {

    this.VerificationCompteForm = this.formBuilder.group({
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
    if (this.VerificationCompteForm.valid) { 
      this.snackBar.open('Your account information updated successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
    }
  } 

  public fileChange(files:any){ 
    if(files.length){
      this.VerificationCompteForm.controls.image.patchValue(files[0].content); 
    } 
    else{
      this.VerificationCompteForm.controls.image.patchValue(null); 
    }
  } 

}



