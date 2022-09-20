import { Component, Inject, OnInit, Input } from "@angular/core";
import { FormBuilder, FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
import { VehiculeserviceService } from 'src/app/services/vehiculeservice.service';
import { CarIn } from './car-in';
import { LoginserviceService } from 'src/app/services/loginservice.service';
import { Router } from '@angular/router';
import { TemplateSearchCar } from "src/app/app.models";
import { DataSearchService } from 'src/app/services/data-search.service';
import { Options } from "ngx-google-places-autocomplete/objects/options/options";

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
  selector: "app-cars-dialog",
  templateUrl: "./cars-dialog.component.html",
  styleUrls: ["./cars-dialog.component.scss"],
})
export class CarsDialogComponent implements OnInit {
  //Local Variable Defined

  address: string;
  geometry: object;

  options: Options = new Options({
    componentRestrictions: {
      country: "SN",
    },
  });
  userId: any = 0;
  public form: FormGroup | any;
  public firstFormGroup: FormGroup | any;
  public secondFormGroup: FormGroup | any;
  public troisFormGroup: FormGroup | any;
  public ktriemFormGroup: FormGroup | any;
  public cinkiemFormGroup: FormGroup | any;
  public sixiemFormGroup: FormGroup | any;
  public setiemFormGroup: FormGroup | any;
  public huitiemFormGroup: FormGroup | any;
  public allmodel: any;
  public allmark: any;
  public alltyp: any;
  public allenerg: any;
  public allbtvt: any;
  public allnbrpl: any;
  public allnbrport: any;
  public selected: any;
  public id_mark: any;
  public tab: Array<CarIn> = [];
  public tabimg: Array<any> = [];
  images: string[] = [];
  public userIn: any;
  public currentItem: any;
  public items: any;
  public isCompleted: boolean;
  isLinear = true;

  public valueDatePickerEnd?: Date;
  public minDateStart: Date;
  public minDateEnd: Date;
  public currentDateStart?: string;
  public currentDateEnd?: string;

  dateStart: any;
  dateEnd: any;
  todayWithPipe: any;
  periodStart?: string;
  periodEnd?: string;
  currentDateFormat?: string;
  templateSearchCar: TemplateSearchCar;

  constructor(
    public dialogRef: MatDialogRef<CarsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject(MAT_DIALOG_DATA) public dataimg: any,
    @Inject(MAT_DIALOG_DATA) public dataIdveh: number,
    @Inject(MAT_DIALOG_DATA) public datacaracveh: any,
    @Inject(MAT_DIALOG_DATA) public item: any,
    public fb: UntypedFormBuilder,
    private _formBuilder: FormBuilder,
    public snackBar: MatSnackBar,
    private datePipe: DatePipe,
    public carservice: VehiculeserviceService,
    public loginService: LoginserviceService,
    public router: Router
  ) {
    this.minDateStart = new Date();
    this.minDateEnd = new Date();
  }

