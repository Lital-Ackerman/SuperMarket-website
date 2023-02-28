import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { SubscriptSizing } from '@angular/material/form-field';
import { Router } from '@angular/router';
import User from 'src/app/models/user';
import { GlobalService } from 'src/app/services/global.service';
import { UsersService } from 'src/app/services/users.service';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-first-register',
  templateUrl: './first-register.component.html',
  styleUrls: ['./first-register.component.css']
})

export class FirstRegisterComponent {
  @Input() subscriptSizing: SubscriptSizing='dynamic';
  userIdRegEx= environment.patterns.userId;
  emailRegEx= environment.patterns.email;
  passwordRegEx= environment.patterns.password;
  myUser= new User();
  idExist:boolean;
  matchPasswords:boolean;
  validEmail:boolean;
  usernameExist:boolean;
  dataFromStep2:User;
  @ViewChild ('confirmPassword') confirmPassword:HTMLInputElement;
  @ViewChild ('password') password:HTMLInputElement;
  @ViewChild ('username') username:HTMLInputElement;
  @ViewChild ('userId') userId:HTMLInputElement;

  constructor(
    private router: Router,
    private usersService:UsersService,
    private globalService:GlobalService
    ){this.dataFromStep2= this.router.getCurrentNavigation()?.extras.state?.['data'];}


/**
* When user wants to backwards from step2 form to step1 form- He could see the step1 details.
*/
  ngOnInit(): void {
   if(this.dataFromStep2){
      this.myUser= this.dataFromStep2
    }}


/** 
 * Check if ID already exist in DB, validation will be only if it has 9+ digits.
 */
  checkId(){
    if(this.myUser.userId && this.myUser.userId.toString().length>8){
    this.usersService.isIdExist(this.myUser.userId)
    .subscribe({
      next:(value)=>{
        value.length>0
        ?this.idExist= true
        :this.idExist= false;
    },
    error:(err)=>{
      this.globalService.popThisMessage(err.error.message)
    }
  })
}}


/**
 * Check if username(email) already exist in DB.
 */
ValidateEmail(){
   this.usersService.isUsernameExist(this.myUser.username)
   .subscribe({
    next:(value)=>{
      value.length>0
        ?this.usernameExist=true
        :this.usernameExist=false;
    },
    error: (err)=>{
      this.globalService.popThisMessage(err.error.message)
    }})
}


/**
 * Moving to step2 form if all the fields are filled. 
 * This validation is in addition to the HTML form validation and the final validation in step2.
 */
 secondRegister(){
  if(this.myUser.filledAllStep1() && !this.idExist && !this.usernameExist)
      this.router.navigate([{outlets:{leftBar: 'registerB' }}], {state:{data: this.myUser}})
  else
      this.globalService.openSnackBar("Please fill details as required in step 1")
 }

}
