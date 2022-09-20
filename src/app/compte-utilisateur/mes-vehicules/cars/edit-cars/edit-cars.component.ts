import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginserviceService } from 'src/app/services/loginservice.service';
import { VehiculeserviceService } from 'src/app/services/vehiculeservice.service';
import { CarIn } from '../cars-dialog/car-in';

@Component({
  selector: "app-edit-cars",
  templateUrl: "./edit-cars.component.html",
  styleUrls: ["./edit-cars.component.scss"],
})
export class EditCarsComponent implements OnInit {
  public Formcar!: UntypedFormGroup;
  public allmodel: any;
  public allmark: any;
  public alltyp: any;
  public allenerg: any;
  public allbtvt: any;
  public allnbrpl: any;
  public allnbrport: any;
  public selected: any;
  public id_mark: any;
  public images: any;
  public code: any;
  public item: any;
  public itemCarac: any;
  public data: any;
  public userIn: any;
  public selected2: any;
  public tab: Array<CarIn> = [];
  public tabimg: Array<any> = [];
  status = [
    { value: "disponible", viewValue: "disponible" },
    { value: "indisponible", viewValue: "indisponible" },
  ];
  constructor(
    public formBuilder: UntypedFormBuilder,
    private _formBuilder: FormBuilder,
    public snackBar: MatSnackBar,
    private datePipe: DatePipe,
    public carservice: VehiculeserviceService,
    public router: Router,
    private activetedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.chargeMark();
    this.code = this.activetedRoute.snapshot.queryParamMap.get("code");
    console.log(this.code);
    let obj = {
      code: this.code,
    };
    this.carservice.findCar(obj).subscribe((data: any) => {
      this.item = data.val;
      this.itemCarac = data.val[1];
      this.selected2 = this.item?.mark_lib;
      // console.log(this.selected2);
      console.log(this.item);
    });
    this.Formcar = this.formBuilder.group({
      vehicule_mark: [this.item?.mark_lib],
      vehicule_model: "",
      vehicule_type: "",
      vehicule_energy: "",
      vehicule_VitesseBox: "",
      vehicule_NbrPlace: "",
      vehicule_NbrPorte: "",
      status: "",
      vehicule_Kilometrage: "",
      image: null,
      //organization: null,
      vehicule_date_next_controle: null,
      // twitter: null,
      // linkedin: null,
      // instagram: null,
      inssurance_date_start: null,
      inssurance_date_end: "",
      vehicule_immatriculation: "",
      inssurance_number: "",
      vehicule_value: "",
      vehicule_address: "",
      vehicule_dispo: "",
      prixkmjr: "",
      file: "",
      vehicule_description: "",
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
    return this.Formcar.controls;
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
          this.Formcar.get("fileSource")?.setValue(this.images);
        };

        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }
  public getCar() {
    this.carservice.getallvehicle().subscribe((data: any) => {});
  }

  public onInfoFormCoordonneesSubmit(): void {
    this.code = this.activetedRoute.snapshot.queryParamMap.get("code");
    console.log(this.code);

    const maDate_inssurance_date_start = this.datePipe.transform(
      this.Formcar.value.inssurance_date_start,
      "YYYY-MM-dd"
    );
    const maDate_inssurance_date_end = this.datePipe.transform(
      this.Formcar.value.inssurance_date_end,
      "YYYY-MM-dd"
    );
    const maDate_vehicule_date_next_control = this.datePipe.transform(
      this.Formcar.value.inssurance_date_start,
      "YYYY-MM-dd"
    );
    const maDate_vehicule_dispo = this.datePipe.transform(
      this.Formcar.value.vehicule_dispo,
      "YYYY-MM-dd"
    );

    this.data = this.Formcar.value;
    if (!this.data.vehicule_Kilometrage) {
      this.Formcar.get("vehicule_Kilometrage")?.setValue(
        this.item?.vehicle_mileage
      );
    }
    if (!this.data.vehicule_address) {
      this.Formcar.get("vehicule_address")?.setValue(this.item?.vehicle_adress);
    }
    if (!this.data.inssurance_date_end) {
      this.Formcar.get("inssurance_date_end")?.setValue(
        this.item?.vehicle_date_end_insurance
      );
    }
    if (!this.data.vehicule_date_next_controle) {
      this.Formcar.get("vehicule_date_next_controle")?.setValue(
        this.item?.vehicle_date_next_control
      );
    }
    if (!this.data.inssurance_date_start) {
      this.Formcar.get("inssurance_date_start")?.setValue(
        this.item?.vehicle_date_start_insurance
      );
    }
    if (!this.data.vehicule_description) {
      this.Formcar.get("vehicule_description")?.setValue(
        this.item?.vehicle_description
      );
    }
    if (!this.data.inssurance_number) {
      this.Formcar.get("inssurance_number")?.setValue(
        this.item?.vehicle_number_insurance
      );
    }
    if (!this.data.vehicule_immatriculation) {
      this.Formcar.get("vehicule_immatriculation")?.setValue(
        this.item?.vehicle_registration
      );
    }
    if (!this.data.prixkmjr) {
      this.Formcar.get("prixkmjr")?.setValue(this.item?.vehicle_price_location);
    }
    if (!this.data.vehicule_dispo) {
      this.Formcar.get("vehicule_dispo")?.setValue(this.item?.vehicle_dispo);
    }
    if (!this.data.vehicule_value) {
      this.Formcar.get("vehicule_value")?.setValue(this.item?.vehicle_value);
    }
    if (!this.data.status) {
      this.Formcar.get("status")?.setValue(this.item?.status);
    }
    if (!this.data.vehicule_mark) {
      this.Formcar.get("vehicule_mark")?.setValue(this.item?.mark_id);
    }
    if (!this.data.vehicule_model) {
      this.Formcar.get("vehicule_model")?.setValue(this.item?.model_id);
    }
    if (!this.data.vehicule_type) {
      this.Formcar.get("vehicule_type")?.setValue(this.item?.typ_id);
    }
    if (!this.data.vehicule_energy) {
      this.Formcar.get("vehicule_energy")?.setValue(this.item?.energy_id);
    }
    if (!this.data.vehicule_VitesseBox) {
      this.Formcar.get("vehicule_VitesseBox")?.setValue(this.item?.gearboxe_id);
    }
    if (!this.data.vehicule_NbrPlace) {
      this.Formcar.get("vehicule_NbrPlace")?.setValue(
        this.item?.number_place_id
      );
    }
    if (!this.data.vehicule_NbrPorte) {
      this.Formcar.get("vehicule_NbrPorte")?.setValue(this.item?.nbdoor_id);
    }

    if (this.Formcar.valid) {
      this.Formcar.get("inssurance_date_start")?.setValue(
        maDate_inssurance_date_start
      );
      this.Formcar.get("inssurance_date_end")?.setValue(
        maDate_inssurance_date_end
      );
      this.Formcar.get("inssurance_date_start")?.setValue(
        maDate_vehicule_date_next_control
      );
      this.Formcar.get("vehicule_dispo")?.setValue(maDate_vehicule_dispo);

      this.data = this.Formcar.value;
      let obj = {
        code: this.code,
        data: this.data,
      };
      console.log(this.data);
      this.carservice.updateCar(obj).subscribe((data: any) => {
        console.log(data);
      });
    }

    this.router.navigateByUrl(
      "/compte-utilisateur/mes-vehicules/ajouter-vehicule"
    );
    this.getCar();
  }
}
