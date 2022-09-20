import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { matchingPasswords } from 'src/app/theme/utils/app-validators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SmsService } from 'src/app/services/SmsService';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-code-validation-numero-telephone',
  templateUrl: './code-validation-numero-telephone.component.html',
  styleUrls: ['./code-validation-numero-telephone.component.scss']
})
export class CodeValidationNumeroTelephoneComponent implements OnInit {
  public passwordForm!:UntypedFormGroup | any;
  constructor(public formBuilder: UntypedFormBuilder,  private service: UserServiceService, public snackBar: MatSnackBar,public phone: SmsService) { }
public data:any;
idDriverL : any;
dataUser : any;
  ngOnInit(): void {

    const storage = localStorage.getItem("user");
    if (storage) {
      this.idDriverL = JSON.parse(storage);
    }
    this.passwordForm = this.formBuilder.group({
      verification_code: ['', Validators.required],
      // user_phone:this.idDriverL.user.user_phone
    },);
    this.service.getUserFind(this.idDriverL.user.id).subscribe((data: any) => {

      this.dataUser= data[0].user_phone
    })
    console.log( this.data)
  }


  public onPasswordFormSubmit():void {
    if (this.passwordForm.valid) {
      this.data= this.passwordForm.value

  


  
    let obj = {  
      verification_code :this.passwordForm.get('verification_code').value, 
     user_phone: this.dataUser
    }
  console.log(obj)
      this.phone.getVerification( obj).subscribe((data:any)=>{
        console.log(this.dataUser)
    window.location.href="compte-utilisateur/mon-compte/verification-compte";
  
  },(error:any) => {
      throw error;
      }
      );
  
      this.snackBar.open('Your password changed successfully!', ' ', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
    }
  }

}
