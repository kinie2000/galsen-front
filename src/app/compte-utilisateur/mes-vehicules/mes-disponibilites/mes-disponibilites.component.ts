import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { emailValidator } from 'src/app/theme/utils/app-validators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms'; import { CarsService } from 'src/app/services/cars.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-mes-disponibilites',
  templateUrl: './mes-disponibilites.component.html',
  styleUrls: ['./mes-disponibilites.component.scss']
})
export class MesDisponibilitesComponent implements OnInit {



  selectedDay: string[];
  selectedDispo: any[]
  //  ['Je suis disponible 24h','Je suis disponible à des plages horaires','Je ne suis pas disponible']
  form: FormGroup;
  jours: any[]
  journey: any[]
  formName: any[]
  idWeek: number;
  idDispo: number;
  checkArray: any;
  idDriverL: any;
  data: any[];
  public VerificationCompteForm!: UntypedFormGroup;
  public infoFormEmail!: UntypedFormGroup;
  public infoFormPhone!: UntypedFormGroup;
  constructor(private fb: FormBuilder,
    public snackBar: MatSnackBar,
    private toastr: ToastrService,
    public service: CarsService) { }

  ngOnInit(): void {
    const storage = localStorage.getItem("user");
    if (storage) {
      this.idDriverL = JSON.parse(storage);
    }

    //on recupere les jours de la semaine
    this.service.week().subscribe((data: any) => {
      console.log(data)
      this.jours = data;



      console.log(this.jours)
    });

    //on recupere les disponibilité
    this.service.dispoDay().subscribe((data: any) => {
      console.log(data)


      this.selectedDispo = data


    });



    // }); 
    this.form = this.fb.group({
      1: ['', Validators.required],
      2: ['', Validators.required],
      3: ['', Validators.required],
      4: ['', Validators.required],
      5: ['', Validators.required],
      6: ['', Validators.required],
      7: ['', Validators.required],


    })

  }


  submitForm() {
    if (this.form.valid) {
      let obj = {
        idUser: this.idDriverL.user.id,
        disponibilite: this.form.value

        //   // availablity_date:checkArray.value

      }
// ici nous creons les differentes disponibilité
      this.service.CreateDisponibility(obj).subscribe((data: any) => {

        this.toastr.success('disponibility add succefully  ')
      }, (error: any) => {
        throw error;
      }
      );
    } else {
      this.toastr.error('add all disponibility   ')

    }


  }


  public fileChange(files: any) {
    if (files.length) {
      this.VerificationCompteForm.controls.image.patchValue(files[0].content);
    }
    else {
      this.VerificationCompteForm.controls.image.patchValue(null);
    }
  }

}


