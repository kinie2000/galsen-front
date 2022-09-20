import { ThisReceiver } from "@angular/compiler";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { AppService } from "src/app/app.service";
import { CarsService } from "src/app/services/cars.service";
import { UserServiceService } from "src/app/services/user-service.service";
import { VehiculeserviceService } from "src/app/services/vehiculeservice.service";
import { LoginserviceService } from "src/app/services/loginservice.service";
import { Router } from "@angular/router";
import { TemplateSearchCar } from "src/app/app.models";
import { DataSearchService } from "src/app/services/data-search.service";
import { DatePipe } from "@angular/common";
import { Options } from "ngx-google-places-autocomplete/objects/options/options";
import { ConstatService } from "src/app/services/constat.service";
import { UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";

@Component({
  selector: "app-constat",
  templateUrl: "./constat.component.html",
  styleUrls: ["./constat.component.scss"],
})
export class ConstatComponent implements OnInit {
  // displayedColumns: string[] = ['name', 'surname', 'email', 'tel', 'adresse','cni', 'city','country','status', 'actions'];
  address: string;
  geometry: object;
  options: Options = new Options({
    componentRestrictions: {
      country: "SN",
    },
  });
  public infoFormcoordonnees!: UntypedFormGroup;
  public minDateStart: Date;
  public minDateEnd: Date;
  public currentDateStart?: string;
  public currentDateEnd?: string;
  public showChoice: boolean;
  public showChoiceEnd: boolean;
  public errorAdress: boolean;
  public valueDatePickerEnd?: Date;
  public userIn: any;
  dateStart: any;
  dateEnd: any;
  todayWithPipe: any;
  periodStart?: string;
  periodEnd?: string;
  currentDateFormat?: string;
  templateSearchCar: TemplateSearchCar;
  index: number;
  displayedColumns: string[] = [
    "id",
    // "marque",
    // "model",
    // "prix",
    "date",
    "status",
    "actions",
  ];
  user: any = [];
  customerList: any;
  resultcat: any;
  idcar: number;
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  public stores = [
    { id: 1, name: "Store 1" },
    { id: 2, name: "Store 2" },
  ];
  constructor(
    public appService: AppService,
    public appServices: UserServiceService,
    public snackBar: MatSnackBar,
    public carservice: VehiculeserviceService,
    public loginService: LoginserviceService,
    public router: Router,
    public constatService: ConstatService,
    public formBuilder: UntypedFormBuilder
  ) {}
  ngOnInit() {
    this.infoFormcoordonnees = this.formBuilder.group({
      statut_constat: "",
      id: "",
    });
    this.getCar();
  }
  public initDataSource(data: any) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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
    this.constatService
      .showConstatPro(this.userIn.id)
      .subscribe((data: any) => {
        this.resultcat = data;
        this.idcar = data[0].id;
        this.dataSource = new MatTableDataSource<any>(this.resultcat);
        console.log(data);
      });
  }
  public clear(id: number) {
    this.infoFormcoordonnees.get("statut_constat")?.setValue("refusé");
    this.infoFormcoordonnees.get("id")?.setValue(this.idcar);
    let valeur = this.infoFormcoordonnees.value;
    this.constatService.updateConstat(valeur).subscribe((data) => {
      console.log(data);
    });
    this.getCar();
  }
  public visibility(id: number) {
    this.router.navigate(["compte-utilisateur/voir-constat"], {
      queryParams: { code: id },
    });
  }
  public done(id: number) {
    this.infoFormcoordonnees.get("statut_constat")?.setValue("validé");
    this.infoFormcoordonnees.get("id")?.setValue(this.idcar);
    let valeur = this.infoFormcoordonnees.value;
    this.constatService.updateConstat(valeur).subscribe((data) => {
      console.log(data);
    });
    this.getCar();
  }
  public addressChange(address: any) {
    this.address = address.formatted_address;
    this.geometry = address.geometry;
  }
  public newconstat() {
    this.router.navigate(["compte-utilisateur/ajoute-constat"]);
  }
}
