import { Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http";
import { AuthserviceService } from './authservice.service';

@Injectable({
  providedIn: "root",
})
export class VehiculeserviceService {
  constructor(private http: HttpClient, private getAuth: AuthserviceService) {}
  addcar(val: any, id_user: number) {
    let obj = {
      val,
      id_user,
    };
    return this.http.post(this.getAuth.gethttps() + "addcar", obj);
  }
  showModel(id: any) {
    let obj = {
      id,
    };
    return this.http.post(this.getAuth.gethttps() + "showModel", obj);
  }
  showType(id: any) {
    let obj = {
      id,
    };
    return this.http.post(this.getAuth.gethttps() + "showType", obj);
  }
  showEnergie(id: any) {
    let obj = {
      id,
    };
    return this.http.post(this.getAuth.gethttps() + "showEnergie", obj);
  }
  showBoitVit(id: any) {
    let obj = {
      id,
    };
    return this.http.post(this.getAuth.gethttps() + "showBoitVit", obj);
  }
  showNbplace(id: any) {
    let obj = {
      id,
    };
    return this.http.post(this.getAuth.gethttps() + "showNbplace", obj);
  }
  showNbporte(id: any) {
    let obj = {
      id,
    };
    return this.http.post(this.getAuth.gethttps() + "showNbporte", obj);
  }
  saveimage(val: any) {
    console.log(val);
    return this.http.post(this.getAuth.gethttps() + "saveimage", val);
  }
  showMark() {
    return this.http.get(this.getAuth.gethttps() + "showMark");
  }
  storecaracteristique(val: any) {
    let obj = {
      val,
    };
    return this.http.post(
      this.getAuth.gethttps() + "storecaracteristique",
      obj
    );
  }
  getallvehicle() {
    return this.http.get(this.getAuth.gethttps() + "getallvehicle");
  }
  suprimeCar(val: any) {
    return this.http.post(this.getAuth.gethttps() + "suprimeCar", val);
  }
  findCar(val: any) {
    return this.http.post(this.getAuth.gethttps() + "findCar", val);
  }
  updateCar(val: any) {
    return this.http.post(this.getAuth.gethttps() + "updateCar", val);
  }
  getvehicleuser(val: any) {
    let obj = {
      val:val
    }
    return this.http.post(this.getAuth.gethttps() + "getvehicleuser", obj);
  }
}
