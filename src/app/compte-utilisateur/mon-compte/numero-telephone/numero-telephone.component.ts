import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { matchingPasswords } from 'src/app/theme/utils/app-validators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SmsService } from 'src/app/services/SmsService';
@Component({
  selector: 'app-numero-telephone',
  templateUrl: './numero-telephone.component.html',
  styleUrls: ['./numero-telephone.component.scss']
})

export class NumeroTelephoneComponent implements OnInit {
  public NumeroTelephonForm!:UntypedFormGroup | any;
  idDriverL : any;
  public data:any;
  constructor(public formBuilder: UntypedFormBuilder, public snackBar: MatSnackBar,public phone: SmsService) { }

  ngOnInit(): void {
    const storage = localStorage.getItem("user");
    if (storage) {
      this.idDriverL = JSON.parse(storage);
    }
    console.log(this.idDriverL.user.id);
    console.log(this.idDriverL.user.user_phone);
    this.NumeroTelephonForm = this.formBuilder.group({
      phone: ['', Validators.required],
      // id:this.idDriverL.user.id,
    });
  }

  public onNumeroTelephoneFormSubmit():void {
    
    if (this.NumeroTelephonForm.valid) {
this.data= this.NumeroTelephonForm.value.phone
let obj = {  
  id :this.idDriverL.user.id,
  user_phone :this.NumeroTelephonForm.get('phone').value, 
  // verification_code:12221
}


    this.phone.phoneNum(obj).subscribe((data:any)=>{
      console.log(obj)
  window.location.href="compte-utilisateur/mon-compte/code-validation-numero-telephone";

    },(error:any) => {
      


    throw error;
    }
    );

};

  }
}
