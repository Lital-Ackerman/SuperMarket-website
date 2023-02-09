import { literalMap } from '@angular/compiler';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Credentials } from 'src/app/models/credentials';
import User from 'src/app/models/user';
import { CartsService } from 'src/app/services/carts.service';
import { UsersService } from 'src/app/services/users.service';
import { environment } from 'src/environment/environment';
import { PopMessageComponent } from '../pop-message/pop-message.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {

  @ViewChild('shopBtn') shopBtn:ElementRef;

  shopBtnText="Start Shopping";
  userLogin= new Credentials("", "");
  isLogged= false;
  myUser: User;
  orderStatus:any;
  // removeLogin= false;
  loginWarning:string;
  cartStatus:string;
  emailRegEx= environment.patterns.email;
  passwordRegEx= environment.patterns.password;
  textField:any;
  isJustFinishedShop:boolean;

  constructor(
    private usersService: UsersService,
    private cartsService: CartsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private matDialog:MatDialog
    ){
      //user from registration
      this.myUser= this.router.getCurrentNavigation()?.extras.state?.['data'];
      // this.isJustFinishedShop= this.router.getCurrentNavigation()?.extras.state?.['isJustFinishedShop'];
      console.log(this.myUser);
    }

  ngOnInit() {
    // if(this.isJustFinishedShop){
    //   this.myUser= this.usersService.myUser;
    //   // this.shopBtn.nativeElement.disabled=false;
    //   this.raiseStatusEmitter();
    //   console.log(this.myUser);
    //   this.shopBtnText= "Shop Again?"
    //   // this.cartStatus= "new";
    // }
    this.autoLogin()

    if(this.myUser){
      this.userLogin= new Credentials(this.myUser.username, this.myUser.password);
      console.log(this.userLogin);
      // this.removeLogin=true;
    this.onLogin()
    }
  }

  autoLogin(){
    if(localStorage['userToken']){
      console.log(typeof(localStorage['userToken']))
      const lastUserToken= localStorage['userToken'];
      console.log(lastUserToken)
      this.usersService.isTokenValid(lastUserToken).subscribe({
        next:(value)=>{console.log(value);
          if(value.message!= "Invalid Token"){
            this.myUser= value;
            this.shopBtn.nativeElement.disabled=false;
              if(this.myUser.role==0){
                console.log(this.myUser);
                console.log(this.isLogged);
                this.raiseStatusEmitter();
              }else{
              this.shopBtnText= "Add/Edit Products"
            }}},
        error:(err)=>{console.info(err);
      }})
    }
  }

  ngAfterViewInit(){

    this.shopBtn.nativeElement.disabled=
    this.isJustFinishedShop ? false :true
  }

goRegister(){
  this.router.navigate([{outlets:{leftBar: 'registerA' }}])
}

  onLogin(){
    console.log(this.userLogin);

    this.usersService.isLogged(this.userLogin)
      .subscribe({
        next:(value:any)=>{
          this.myUser= value;
          this.isLogged= true ;
          localStorage["userToken"]= value.token;

          if(this.myUser.role==0){
          console.log(this.myUser);
          console.log(this.isLogged);
          this.shopBtn.nativeElement.disabled=false;
          this.raiseStatusEmitter();
          // this.usersService.myUser= this.myUser;
          }else{
            this.router.navigate([{outlets:{primary: 'products',leftBar: 'cart' }}])
          }
      },
        error: (err)=>{
          console.log(err);
          this.isLogged= false;
          this.shopBtnText= "Start Shopping"
          this.loginWarning= err.error?.message
          console.log(this.isLogged);
          this.shopBtn.nativeElement.disabled=true;

        }
      })

      }

      raiseStatusEmitter(){
        this.cartsService.getStatus(this.myUser.userId, this.myUser.firstName).subscribe({
          next:(value)=>{console.log(value);
            if(value.resType==1){
            this.shopBtnText= "Resume Shopping";
            this.cartStatus= "old";
          }else{
            this.shopBtnText= this.isJustFinishedShop ? "Shop Again?" : "Start Shopping";
            this.cartStatus= "new";
          }},
          error:(error)=>{console.log(error)}
        })
      }

      goShop(){
        if(this.myUser.role==1){
          this.router.navigate([{outlets:{leftBar:['cart'], primary: ['products']}}]);
        }
        else if(this.cartStatus=="new"){
         this.cartsService.openNewCart(this.myUser.userId).subscribe({
            next:(value)=>{console.log(value.cartId);},
            error: (error)=>{console.log(error)}
            })}
        this.router.navigate([{outlets:{leftBar:['cart'], primary: ['products']}}], {state:{cartStatus: this.cartStatus}});

        }
      }



