import { Location } from '@angular/common';
import { Component, OnInit} from '@angular/core';
import User from 'src/app/models/user';
import { GlobalService } from 'src/app/services/global.service';
import { ProductsService } from 'src/app/services/products.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})


export class HeaderComponent implements OnInit {
  constructor(
    private productService:ProductsService,
    private usersService: UsersService,
    private globalService: GlobalService,
    private location:Location
    ){}

  logoText="SuperMario";
  userInfo={userProfile: "guest", username: "Guest"};
  searchProductName: string="";
  placeholderText='Search Product...';
  cartComp:boolean= false;


  ngOnInit(){
    /**
     * Indicates if cart component display (in order to display search at the same time)
     */
    this.location.onUrlChange((url)=>{
        this.cartComp= url.includes('cart') ? true : false ;
    })


    /**
     * Notify to the navbar if user is logged and it's name.
     */
    this.usersService.userEmitter.subscribe(
      (loggedUser:User)=>{
          this.userInfo= loggedUser.role==1
          ?  {userProfile: "admin", username: loggedUser.firstName}
          :  {userProfile: "user", username: loggedUser.firstName};
        })


    /**
     * Clear saerch input text and change it's placeholder according to cart/receipt mode.
     */
    this.productService.clearEmitter.subscribe(
      (value)=>{this.searchProductName="";
      this.placeholderText= value=='cart'
      ? "Search Product..."
      :"Search In Receipt (:"
    })
  }


  /**
   * Searching products according to the user search. The search will be according to cart/receipt mode.
   * @param productName the search text
   */
  onSearch(productName:string){
  if(productName.length>0 && !this.productService.checkOut){
    this.productService.getProductBySearch(productName).subscribe({
      next:(value)=>{},
      error:(err)=>{
        err.status=='403'
        ? this.globalService.popThisMessage(err.error.message)
        :this.globalService.openSnackBar(err.error.message)
      }
    })
  }
  if(this.productService.checkOut){
    this.productService.searchInReceipt(this.searchProductName)
  }}



  /**
   * When user logouts- Token is deleted from local storage + reset app.
   */
  logOut(){
    localStorage.removeItem('userToken');
    location.reload()
  }
}
