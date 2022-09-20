import { Component, OnInit } from "@angular/core";
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { emailValidator } from "src/app/theme/utils/app-validators";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AppService } from "src/app/app.service";
import { LoginserviceService } from "src/app/services/loginservice.service";
import { DatePipe } from "@angular/common";
import { Router } from "@angular/router";
import { ConstatService } from "src/app/services/constat.service";
import { VehiculeserviceService } from "src/app/services/vehiculeservice.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-addconstat",
  templateUrl: "./addconstat.component.html",
  styleUrls: ["./addconstat.component.scss"],
})
export class AddconstatComponent implements OnInit {
  public infoFormcoordonnees!: UntypedFormGroup;
  public countries: any[] = [];
  public data: any;
  public userIn: any;
  public Car: any;

  public item: any;
  civilite = [
    { value: "Neuf", viewValue: "Neuf" },
    { value: "Bon", viewValue: "Bon" },
    { value: "Mauvais", viewValue: "Mauvais" },
  ];
  TBV = [
    { value: "Neuf", viewValue: "Neuf" },
    { value: "Bon", viewValue: "Bon" },
    { value: "Mauvais", viewValue: "Mauvais" },
  ];
  FSV = [
    { value: "Neuf", viewValue: "Neuf" },
    { value: "Bon", viewValue: "Bon" },
    { value: "Mauvais", viewValue: "Mauvais" },
  ];
  JNV = [
    { value: "Neuf", viewValue: "Neuf" },
    { value: "Bon", viewValue: "Bon" },
    { value: "Mauvais", viewValue: "Mauvais" },
  ];
  Rtv = [
    { value: "Neuf", viewValue: "Neuf" },
    { value: "Bon", viewValue: "Bon" },
    { value: "Mauvais", viewValue: "Mauvais" },
  ];
  cptK = [
    { value: "Neuf", viewValue: "Neuf" },
    { value: "Bon", viewValue: "Bon" },
    { value: "Mauvais", viewValue: "Mauvais" },
  ];
  AspV = [
    { value: "Neuf", viewValue: "Neuf" },
    { value: "Bon", viewValue: "Bon" },
    { value: "Mauvais", viewValue: "Mauvais" },
  ];
  FpV = [
    { value: "Neuf", viewValue: "Neuf" },
    { value: "Bon", viewValue: "Bon" },
    { value: "Mauvais", viewValue: "Mauvais" },
  ];
  Etv = [
    { value: "Neuf", viewValue: "Neuf" },
    { value: "Bon", viewValue: "Bon" },
    { value: "Mauvais", viewValue: "Mauvais" },
  ];
  EtpV = [
    { value: "Neuf", viewValue: "Neuf" },
    { value: "Bon", viewValue: "Bon" },
    { value: "Mauvais", viewValue: "Mauvais" },
  ];
  Csv = [
    { value: "Neuf", viewValue: "Neuf" },
    { value: "Bon", viewValue: "Bon" },
    { value: "Mauvais", viewValue: "Mauvais" },
  ];
  Sv = [
    { value: "Neuf", viewValue: "Neuf" },
    { value: "Bon", viewValue: "Bon" },
    { value: "Mauvais", viewValue: "Mauvais" },
  ];
  epiv = [
    { value: "Neuf", viewValue: "Neuf" },
    { value: "Bon", viewValue: "Bon" },
    { value: "Mauvais", viewValue: "Mauvais" },
  ];
  pdlv = [
    { value: "Neuf", viewValue: "Neuf" },
    { value: "Bon", viewValue: "Bon" },
    { value: "Mauvais", viewValue: "Mauvais" },
  ];
  Ercv = [
    { value: "Neuf", viewValue: "Neuf" },
    { value: "Bon", viewValue: "Bon" },
    { value: "Mauvais", viewValue: "Mauvais" },
  ];
  Sppv = [
    { value: "Neuf", viewValue: "Neuf" },
    { value: "Bon", viewValue: "Bon" },
    { value: "Mauvais", viewValue: "Mauvais" },
  ];
  ppav = [
    { value: "Neuf", viewValue: "Neuf" },
    { value: "Bon", viewValue: "Bon" },
    { value: "Mauvais", viewValue: "Mauvais" },
  ];
  Ersv = [
    { value: "Neuf", viewValue: "Neuf" },
    { value: "Bon", viewValue: "Bon" },
    { value: "Mauvais", viewValue: "Mauvais" },
  ];
  AexV = [
    { value: "Neuf", viewValue: "Neuf" },
    { value: "Bon", viewValue: "Bon" },
    { value: "Mauvais", viewValue: "Mauvais" },
  ];

