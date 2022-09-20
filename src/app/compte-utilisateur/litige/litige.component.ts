import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TemplateSearchCar } from 'src/app/app.models';
import { LitigeService } from 'src/app/services/litige.service';
import { SinistreService } from 'src/app/services/sinistre.service';
import { VehiculeserviceService } from 'src/app/services/vehiculeservice.service';
import { CarIn } from '../mes-vehicules/cars/cars-dialog/car-in';

@Component({
  selector: "app-litige",
  templateUrl: "./litige.component.html",
  styleUrls: ["./litige.component.scss"],
})
export class LitigeComponent implements OnInit {
  public Formcar!: UntypedFormGroup;
  images: string[] = [];
  public code: any;
  public item: any;
  public itemCarac: any;
  public data: any;
  public userIn: any;
  public selected2: any;

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
  public tab: Array<CarIn> = [];
  public tabimg: Array<any> = [];
  public Car: Array<any> = [];
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
    private activetedRoute: ActivatedRoute,
    public litigeservice: LitigeService,
    private toastr: ToastrService
  ) {
    this.minDateStart = new Date();
    this.minDateEnd = new Date();
  }

  ngOnInit(): void {
    this.code = this.activetedRoute.snapshot.queryParamMap.get("code");
    this.Formcar = this.formBuilder.group({
      validcondition: "",
      litige_description: "",

      vehicule: "",
    });
    console.log(this.code);
    let obj = {
      code: this.code,
    };
    // this.carservice.findCar(obj).subscribe((data: any) => {
    //   this.item = data.val;
    //   this.itemCarac = data.val[1];

    //   this.Formcar.get("id_prop")?.setValue(this.item.prop_id);
    //   // console.log(this.selected2);
    //   console.log(this.item);
    // });
    this.getCar();
  }
  public getCar() {
    const storage = localStorage.getItem("facebook_auth");
    const storageAuth = localStorage.getItem("user");
    if (storageAuth) {
      this.userIn = JSON.parse(storageAuth);
    }
    if (storage) {
      this.userIn = JSON.parse(storage);
    }

    this.carservice.getvehicleuser(this.userIn.id).subscribe((data: any) => {
      console.log(data);
      this.Car = data;
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

  public onInfoFormCoordonneesSubmit(): void {
    this.code = this.activetedRoute.snapshot.queryParamMap.get("code");
    console.log(this.code);

    if (this.Formcar.valid) {
      this.data = this.Formcar.value;

      console.log(this.data);
      // this.carservice.updateCar(obj).subscribe((data: any) => {
      //   console.log(data);
      // });
      this.litigeservice.addlitige(this.data).subscribe((data: any) => {
        console.log(data);

        this.toastr.success("Litige declaré ");
        //this.router.navigateByUrl("/compte-utilisateur/mes-vehicules/ajouter-vehicule");
      });
    }

    // this.router.navigateByUrl(
    //   "/compte-utilisateur/mes-vehicules/ajouter-vehicule"
    // );
  }
  addItemAcc(newItem: any) {
    this.Formcar.get("lieu_acc")?.setValue(newItem.adress);
    console.log(newItem.adress);
  }
  addItemAct(newItem: any) {
    this.Formcar.get("lieu_act")?.setValue(newItem.adress);
    console.log(newItem.adress);
  }
}
