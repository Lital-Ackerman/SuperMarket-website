import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from 'src/app/models/item';
import { CartsService } from 'src/app/services/carts.service';
import { itemsService } from 'src/app/services/items.service';
import { ProductsService } from 'src/app/services/products.service';
import { UsersService } from 'src/app/services/users.service';
import { GlobalService } from 'src/app/services/global.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
isAdmin= this.usersService.myUser.role==1 ?true :false;
total:number=0;
myCartContent:any[]=[];
cartId:number;
cartType:string;
checkOut:boolean= false;
searchProductName="";
@ViewChild('cartBody') cartBody:ElementRef;


constructor(
  private router:Router,
  private productService:ProductsService,
  private cartsService:CartsService,
  private itemsService:itemsService,
  private usersService: UsersService,
  private globalService: GlobalService,
  ){
    this.cartType= this.router.getCurrentNavigation()?.extras.state?.['cartStatus'];

  }


  /**
   * Calling 'getContent' function when the componont upload.
   * Listen to 'add items' event
   * Listen to 'search product' event in the receipt
   */
ngOnInit(): void {
if(this.cartType=="old") this.getContent();
this.itemsService.itemsEmitter.subscribe(
    ()=>{this.getContent()})
this.productService.searchEmitter.subscribe(
    (searchText)=>{this.searchProductName=searchText})
}


/**
 * Get cart content and calculate the total payment.
 */
getContent(){
  this.cartsService.getCartContent().subscribe({
    next:(value:any)=>{
      this.myCartContent= value;
      this.total=0;
      this.myCartContent.forEach((item:Item)=>{this.total+= Number(item.totalPerProduct) });
      this.cartsService.cartTotal= this.total;
    },
    error:(err:any)=>{
      err.status=='403'
      ? this.globalService.popThisMessage(err.error.message)
      :this.globalService.openSnackBar(err.error.message)

    }
  })
}


/**
 * Delete items from cart
 * @param deleteThis itemId(deletes specific item) or string "all"(delete all items)
 */
DeleteItems(deleteThis: number|string){
  this.searchProductName="";
  this.itemsService.deleteItems(deleteThis).subscribe({
    next:(value)=>{},
    error:(err)=>{;
      err.status=='403'
      ? this.globalService.popThisMessage(err.error.message)
      :this.globalService.openSnackBar(err.error.message)

    }
  })
}


/**
 * Display 'receipt mode' and navigate to 'orderDetails' component.
 */
onCheckOut(){
  this.searchProductName="";
  this.productService.clearEmitter.emit('check');
  if(this.myCartContent.length>0){
    this.productService.checkOut= true;
    this.checkOut= true;
    this.cartsService.cartCheckOut= true;
    this.cartBody.nativeElement.style.gridRow='span 10'
    this.router.navigate([{outlets:{primary: ['orderDetails'] }}]);
  }
}


/**
 * Moving back to 'cart mode'
 */
goBack(){
  this.searchProductName="";
  this.checkOut= false;
  this.productService.checkOut= false;
  this.productService.clearEmitter.emit('cart');
  this.cartsService.cartCheckOut= false;
  this.cartBody.nativeElement.style.gridRow='span 7'
}

}



