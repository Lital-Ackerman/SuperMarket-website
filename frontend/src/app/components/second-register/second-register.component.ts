import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { Router } from '@angular/router';
import User from 'src/app/models/user';
import { GlobalService } from 'src/app/services/global.service';
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
  loginWarning:string;
  @ViewChild('registerBtn') registerBtn:MatButton;
  @ViewChild('errorsDiv2') errorsDiv2:ElementRef;


  constructor(
    private router:Router,
    private usersService: UsersService,
    private globalService: GlobalService
    ){
    this.dataFromStep1= this.router.getCurrentNavigation()?.extras.state?.['data'];
    if (this.dataFromStep1) {
    };

  }


  /**
   * Gets the user details from step1 form
   */
  ngOnInit(): void {
    if(this.dataFromStep1){
      this.myUser= this.dataFromStep1}
  }

  /**
   * Start register process
   */
  completeSign(){
      this.errorsDiv2.nativeElement.innerHTML="";
      this.usersService.getRegister(this.myUser)
        .subscribe({
          next:(value)=>{
            this.globalService.openSnackBar("You are now registered!")
            this.router.navigate([{outlets:{leftBar: 'login' }}], {state:{data: this.myUser}});
          },
          error:(err)=>{
            this.registerBtn._elementRef.nativeElement.disabled= true;
            const errors= err.error.message;
            err.status=='403'
              ? this.globalService.popThisMessage(errors)
              :this.globalService.openSnackBar(errors);

            if(typeof errors== 'object'){
              for (const key in errors) {
                this.errorsDiv2.nativeElement.innerHTML+=(`<span class="bi bi-exclamation-circle-fill"> ${errors[key]}</span><br/>`);
              }
            }else{
              this.errorsDiv2.nativeElement.innerHTML= `<span class="bi bi-exclamation-circle-fill"> ${errors}</span>`;
            }}
        })
    }


    /**
     * Navigate to step1 form with user details
     */
    goBackToStep1(){
      this.router.navigate([{outlets:{leftBar: 'registerA' }}], {state:{data: this.myUser}});

    }
}
