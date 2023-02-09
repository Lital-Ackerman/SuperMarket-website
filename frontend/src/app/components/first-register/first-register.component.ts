import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import User from 'src/app/models/user';
import { UsersService } from 'src/app/services/users.service';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-first-register',
  templateUrl: './first-register.component.html',
  styleUrls: ['./first-register.component.css']
})
export class FirstRegisterComponent implements AfterViewInit {
  userIdRegEx= environment.patterns.userId;
  emailRegEx= environment.patterns.email;
  passwordRegEx= environment.patterns.password;
  myUser= new User();
  idExist:boolean;
  matchPasswords:boolean;
  validEmail:boolean;
  usernameExist:boolean;
  @ViewChild ('confirmPassword') confirmPassword:HTMLInputElement;
  @ViewChild ('password') password:HTMLInputElement;
  @ViewChild ('username') username:HTMLInputElement;

  constructor(private router: Router, private usersService:UsersService){}

  ngAfterViewInit(): void {
    console.log(this.confirmPassword)
  }
checkId(){
  if(this.myUser.userId && this.myUser.userId.toString().length>8)
  this.usersService.isIdExist(this.myUser.userId)
    .subscribe({
      next:(value)=>{
        console.log("check");
        console.log(this.myUser.userId.toString().length);
        console.log(value);

        value.length>0
        ?this.idExist=true
        :this.idExist=false;
        console.log(this.idExist);


      },
      error:(err)=>{console.log(err)}
    })
}

ValidateEmail(){
   this.usersService.isUsernameExist(this.myUser.username)
   .subscribe({
    next:(value)=>{
      console.log(value)
      value.length>0
        ?this.usernameExist=true
        :this.usernameExist=false;

        console.log(this.usernameExist)
    },
    error: (err)=>{console.log(err)}})


}


// checkMatchPass(){
//   this.matchPasswords=false;

//   this.matchPasswords=
//   this.confirmPassword.value == this.password.value
//   ?  true
//   :  false;
//   console.log(this.matchPasswords)
//   console.log(this.confirmPassword.value)
//   console.log(this.password.value)

// }

 secondRegister(){
  this.router.navigate([{outlets:{leftBar: 'registerB' }}], {state:{data: this.myUser}});
  // console.log(this.myUser)
 }

}
