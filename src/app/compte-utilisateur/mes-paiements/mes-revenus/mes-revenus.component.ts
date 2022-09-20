import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator'; 
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { transactions } from './mes-revenus';

@Component({
  selector: 'app-mes-revenus',
  templateUrl: './mes-revenus.component.html',
  styleUrls: ['./mes-revenus.component.scss']
})
export class MesRevenusComponent implements OnInit {
  displayedColumns: string[] = ['orderId', 'transactionId', 'date', 'paymentMethod', 'status', 'amount', 'view'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  
  constructor() { } 

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(transactions);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort; 
  }

  public view(transaction:any){  

  }
  

}
