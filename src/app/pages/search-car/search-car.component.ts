import { TemplateSearchCar } from 'src/app/app.models';
import { DataSearchService } from './../../services/data-search.service';
import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-search-car',
  templateUrl: './search-car.component.html',
  styleUrls: ['./search-car.component.scss']
})
export class SearchCarComponent implements OnInit {

    public dataSearch: TemplateSearchCar;

    public hours = ['1:00am','2:00am','3:00am','4:00am','5:00am','6:00am','7:00am','8:00am','9:00am','10:00am','11:00am','12:00am',
                    '1:00pm','2:00pm','3:00pm','4:00pm','5:00pm','6:00pm','7:00pm','8:00pm','9:00pm','10:00pm','11:00pm','12:00pm']; 

    
    geometry: any;
    address: string;


    constructor(public dataSearchService: DataSearchService) { 
      this.appendItems();
    }

    public throttle = 0;
    public distance = 1;

    listArray : string[] = [];
    sum = 30;
    direction = "";

    ngOnInit(): void {

      this.dataSearch = this.dataSearchService.templateSearchCar;

      if(typeof this.dataSearch != 'undefined') {

        this.address = this.dataSearch.address;
        this.geometry = this.dataSearch.geometry;

      } else {

        this.address = "";

      }
      
    }

    send(geometry: any){

      this.geometry = geometry;
      
    }

    onScrollDown(ev: any) {
      console.log("scrolled down!!", ev);

      this.sum += 20;
      this.appendItems();
      
      this.direction = "scroll down";
    }

    onScrollUp(ev: any) {
      console.log("scrolled up!", ev);
      this.sum += 20;
      this.prependItems();

      this.direction = "scroll up";
    }

    appendItems() {
      this.addItems("push");
    }

    prependItems() {
      this.addItems("unshift");
    }

    addItems(_method: string) {
      for (let i = 0; i < this.sum; ++i) {
        if( _method === 'push'){
          this.listArray.push([i].join(""));
        }else if( _method === 'unshift'){
          this.listArray.unshift([i].join(""));
        }
      }
    }


}