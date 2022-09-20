import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { TemplateSearchCar } from "src/app/app.models";
import { DataSearchService } from "./../../services/data-search.service";
import { DatePipe } from "@angular/common";
import { Options } from "ngx-google-places-autocomplete/objects/options/options";
import { Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-search-adresse-accident",
  templateUrl: "./search-adresse-accident.component.html",
  styleUrls: ["./search-adresse-accident.component.scss"],
})
export class SearchAdresseAccidentComponent implements OnInit {
  //Local Variable Defined
  @Output() newItemEvent = new EventEmitter<any>();
  address: string;
  geometry: object;

  options: Options = new Options({
    componentRestrictions: {
      country: "SN",
    },
  });

  public minDateStart: Date;
  public minDateEnd: Date;
  public currentDateStart?: string;
  public currentDateEnd?: string;
  public showChoice: boolean;
  public showChoiceEnd: boolean;
  public errorAdress: boolean;
  public valueDatePickerEnd?: Date;

  dateStart: any;
  dateEnd: any;
  todayWithPipe: any;
  periodStart?: string;
  periodEnd?: string;
  currentDateFormat?: string;
  templateSearchCar: TemplateSearchCar;

  index: number;

  constructor(
    private datePipe: DatePipe,
    private dataSearchService: DataSearchService,
    private router: Router
  ) {
    this.minDateStart = new Date();
    this.minDateEnd = new Date();
    this.showChoice = false;
    this.showChoiceEnd = false;
    this.errorAdress = false;

    //Permet l'affichage de l'element de choix
    this.index = 0;
  }

  ngOnInit(): void {
    this.todayWithPipe = this.datePipe.transform(
      this.minDateStart,
      "dd/MM/yyyy"
    );
  }

  public addressChange(address: any) {
    this.address = address.formatted_address;
    let obj = {
      adress: this.address,
      latitude: address.geometry.location.lat(),
      lonitude: address.geometry.location.lng(),
    };

    this.geometry = address.geometry.location;
    console.log(obj);
    this.newItemEvent.emit(obj);
  }

  public clickIconCalendar() {
    this.showChoice = false;

    this.showChoiceEnd = false;

    this.index = 0;
  }

  public dateStartChange(event: any) {
    this.dateStart = event.target.value;

    this.minDateEnd = event.target.value;

    this.currentDateStart = this.datePipe.transform(
      event.target.value,
      "MM/dd/yyyy"
    )!;

    this.currentDateFormat = this.datePipe.transform(
      event.target.value,
      "dd/MM/yyyy"
    )!;

    //On vérifier si la datePickerEnd est vide ou pas
    if (typeof this.valueDatePickerEnd != "undefined") {
      this.valueDatePickerEnd = undefined;
    }

    //On vérifier si la datePickerStart est egalé à la date d'aujourd'hui
    if (this.currentDateFormat === this.todayWithPipe) {
      var currentHours = new Date().getHours();

      var currentMinutes = new Date().getMinutes();

      if (currentHours >= 11 || currentMinutes == 30) {
        this.minDateEnd.setDate(event.target.value.getDate() + 1);

        this.showChoice = false;
      } else {
        this.showChoice = true;
      }
    } else {
      this.showChoice = true;
    }
  }

  public dateEndChange(event: any) {
    this.dateEnd = event.target.value;

    this.currentDateEnd = this.datePipe.transform(
      event.target.value,
      "MM/dd/yyyy"
    )!;

    var currentDate = this.datePipe.transform(event.target.value, "dd/MM/yyyy");

    if (currentDate != this.currentDateFormat) {
      this.showChoiceEnd = true;
    }
  }

  public checkPeriodStart(element: string) {
    this.periodStart = element;
  }

  public checkPeriodEnd(element: string) {
    this.periodEnd = element;
  }

  public search() {
    // console.log(this.address, this.dateStart, this.dateEnd, this.periodStart, this.periodEnd);

    if (typeof this.address == "undefined") {
      this.errorAdress = true;
    } else {
      this.errorAdress = false;

      this.templateSearchCar = {
        address: this.address,
        geometry: this.geometry,
        dateStart: this.dateStart,
        dateEnd: this.dateEnd,
        periodStart: this.periodStart!,
        periodEnd: this.periodEnd!,
      };

      this.router.navigate(["search-car"]);
    }
  }

  clickedOut() {
    // console.log("j'ai clique en dehors du header", this.showChoice);

    if (this.showChoice || this.showChoiceEnd) {
      this.index++;

      if (this.index >= 2) {
        this.showChoice = false;

        this.showChoiceEnd = false;

        this.index = 0;
      }
    }
  }

  ngOnDestroy(): void {
    this.dataSearchService.templateSearchCar = this.templateSearchCar;

    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
  }
}
