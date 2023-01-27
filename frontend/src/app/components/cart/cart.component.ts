import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from 'src/app/models/item';
import { Product } from 'src/app/models/product';
import { CartsService } from 'src/app/services/carts.service';
import { itemsService } from 'src/app/services/items.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
total:number=0;
searchProductName: string;
myCartList:any[]=[];
cartId:number;


constructor(private router:Router,
  private productService:ProductsService,
  private cartsService:CartsService,
  private itemsService:itemsService
  ){
  let openCartInfo= this.router.getCurrentNavigation()?.extras.state?.['openCartInfo'];
  // let newCartId= this.router.getCurrentNavigation()?.extras.state?.['newCartId'];
  console.log(openCartInfo)
 if(openCartInfo) {
  this.myCartList= openCartInfo;
  this.myCartList.forEach((p:Item) => {this.total+=p.totalPerProduct});
 }

//  if(newCartId) this.cartId=newCartId;
  }

ngOnInit(): void {
  this.itemsService.itemsEmitter.subscribe(
    (itemInfo:Item)=>{
      console.log(itemInfo );
      this.myCartList.push(itemInfo);
      console.log(this.myCartList);
      this.total+=itemInfo.totalPerProduct
})

}

onSearch(productName:string){
  if(productName.length>0){
    this.productService.getProductBySearch(productName).subscribe({
      next:(value)=>{console.log(value)

      },
      error:(error)=>{console.log(error)}
    })
}}}
