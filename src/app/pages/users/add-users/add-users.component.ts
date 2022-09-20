import { Component, ViewChild, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators, FormBuilder, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
// import custom validator to validate that password and confirm password fields match
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/services/user-service.service';
import { emailValidator, matchingPasswords } from 'src/app/theme/utils/app-validators';


@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.scss']
})
export class AddUsersComponent implements OnInit {
  idUser : any;
  
  public registerForm : FormGroup | any;
  public hide = true; 
  public bgImage:any;
  constructor(public fb: UntypedFormBuilder, public router:Router, public snackBar: MatSnackBar,
     private sanitizer:DomSanitizer,
     public dialogRef:MatDialogRef<AddUsersComponent>,

     private service:UserServiceService ) { }

  ngOnInit() {
    this.bgImage = this.sanitizer.bypassSecurityTrustStyle('url(assets/images/others/register.jpg)');
    this.registerForm = this.fb.group({ 
      user_name: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      user_surname: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      email: ['', Validators.compose([Validators.required, emailValidator])],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      receiveNewsletter: false                            
    },{validator: matchingPasswords('password', 'confirmPassword')});
  }

   onRegisterFormSubmit(){
    let obj={
      id: this.idUser,
      user_name:this.registerForm.get('user_name').value,
      user_surname:this.registerForm.get('user_surname').value,
      email:this.registerForm.get('email').value,
      password:this.registerForm.get('password').value,

    }
    this.service.CreateUser(obj).subscribe((data:any)=>{
      console.log(data);
      if(data)
      {
        console.log('Client ajouté avec succès')
        this.dialogRef.close(data)
      }
      else
      {
       console.log('Une erreur s\'est produite veillez réessayer')
      } 
    })
}

}
