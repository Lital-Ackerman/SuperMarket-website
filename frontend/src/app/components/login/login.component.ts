import { literalMap } from '@angular/compiler';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewChildren } from '@angular/core';
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

  constructor(
    private usersService: UsersService,
    private cartsService: CartsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
    ){
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
  this.router.navigate([{outlets:{signBar: 'registerA' }}])
}

  onLogin(){
    console.log(this.userLogin);

    this.usersService.isLogged(this.userLogin)
      .subscribe({
        next:(value:any)=>{
          this.myUser= value;
          this.isLogged= true ;
          console.log(this.myUser);
          console.log(this.isLogged);
          this.shopBtn.nativeElement.disabled=false;
          localStorage["userToken"]= value.token;
          this.raiseStatusEmitter();
          // this.usersService.myUser= this.myUser;
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
        this.cartsService.getStatus(this.myUser.userId, this.myUser.firstName).subscribe(
            (value)=>{console.log(value)
            value.resType==1
            ? this.shopBtnText= "Resume Shopping"
            : this.shopBtnText= "Start Shopping"
            }
          )
      }

      goShop(){
        if(this.shopBtnText=="Start Shopping"){
         this.cartsService.openNewCart().subscribe({
            next:(value)=>{console.log(value.cartId)
              this.router.navigate([{outlets:{leftBar:['cart'], primary: ['products']}}], {state:{newCartId:value.cartId}});
              // this.router.navigate([{outlets:{leftBar:['cart'], primary: ['products']}}], {state:{newCartId:value.cartId}});
            },
            error: (error)=>{console.log(error)}
            })}
        else{
          this.cartsService.findOpenCart().subscribe({
            next:(value)=>{console.log(value);
              this.router.navigate([{outlets:{leftBar:['cart'], primary: ['products']}}], {state:{openCartInfo:value}});
            },
            error: (error)=>{console.log(error)}
          })
        }


      }

  }

