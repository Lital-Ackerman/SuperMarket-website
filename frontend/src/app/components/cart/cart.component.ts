import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from 'src/app/models/item';
import { Product } from 'src/app/models/product';
import { CartsService } from 'src/app/services/carts.service';
import { itemsService } from 'src/app/services/items.service';
import { ProductsService } from 'src/app/services/products.service';
import { Location } from '@angular/common';
import { HighlighterPipe } from 'src/app/methods/high-lighter.pipe';
import { UsersService } from 'src/app/services/users.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
isAdmin= this.usersService.myUser.role==1 ?true :false;
total:number=0;
searchProductName: string="";
myCartContent:any[]=[];
cartId:number;
cartType:string;
checkOut:boolean= false;
// @ViewChild ('cartBody') cartBody:ElementRef;
// @ViewChild ('nameInfo') nameInfo:ElementRef;
// @ViewChild ('searchProductName') searchProductName:ElementRef;



constructor(
  private router:Router,
  private productService:ProductsService,
  private cartsService:CartsService,
  private itemsService:itemsService,
  private usersService: UsersService,
  private location: Location
  // private highlighter: HighlighterPipe,

  ){
    this.cartType= this.router.getCurrentNavigation()?.extras.state?.['cartStatus'];
    console.log(this.cartType);

  }



ngOnInit(): void {
if(this.cartType=="old") this.getContent();

this.itemsService.itemsEmitter.subscribe(()=>{this.getContent()})
}

getContent(){
  this.cartsService.getCartContent().subscribe({
    next:(value:any)=>{
      this.myCartContent= value;
      console.log(this.myCartContent)
      this.total=0;
      this.myCartContent.forEach((item:Item)=>{this.total+=item.totalPerProduct });
      this.cartsService.cartTotal= this.total;
    },
    error:(error:any)=>{console.log(error)}
  })
}

DeleteItems(deleteThis: Item|string){
  // this.searchProductName="";
  this.itemsService.deleteItems(deleteThis).subscribe({
    next:(value)=>{console.log(value)},
    error:(error)=>{console.log(error)}
  })
}

onSearch(productName:string){
  // console.log(this.cartBody.nativeElement.innerHTML)
  // let newHTML= `${this.cartBody.nativeElement.innerHTML}| highLighter:searchProductName:'partial'`
  // this.cartBody.nativeElement.innerHTML= newHTML;
  if(productName.length>0){
    this.productService.getProductBySearch(productName).subscribe({
      next:(value)=>{console.log(value)},
      error:(error)=>{console.log(error)}
    })
}}

onCheckOut(){
  this.searchProductName="";
  if(this.myCartContent.length>0){
  this.checkOut= true;
  this.cartsService.cartCheckOut= true;
  this.router.navigate([{outlets:{primary: ['orderDetails'] }}]);
  }
}

goBack(){
  this.checkOut= false;
  this.cartsService.cartCheckOut= false;
}

clearSearch(){
    this.searchProductName="";

}

}



// public windowWidth = 600;
//   public windowHeight = 500;
//   public opened = true;

//   public openClose(isOpened: boolean): void {
//     this.opened = isOpened;
//   }