  constructor(
    public formBuilder: UntypedFormBuilder,
    public appService: AppService,
    public snackBar: MatSnackBar,
    public loginService: LoginserviceService,
    public constatService: ConstatService,
    private datePipe: DatePipe,
    public router: Router,
    public carservice: VehiculeserviceService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.countries = this.appService.getCountries();
    this.infoFormcoordonnees = this.formBuilder.group({
      Tableau_de_bord: "",
      Frein_de_secours: "",
      Jauges_de_niveau: "",
      Retroviseurs: "",
      Compteur_kilométrique: "",
      Aspect_des_portieres: "",
      Fonctionnement_des_portieres: "",
      Etat_des_vitres: "",
      Etat_des_tapis: "",
      Ceinture_de_securite: "",
      Sieges: "",
      Pedales: "",
      Etat_revetement_du_coffre: "",
      Paire_de_pneus_avant: "",
      Paire_de_pneus_arriere: "",
      Etat_de_la_roue_de_secours: "",
      Aspect_extérieur: "",
      CMTableau_de_bord: "",
      CMFrein_de_secours: "",
      CMJauges_de_niveau: "",
      CMRetroviseurs: "",
      CMCompteur_kilométrique: "",
      CMAspect_des_portieres: "",
      CMFonctionnement_des_portieres: "",
      CMEtat_des_vitres: "",
      CMEtat_des_tapis: "",
      CMCeinture_de_securite: "",
      CMSieges: "",
      CMEtat_du_plafond_interieur: "",
      CMPedales: "",
      CMEtat_revetement_du_coffre: "",
      CMPaire_de_pneus_avant: "",
      CMEtat_de_la_roue_de_secours: "",
      CMAspect_extérieur: "",
      CMPaire_de_pneus_arriere: "",
      autre_constat: "",
      Etat_du_plafond_intérieur: "",
      vehicle_id: ["", Validators.required],
    });

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

  public onInfoFormCoordonneesSubmit(): void {
    this.data = this.infoFormcoordonnees.value;
    if (!this.data.Tableau_de_bord) {
      this.infoFormcoordonnees.get("Tableau_de_bord")?.setValue("Neuf");
    }
    if (!this.data.Frein_de_secours) {
      this.infoFormcoordonnees.get("Frein_de_secours")?.setValue("Neuf");
    }
    if (!this.data.Jauges_de_niveau) {
      this.infoFormcoordonnees.get("Jauges_de_niveau")?.setValue("Neuf");
    }
    if (!this.data.Retroviseurs) {
      this.infoFormcoordonnees.get("Retroviseurs")?.setValue("Neuf");
    }
    if (!this.data.Compteur_kilométrique) {
      this.infoFormcoordonnees.get("Compteur_kilométrique")?.setValue("Neuf");
    }
    if (!this.data.Aspect_des_portieres) {
      this.infoFormcoordonnees.get("Aspect_des_portieres")?.setValue("Neuf");
    }
    if (!this.data.Fonctionnement_des_portieres) {
      this.infoFormcoordonnees
        .get("Fonctionnement_des_portieres")
        ?.setValue("Neuf");
    }
    if (!this.data.Etat_des_vitres) {
      this.infoFormcoordonnees.get("Etat_des_vitres")?.setValue("Neuf");
    }
    if (!this.data.Etat_des_tapis) {
      this.infoFormcoordonnees.get("Etat_des_tapis")?.setValue("Neuf");
    }
    if (!this.data.Ceinture_de_securite) {
      this.infoFormcoordonnees.get("Ceinture_de_securite")?.setValue("Neuf");
    }
    if (!this.data.Sieges) {
      this.infoFormcoordonnees.get("Sieges")?.setValue("Neuf");
    }
    if (!this.data.Pedales) {
      this.infoFormcoordonnees.get("Pedales")?.setValue("Neuf");
    }
    if (!this.data.Etat_revetement_du_coffre) {
      this.infoFormcoordonnees
        .get("Etat_revetement_du_coffre")
        ?.setValue("Neuf");
    }
    if (!this.data.Paire_de_pneus_avant) {
      this.infoFormcoordonnees.get("Paire_de_pneus_avant")?.setValue("Neuf");
    }
    if (!this.data.Paire_de_pneus_arriere) {
      this.infoFormcoordonnees.get("Paire_de_pneus_arriere")?.setValue("Neuf");
    }
    if (!this.data.Etat_de_la_roue_de_secours) {
      this.infoFormcoordonnees
        .get("Etat_de_la_roue_de_secours")
        ?.setValue("Neuf");
    }
    if (!this.data.Aspect_extérieur) {
      this.infoFormcoordonnees.get("Aspect_extérieur")?.setValue("Neuf");
    }
    if (!this.data.Etat_du_plafond_intérieur) {
      this.infoFormcoordonnees
        .get("Etat_du_plafond_intérieur")
        ?.setValue("Neuf");
    }

    const storage = localStorage.getItem("facebook_auth");
    const storageAuth = localStorage.getItem("user");
    if (storageAuth) {
      this.userIn = JSON.parse(storageAuth);
    }
    if (storage) {
      this.userIn = JSON.parse(storage);
    }

    const email = this.userIn.email;

    this.loginService.getinfoUser(email).subscribe((data) => {
      this.item = data;
      console.log(data);
    });

    if (this.infoFormcoordonnees.valid) {
      this.data = this.infoFormcoordonnees.value;
      console.log(this.data);
      this.constatService.addconstat(this.data).subscribe((data) => {
        console.log(data);
        this.toastr.success("Constat declaré ");
      });
      this.router.navigate(["compte-utilisateur/constat"]);
    }
    
  }
}
