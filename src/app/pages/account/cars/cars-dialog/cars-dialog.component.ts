import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import { Subject } from 'rxjs';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-cars-dialog',
  
  templateUrl: './cars-dialog.component.html',
  styleUrls: ['./cars-dialog.component.scss']
})
export class CarsDialogComponent implements OnInit {

  userId:any = 0;
  public form:FormGroup| any;
  constructor(public dialogRef: MatDialogRef<CarsDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public fb: UntypedFormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      image: null,
      // id: this.userId, 
      Caractéristiques_Principales: this.fb.group({ 
        vehicule_type: ['', Validators.required],
        vehicule_mark: ['', Validators.required],
        vehicule_model: ['', Validators.required],
        vehicule_energy: ['', Validators.required],
        vehicule_NbrPlace: ['', Validators.required],
        vehicule_NbrPorte: ['', Validators.required],
        vehicule_Kilometrage: ['', Validators.required],
        vehicule_VitesseBox: ['', Validators.required],
   
 
        
      }),
      Info_Assurance: this.fb.group({ 
        vehicule_date_release: ['', Validators.required],
        vehicule_date_next_controle: ['', Validators.required],
        vehicule_immatriculation: ['', Validators.required],
        inssurance_number: ['', Validators.required],
        inssurance_date_start: ['', Validators.required],
        inssurance_date_end: ['', Validators.required],
        name_person: ['', Validators.required],
        surname_person: ['', Validators.required],
       tel: ['', Validators.required],

      
      })
      ,
      Valeur_Voiture: this.fb.group({ 
       vehicule_value: ['', Validators.required],

      }),
      Disponibilité: this.fb.group({ 
      vehicule_address: ['', Validators.required],    
      }),
    
   Presentation_Locataire: this.fb.group({ 
      vehicule_description: ['', Validators.required],
      
    }),
    Calendrier: this.fb.group({ 
      vehicule_description: ['', Validators.required],
     
    }),
    Location: this.fb.group({ 
      vehicule_description: ['', Validators.required],
     
    }),
  })

    if(this.data.customer){
      this.form.patchValue(this.data.customer); 
    };
  }
  public fileChange(files:any){ 
    if(files.length){
      this.form.controls.image.patchValue(files[0].content); 
    } 
    else{
      this.form.controls.image.patchValue(null); 
    }
  } 
  public onSubmit(){ 
    if(this.form.valid){
      this.dialogRef.close(this.form.value);
    }
  }

  public compareFunction(o1: any, o2: any) {
    return (o1.name == o2.name && o1.code == o2.code);
  }
}
