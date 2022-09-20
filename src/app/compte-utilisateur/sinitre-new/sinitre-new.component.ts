import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginserviceService } from 'src/app/services/loginservice.service';
import { VehiculeserviceService } from 'src/app/services/vehiculeservice.service';
import { CarIn } from '../mes-vehicules/cars/cars-dialog/car-in';
import { TemplateSearchCar } from 'src/app/app.models';
import { SinistreService } from 'src/app/services/sinistre.service';
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-sinitre-new",
  templateUrl: "./sinitre-new.component.html",
  styleUrls: ["./sinitre-new.component.scss"],
})
export class SinitreNewComponent implements OnInit {
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
    public sinistreservice: SinistreService,
    private toastr: ToastrService
  ) {
    this.minDateStart = new Date();
    this.minDateEnd = new Date();
  }

  ngOnInit(): void {
    this.code = this.activetedRoute.snapshot.queryParamMap.get("code");
    this.Formcar = this.formBuilder.group({
      image: null,
      file: "",
      sinister_description: "",
      date_acc: "",
      lieu_acc: "",
      lieu_act: "",
      degat: "",
      fileSource: "",
      id_prop: "",
    });
    console.log(this.code);
    let obj = {
      code: this.code,
    };
    this.carservice.findCar(obj).subscribe((data: any) => {
      this.item = data.val;
      this.itemCarac = data.val[1];

      this.Formcar.get("id_prop")?.setValue(this.item.prop_id);
      // console.log(this.selected2);
      console.log(this.item);
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

    const maDate_date_acc = this.datePipe.transform(
      this.Formcar.value.date_acc,
      "YYYY-MM-dd"
    );

    if (this.Formcar.valid) {
      this.Formcar.get("date_acc")?.setValue(maDate_date_acc);

      this.data = this.Formcar.value;
      let obj = {
        code: this.code,
        data: this.data,
      };
      console.log(obj);
      // this.carservice.updateCar(obj).subscribe((data: any) => {
      //   console.log(data);
      // });
      this.sinistreservice.addsinistre(obj).subscribe((data: any) => {
        //  this.sixiemFormGroup.get("id_veh").setValue(data.user.id);
        //  this.dataimg = this.sixiemFormGroup.value;
        console.log(data);
        let obj = {
          id_veh: this.code,
          fileSource: this.Formcar.get("fileSource")?.value,
        };
        this.sinistreservice.saveimage(obj).subscribe((data) => {
          console.log(data);
        });
        this.toastr.success("Sinistre declaré ");
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
