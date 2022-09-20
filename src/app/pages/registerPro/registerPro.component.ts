import { UntypedFormGroup, UntypedFormBuilder, Validators, FormGroup} from '@angular/forms';
import { Router } from '@angular/router'; 
import { MatSnackBar } from '@angular/material/snack-bar';
import { matchingPasswords, emailValidator } from 'src/app/theme/utils/app-validators';
import { DomSanitizer } from '@angular/platform-browser';
import { Component, Injectable, OnInit, TestabilityRegistry } from '@angular/core';
import { UserServiceService } from 'src/app/services/user-service.service';
import { ToastrService } from 'ngx-toastr';

import { EmailService } from 'src/app/services/Email.service';


@Component({
  selector: 'app-registerPro',
  templateUrl: './registerPro.component.html',
  styleUrls: ['./registerPro.component.scss']
})

  
@Injectable({
  providedIn: 'root'
})

export class RegisterProComponent implements OnInit {
    isAccept = false; 

  public registerProForm : FormGroup | any;
  public hide = true; 
  public bgImage:any;
  idUser:any;
  idEntre:any;
  idRenting:any;

  public data: any;
constructor(public fb: UntypedFormBuilder,private toastr: ToastrService,public EmailServices:EmailService, public router:Router,public service:UserServiceService, public snackBar: MatSnackBar, private sanitizer:DomSanitizer) { }


  ngOnInit() {
    this.bgImage = this.sanitizer.bypassSecurityTrustStyle('url(assets/images/others/entreprise.jpg)');
    this.registerProForm = this.fb.group({ 
      entreprise_name: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      email: ['', Validators.compose([Validators.required, emailValidator])],      
      entreprise_city: ['', Validators.required],
      location_nbr: ['', Validators.required],
      user_name: ['', Validators.required],
      user_phone: ['', Validators.required],
      receiveNewsletter:[ 'false',Validators.required ]                           
    },);
;
  }

  public onregisterProFormSubmit():void {

    let obj={
      entreprise_email:this.registerProForm.get('entreprise_email').value,
      user_name:this.registerProForm.get('user_name').value,
      entreprise_name:this.registerProForm.get('entreprise_name').value,
      entreprise_city:this.registerProForm.get('entreprise_city').value,
      location_nbr:this.registerProForm.get('location_nbr').value,
    }

    console.log('obj',obj)
this.data = this.registerProForm.value
  if(this.registerProForm.valid) {
    this.service.CreateProUser(this.data ).subscribe((data:any)=>{
       console.log(this.registerProForm)
           this.toastr.success('Votre message a été envoyé avec succès ');
 
         
         this.router.navigateByUrl('/').then();

     },(error:any) => {
       
     this.toastr.error(error.error['message']);
 
     throw error;
     }
     );
  

    }
   }

}
