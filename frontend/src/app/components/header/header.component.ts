import { Component, OnInit } from '@angular/core';
import User from 'src/app/models/user';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private userService:UsersService){}

  logoText="SuperMario";
  myUser:User= this.userService.myUser;
  userInfo={userProfile: "guest", username: "Guest"};

  ngOnInit(){
    this.userService.userEmitter.subscribe(
      (loggedUser:User)=>{
        console.log(loggedUser)
          this.userInfo= loggedUser.role==1
          ?  {userProfile: "admin", username: loggedUser.firstName}
          :  {userProfile: "user", username: loggedUser.firstName};
        })
  }


}