  ngOnInit(): void {
    this.todayWithPipe = this.datePipe.transform(
      this.minDateStart,
      "dd/MM/yyyy"
    );
    this.firstFormGroup = this._formBuilder.group({
      vehicule_type: ["", Validators.required],
      vehicule_mark: ["", Validators.required],
      vehicule_model: ["", Validators.required],
      vehicule_energy: ["", Validators.required],
      vehicule_NbrPlace: ["", Validators.required],
      vehicule_NbrPorte: ["", Validators.required],
      vehicule_Kilometrage: ["", Validators.required],
      vehicule_VitesseBox: ["", Validators.required],
    });
    this.secondFormGroup = this.fb.group({
      vehicule_date_release: ["", Validators.required],
      vehicule_date_next_controle: ["", Validators.required],
      vehicule_immatriculation: ["", Validators.required],
      inssurance_number: ["", Validators.required],
      inssurance_date_start: ["", Validators.required],
      inssurance_date_end: ["", Validators.required],
      name_person: "",
      surname_person: "",
      tel: "",
      civilite: "",
    });
    this.troisFormGroup = this.fb.group({
      vehicule_value: "",
    });

    this.ktriemFormGroup = this.fb.group({
      vehicule_address: ["", Validators.required],
      lat: "",
      long: "",
    });

    this.cinkiemFormGroup = this.fb.group({
      vehicule_description: ["", Validators.required],
      Sec_ESP: "",
      Sec_Rad: "",
      Sec_Air: "",
      Sec_ABS: "",
      Sec_Direc: "",
      Sec_sieg_enf: "",
      Sec_GPS: "",
      Sec_cof: "",
      Sec_pneu: "",
      id_veh: "",
    });
    this.sixiemFormGroup = this.fb.group({
      file: [Validators.required],
      fileSource: [Validators.required],
      id_veh: "",
    });
    this.setiemFormGroup = this.fb.group({
      vehicule_dispo: ["", Validators.required],
    });
    this.huitiemFormGroup = this.fb.group({
      prixkmjr: ["", Validators.required],
      prix100km: ["", Validators.required],
    });

    this.form = this.fb.group({
      image: null,
      // id: this.userId,
      Caractéristiques_Principales: this.fb.group({
        vehicule_type: ["", Validators.required],
        vehicule_mark: ["", Validators.required],
        vehicule_model: ["", Validators.required],
        vehicule_energy: ["", Validators.required],
        vehicule_NbrPlace: ["", Validators.required],
        vehicule_NbrPorte: ["", Validators.required],
        vehicule_Kilometrage: ["", Validators.required],
        vehicule_VitesseBox: ["", Validators.required],
      }),
      Info_Assurance: this.fb.group({
        vehicule_date_release: ["", Validators.required],
        vehicule_date_next_controle: ["", Validators.required],
        vehicule_immatriculation: ["", Validators.required],
        inssurance_number: ["", Validators.required],
        inssurance_date_start: ["", Validators.required],
        inssurance_date_end: ["", Validators.required],
        name_person: ["", Validators.required],
        surname_person: ["", Validators.required],
        tel: ["", Validators.required],
      }),
      Valeur_Voiture: this.fb.group({
        vehicule_value: ["", Validators.required],
      }),
      Disponibilité: this.fb.group({
        vehicule_address: ["", Validators.required],
      }),

      Presentation_Locataire: this.fb.group({
        vehicule_description: ["", Validators.required],
      }),
      Calendrier: this.fb.group({
        vehicule_description: ["", Validators.required],
      }),
      Location: this.fb.group({
        vehicule_description: ["", Validators.required],
      }),
    });

    if (this.data.customer) {
      this.form.patchValue(this.data.customer);
    }
    this.chargeMark();
    const storage = localStorage.getItem("facebook_auth");
    const storageAuth = localStorage.getItem("user");
    if (storageAuth) {
      this.userIn = JSON.parse(storageAuth);
    }
    if (storage) {
      this.userIn = JSON.parse(storage);
    }
    const email = this.userIn.email;
    console.log(this.userIn);
    this.loginService.getinfoUser(email).subscribe((data) => {
      this.item = data;
      console.log(data);
    });
        this.getCar();
  }
  public fileChange(files: any) {
    if (files.length) {
      this.form.controls.image.patchValue(files[0].content);
    } else {
      this.form.controls.image.patchValue(null);
    }
  }
  public savefirst() {
    if (this.firstFormGroup.valid) {
      this.data = this.firstFormGroup.value;
      this.tab.push(this.firstFormGroup.value);
      console.log(this.tab);
    }
  }
  public savesecond() {
    if (this.secondFormGroup.valid) {
      const maDaterelease = this.datePipe.transform(
        this.secondFormGroup.value.vehicule_date_release,
        "YYYY-MM-dd"
      );
      const maDatenextc = this.datePipe.transform(
        this.secondFormGroup.value.vehicule_date_next_controle,
        "YYYY-MM-dd"
      );
      const maDateAsustar = this.datePipe.transform(
        this.secondFormGroup.value.inssurance_date_start,
        "YYYY-MM-dd"
      );
      const maDateAsurend = this.datePipe.transform(
        this.secondFormGroup.value.inssurance_date_end,
        "YYYY-MM-dd"
      );
      this.secondFormGroup
        .get("vehicule_date_release")
        ?.setValue(maDaterelease);
      this.secondFormGroup
        .get("vehicule_date_next_controle")
        ?.setValue(maDatenextc);
      this.secondFormGroup
        .get("inssurance_date_start")
        ?.setValue(maDateAsustar);
      this.secondFormGroup.get("inssurance_date_end")?.setValue(maDateAsurend);
      this.data = this.secondFormGroup.value;
      this.tab.push(this.secondFormGroup.value);
      console.log(this.tab);
    }
  }
  public resetsecond() {
    this.tab.pop();
    console.log(this.tab);
  }
  public savetrois() {
    if (this.troisFormGroup.valid) {
      this.data = this.troisFormGroup.value;
      this.tab.push(this.troisFormGroup.value);
      console.log(this.tab);
    }
  }
  public resetreois() {
    this.tab.pop();
    console.log(this.tab);
  }
  public savektre() {
    if (this.ktriemFormGroup.valid) {
      this.data = this.ktriemFormGroup.value;
      this.tab.push(this.ktriemFormGroup.value);
      console.log(this.tab);
    }
  }
  public resetktre() {
    this.tab.pop();
    console.log(this.tab);
  }
  public savetcinkiem() {
    if (this.cinkiemFormGroup.valid) {
      this.datacaracveh = this.cinkiemFormGroup.value;
      this.tab.push(this.cinkiemFormGroup.value);
      console.log(this.tab);
    }
  }
  public resetcinkiem() {
    this.tab.pop();
    console.log(this.tab);
  }
  public savetsixiem() {
    if (this.sixiemFormGroup.valid) {
      this.dataimg = this.sixiemFormGroup.value;
      this.tab.push(this.sixiemFormGroup.value);
      console.log(this.tab);
    }
  }
  public resetsixiem() {
    this.tab.pop();
    console.log(this.tab);
  }
  public savetsetiem() {
    if (this.setiemFormGroup.valid) {
      const maDateAsurend = this.datePipe.transform(
        this.setiemFormGroup.value.vehicule_dispo,
        "YYYY-MM-dd"
      );
      this.setiemFormGroup.get("vehicule_dispo")?.setValue(maDateAsurend);
      this.data = this.setiemFormGroup.value;
      this.tab.push(this.setiemFormGroup.value);
      console.log(this.tab);
    }
  }
  public resetsetiem() {
    this.tab.pop();
    console.log(this.tab);
  }
  public savehuitiem() {
    if (this.huitiemFormGroup.valid) {
      this.data = this.huitiemFormGroup.value;
      this.tab.push(this.huitiemFormGroup.value);
      console.log(this.tab);
    }
  }
  public resethuitiem() {
    this.tab.pop();
    console.log(this.tab);
  }
  public resetlast() {
    this.tab.pop();
    console.log(this.tab);
  }

