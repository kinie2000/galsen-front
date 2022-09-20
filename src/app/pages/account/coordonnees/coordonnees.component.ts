import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { emailValidator } from 'src/app/theme/utils/app-validators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-coordonnees',
  templateUrl: './coordonnees.component.html',
  styleUrls: ['./coordonnees.component.scss']
})
export class CoordonneesComponent implements OnInit {
  public infoFormcoordonnees!:UntypedFormGroup; 
  public countries:any[] = [];
  
  constructor(public formBuilder: UntypedFormBuilder, public appService:AppService, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.countries = this.appService.getCountries();
    this.infoFormcoordonnees = this.formBuilder.group({
      Nom: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      //email: ['', Validators.compose([Validators.required, emailValidator])],
      Prenom: ['', Validators.required],
      DateNaissance: [null, Validators.required],
      Phone: ['', Validators.required],
      Quelquesmots: ['', Validators.required],
      Place: ['', Validators.required],
      PostalCode: ['', Validators.required],
      image: null,      
      //organization: null,
      facebook: null,
      // twitter: null,
      // linkedin: null,
      // instagram: null,
      website: null
    }); 
  

  }

  public onInfoFormCoordonneesSubmit():void {
    if (this.infoFormcoordonnees.valid) { 
      this.snackBar.open('Your account information updated successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
    }
  } 


}
