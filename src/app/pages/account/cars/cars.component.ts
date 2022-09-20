import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator'; 
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AppService } from 'src/app/app.service';
import { CarsService } from 'src/app/services/cars.service';
import { CarsDialogComponent } from './cars-dialog/cars-dialog.component';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss']
})
export class CarsComponent implements OnInit {
  // displayedColumns: string[] = ['name', 'surname', 'email', 'tel', 'adresse','cni', 'city','country','status', 'actions'];
  displayedColumns: string[] = ['name', 'surname','status', 'actions'];
  user:any = [];
  customerList: any;
  dataSource!: MatTableDataSource<any>
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  public stores = [
    { id: 1, name: 'Store 1' },
    { id: 2, name: 'Store 2' }
  ]


  constructor(public appService:AppService,
             public appServices:UserServiceService,
               public snackBar: MatSnackBar) { }

  ngOnInit() { 
    // this.user = this.appService.getuser();
 
    // this.initDataSource( this.user); 
    this.getCustomer(); 
  }
  getCustomer(){
    this.appServices.getUser().subscribe((reponse:any)=>{
      console.log (reponse);
      this.user= reponse['user'];
      this.dataSource = new MatTableDataSource<any>(this.user);
      this.customerList = new MatTableDataSource<any>();

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

  public remove(customer:any) {
    const index: number = this.dataSource.data.indexOf(customer);    
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

  public openCustomerDialog(customer:any){
    let data = {
      customer: customer,
      stores: this.stores,
      user: this.user
    };
    const dialogRef = this.appService.openDialog(CarsDialogComponent, data, 'theme-dialog');
    dialogRef.afterClosed().subscribe(cus => {  
      if(cus){
        let message = '';      
        const index: number = this.dataSource.data.findIndex(x => x.id == cus.id); 
        if(index !== -1){
          this.dataSource.data[index] = cus;
          message = 'Customer '+cus.firstName+ ' ' +cus.lastName+' updated successfully';
        } 
        else{ 
          let last_customer = this.dataSource.data[this.dataSource.data.length - 1]; 
          cus.id = last_customer.id + 1; 
          this.dataSource.data.push(cus); 
          this.paginator.lastPage();
          message = 'New customer '+cus.firstName+ ' ' +cus.lastName+' added successfully!'; 
        }  
        this.initDataSource(this.dataSource.data); 
        this.snackBar.open(message, '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });          
      }
    });  
  }

}