  public onSubmit() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }
  
  public getCar() {
    this.carservice.getallvehicle().subscribe((data: any) => {
console.log('data',data)
    });
  }

  public save() {
    const storage = localStorage.getItem("facebook_auth");
    const storageAuth = localStorage.getItem("user");
    if (storageAuth) {
      this.userIn = JSON.parse(storageAuth);
    }
    if (storage) {
      this.userIn = JSON.parse(storage);
    }
    console.log(this.tab);
    this.carservice.addcar(this.tab, this.userIn).subscribe((data: any) => {
      this.dataIdveh = data.user.id;

      this.sixiemFormGroup.get("id_veh").setValue(data.user.id);
      this.dataimg = this.sixiemFormGroup.value;
      this.carservice.saveimage(this.dataimg).subscribe((data) => {
        console.log(data);
      });
      this.cinkiemFormGroup.get("id_veh").setValue(data.user.id);
      this.datacaracveh = this.cinkiemFormGroup.value;
      this.carservice
        .storecaracteristique(this.datacaracveh)
        .subscribe((data) => {
          console.log(data);
        });
       
      //this.router.navigateByUrl("/compte-utilisateur/mes-vehicules/ajouter-vehicule");
    });

    this.onClick()
      this.dialogRef.close();
  }

  public compareFunction(o1: any, o2: any) {
    return o1.name == o2.name && o1.code == o2.code;
  }

  public chargeModel() {
    this.carservice.showModel(this.selected).subscribe((data) => {
      this.allmodel = data;
      console.log(this.allmodel);
    });
  }
  public chargeMark() {
    this.carservice.showMark().subscribe((data) => {
      this.allmark = data;
      console.log(this.allmark);
    });
  }
  public selectionMark(id: any) {
    console.log("selection", id);
    this.carservice.showModel(id).subscribe((data) => {
      this.allmodel = data;
      console.log(this.allmodel);
    });
  }
  public selectionModel(id: any) {
    console.log("selection", id);
    this.carservice.showType(id).subscribe((data) => {
      this.alltyp = data;
      console.log(this.alltyp);
    });
  }
  public selectiontyp(id: any) {
    console.log("selection", id);
    this.carservice.showEnergie(id).subscribe((data) => {
      this.allenerg = data;
      console.log(this.allenerg);
    });
  }
  public selectenergi(id: any) {
    console.log("selection", id);
    this.carservice.showBoitVit(id).subscribe((data) => {
      this.allbtvt = data;
      console.log(this.allbtvt);
    });
  }
  public selectbtv(id: any) {
    console.log("selection", id);
    this.carservice.showNbplace(id).subscribe((data) => {
      this.allnbrpl = data;
      console.log(this.allbtvt);
    });
  }
  public selectnbrpl(id: any) {
    console.log("selection", id);
    this.carservice.showNbporte(id).subscribe((data) => {
      this.allnbrport = data;
      console.log(this.allnbrport);
    });
  }
  get f() {
    return this.sixiemFormGroup.controls;
  }
  onFileChange(event: any) {
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();

        reader.onload = (event: any) => {
          // console.log(event.target.result);
          this.images.push(event.target.result);

          // this.sixiemFormGroup.patchValue({
          //   fileSource: this.images,
          // });
          this.sixiemFormGroup.get("fileSource")?.setValue(this.images);
        };

        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }
  public addressChange(address: any) {
    this.address = address.formatted_address;

    this.geometry = address.geometry;
  }
  addItem(newItem: any) {
    this.ktriemFormGroup.get("vehicule_address")?.setValue(newItem.adress);
    this.ktriemFormGroup.get("lat")?.setValue(newItem.latitude);
    this.ktriemFormGroup.get("long")?.setValue(newItem.lonitude);
    console.log(newItem.adress);
    console.log(newItem.latitude);
    console.log(newItem.lonitude);
  }


  onClick(): void {
  this.router
    .navigateByUrl("/compte-utilisateur/mes-vehicules/ajouter-vehicule", {
      skipLocationChange: true,
    })
    .then(() => {
      window.location.reload;
    });
             

  }
}