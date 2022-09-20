import { AppService } from 'src/app/app.service';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-our-services-galsen',
  templateUrl: './our-services-galsen.component.html',
  styleUrls: ['./our-services-galsen.component.scss']
})
export class OurServicesGalsenComponent implements OnInit {

  public awards:any[] = [];
  public config: SwiperConfigInterface = { };

  constructor(public appService: AppService) { }

  ngOnInit(): void {

    this.awards = this.appService.getSerciesGalsen();

  }

  ngAfterViewInit(){
    this.config = {
      observer: true,
      slidesPerView: 5,
      spaceBetween: 16,       
      keyboard: true,
      navigation: false,
      pagination: false,
      grabCursor: true,        
      loop: true,
      preloadImages: false,
      lazy: true,  
      autoplay: {
        delay: 6000,
        disableOnInteraction: false
      },
      speed: 500,
      effect: "slide",
      breakpoints: {
        280: {
          slidesPerView: 2
        },
        480: {
          slidesPerView: 2
        },
        600: {
          slidesPerView: 3
        },
        960: {
          slidesPerView: 4
        },
        1280: {
          slidesPerView: 5
        },
        // 1500: {
        //   slidesPerView: 6
        // }
      }
    }
  }


}
