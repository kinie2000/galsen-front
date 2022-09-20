import { SwiperConfigInterface, SwiperPaginationInterface } from 'ngx-swiper-wrapper';
import { AppService } from 'src/app/app.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-testimonials-galsen',
  templateUrl: './testimonials-galsen.component.html',
  styleUrls: ['./testimonials-galsen.component.scss']
})
export class TestimonialsGalsenComponent implements OnInit {

  public testimonials:any;
  public config: SwiperConfigInterface = { };
  private pagination: SwiperPaginationInterface = {
    el: '.swiper-pagination',
    clickable: true
  };

  constructor(public appService: AppService) { 
    this.testimonials = this.appService.getTestimonialsGalsen(); 
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    this.config = {
      observer: true,
      slidesPerView: 1,
      spaceBetween: 0,       
      keyboard: true,
      navigation: true,
      pagination: this.pagination,
      grabCursor: true,        
      loop: false,
      preloadImages: false,
      lazy: true 
    }
  }

}
