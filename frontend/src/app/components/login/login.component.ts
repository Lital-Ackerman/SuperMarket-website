import { literalMap } from '@angular/compiler';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Credentials } from 'src/app/models/credentials';
import User from 'src/app/models/user';
import { CartsService } from 'src/app/services/carts.service';
import { UsersService } from 'src/app/services/users.service';

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
  // openCart:any;
  // lastOrder:any;
  orderStatus:any;
  removeLogin= false;
  loginWarning:string;
  cartStatus:string;

  constructor(
    private usersService: UsersService,
    private cartsService: CartsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
    ){
      //user from registration
      this.myUser= this.router.getCurrentNavigation()?.extras.state?.['data'];
      console.log(this.myUser);
    }

  ngOnInit() {
    if(this.myUser){
    this.userLogin= new Credentials(this.myUser.username, this.myUser.password);
    console.log(this.userLogin);
    this.removeLogin=true;
    this.onLogin()
    }
  }

  ngAfterViewInit(){
    this.shopBtn.nativeElement.disabled=true
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
            this.shopBtnText= "Start Shopping";
            this.cartStatus= "new";
          }},
          error:(error)=>{console.log(error)}
        })
      }

      goShop(){
        if(this.cartStatus=="new"){
         this.cartsService.openNewCart(this.myUser.userId).subscribe({
            next:(value)=>{console.log(value.cartId);},
            error: (error)=>{console.log(error)}
            })}
        this.router.navigate([{outlets:{leftBar:['cart'], primary: ['products']}}], {state:{cartStatus: this.cartStatus}});

        }


      }



