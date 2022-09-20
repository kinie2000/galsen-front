import { DomSanitizer } from '@angular/platform-browser';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-get-app-galsen',
  templateUrl: './get-app-galsen.component.html',
  styleUrls: ['./get-app-galsen.component.scss']
})
export class GetAppGalsenComponent implements OnInit {
  @Input('backgroundImage') backgroundImage:any;

  public bgImage:any;


  constructor(private sanitizer:DomSanitizer) {
    
   }

  ngOnInit(): void {
    if(this.backgroundImage){
      this.bgImage = this.sanitizer.bypassSecurityTrustStyle('url('+this.backgroundImage +')'); 
    }
  }

}
