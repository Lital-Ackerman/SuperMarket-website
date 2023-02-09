import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import User from 'src/app/models/user';
import { CartsService } from 'src/app/services/carts.service';
import { itemsService } from 'src/app/services/items.service';
import { ProductsService } from 'src/app/services/products.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(
    private router:Router,
    private productService:ProductsService,
    private cartsService:CartsService,
    private itemsService:itemsService,
    private usersService: UsersService,
    private location:Location
    ){}

  logoText="SuperMario";
  // myUser:User= this.usersService.myUser;
  userInfo={userProfile: "guest", username: "Guest"};
  searchProductName: string="";
  placeholderText='Search Product...';
  cartProducts:boolean= false;
  // checkOut:boolean= false;



  ngOnInit(){
    this.location.onUrlChange((url)=>{
      console.log(url)
      this.cartProducts=
      url=='http://localhost:4200/products(leftBar:cart)' || url=='http://localhost:4200/orderDetails(leftBar:cart)'
      ? true : false ;
    })

    this.usersService.userEmitter.subscribe(
      (loggedUser:User)=>{
        console.log(loggedUser)
          this.userInfo= loggedUser.role==1
          ?  {userProfile: "admin", username: loggedUser.firstName}
          :  {userProfile: "user", username: loggedUser.firstName};
        })

        this.productService.clearEmitter.subscribe(
          (value)=>{this.searchProductName="";
         this.placeholderText= value=='cart'
         ? "Search Product..."
          :"Search In Receipt (:"

        }
        )
  }

  onSearch(productName:string){
  // console.log(this.cartBody.nativeElement.innerHTML)
  // let newHTML= `${this.cartBody.nativeElement.innerHTML}| highLighter:searchProductName:'partial'`
  // this.cartBody.nativeElement.innerHTML= newHTML;
  if(productName.length>0 && !this.productService.checkOut){
    // this.checkOut= false;
    // this.placeholderText= 'Search Product...';
    this.productService.getProductBySearch(productName).subscribe({
      next:(value)=>{console.log(value)},
      error:(error)=>{console.log(error)}
    })
}

if(this.productService.checkOut){
  // this.checkOut= true;
  this.productService.searchInReceipt(this.searchProductName)
}
}

logOut(){
  // this.usersService.myUser= undefined;
  // this.userInfo={userProfile: "guest", username: "Guest"};
  // this.router.navigate([{outlets:{primary: ['main'], leftBar: ['login'] }}]);
  location.reload()
localStorage.removeItem('userToken');

}
}
