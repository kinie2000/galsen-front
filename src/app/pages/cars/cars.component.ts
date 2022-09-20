import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator'; 
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CarsService } from 'src/app/services/cars.service';
import { AppService } from '../../app.service';
import { CarsDialogComponent } from './cars-dialog/cars-dialog.component';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss']
})
export class CarsComponent implements OnInit {
  displayedColumns: string[] = ['name', 'surname', 'email', 'tel', 'adresse','cni', 'city','country','status', 'actions'];
  cars:any = [];
  carsList: any;
  dataSource!: MatTableDataSource<any>
  public stores = [
    { id: 1, name: 'Store 1' },
    { id: 2, name: 'Store 2' }
  ]
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  constructor(public appService:AppService,
    public appServices:CarsService,
      public snackBar: MatSnackBar) { }

ngOnInit() { 
// this.cars = this.appService.getcars();

// this.initDataSource( this.cars); 
this.getCar(); 
}
getCar(){
this.appServices.getCars().subscribe((reponse:any)=>{
console.log (reponse);
this.cars= reponse['cars'];
this.dataSource = new MatTableDataSource<any>(this.cars);
this.carsList = new MatTableDataSource<any>();

})
setTimeout(()=>{
this.dataSource.paginator = this.paginator;
this.dataSource.paginator = this.paginator;
this.dataSource.sort = this.sort;
},0)
}
public initDataSource(data:any){
this.dataSource = new MatTableDataSource(data);
this.dataSource.paginator = this.paginator;
this.dataSource.sort = this.sort; 
} 

public remove(cars:any) {
const index: number = this.dataSource.data.indexOf(cars);    
if (index !== -1) {
const message = this.appService.getTranslateValue('MESSAGE.SURE_DELETE');
let dialogRef = this.appService.openConfirmDialog('', message!);
dialogRef.afterClosed().subscribe(dialogResult => {
if(dialogResult){ 
 this.dataSource.data.splice(index,1);
 this.initDataSource(this.dataSource.data); 
}
});  
} 
}  

public openCarsDialog(car:any){
let data = {
car: car,
stores: this.stores,
cars: this.cars
};
const dialogRef = this.appService.openDialog(CarsDialogComponent, data, 'theme-dialog');
dialogRef.afterClosed().subscribe(cus => {  
if(cus){
let message = '';      
const index: number = this.dataSource.data.findIndex(x => x.id == cus.id); 
if(index !== -1){
 this.dataSource.data[index] = cus;
 message = 'cars '+cus.firstName+ ' ' +cus.lastName+' updated successfully';
} 
else{ 
 let last_cars = this.dataSource.data[this.dataSource.data.length - 1]; 
 cus.id = last_cars.id + 1; 
 this.dataSource.data.push(cus); 
 this.paginator.lastPage();
 message = 'New cars '+cus.firstName+ ' ' +cus.lastName+' added successfully!'; 
}  
this.initDataSource(this.dataSource.data); 
this.snackBar.open(message, '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });          
}
});  
}

}
