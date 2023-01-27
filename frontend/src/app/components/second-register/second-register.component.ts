import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import User from 'src/app/models/user';
import { UsersService } from 'src/app/services/users.service';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-second-register',
  templateUrl: './second-register.component.html',
  styleUrls: ['./second-register.component.css']
})
export class SecondRegisterComponent implements OnInit {
  myUser= new User(); 
  dataFromStep1:User;
  cities= environment.cities;
  

  constructor(private router:Router, private usersService: UsersService){
    this.dataFromStep1= this.router.getCurrentNavigation()?.extras.state?.['data'];
    if (this.dataFromStep1) {
      console.log(this.dataFromStep1)
    };

  }

ngOnInit(): void {
  this.myUser.userId= this.dataFromStep1.userId;
  this.myUser.username= this.dataFromStep1.username;
  this.myUser.password= this.dataFromStep1.password;

}


  completeSign(){
    console.log(this.myUser)

    this.usersService.getRegister(this.myUser)
      .subscribe({
        next:(value)=>console.log(value),
        error:(err)=>console.log(err)
      })
    this.router.navigate([{outlets:{leftBar: 'login' }}], {state:{data: this.myUser}});
    alert("complete")
  }
}
