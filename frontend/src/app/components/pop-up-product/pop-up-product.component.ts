import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Item } from 'src/app/models/item';
import { Product } from 'src/app/models/product';
import { CartsService } from 'src/app/services/carts.service';
import { GlobalService } from 'src/app/services/global.service';
import { itemsService } from 'src/app/services/items.service';

@Component({
  selector: 'app-pop-up-product',
  templateUrl: './pop-up-product.component.html',
  styleUrls: ['./pop-up-product.component.css']
})
export class PopUpProductComponent {
  myProduct= this.selectedProduct.productName;
  units:number;
  @ViewChild('addBtn') addBtn:MatButton;

  constructor(
    @Inject(MAT_DIALOG_DATA) public selectedProduct:Product,
    private itemsService: itemsService,
    private cartsService: CartsService,
    private globalService: GlobalService
  ){}


/**
 *Add the selected product to cart. Includes validation of units Number.
 */
addToCart(){
try{
  if(!this.units || this.units>10 || this.units<0){
    this.addBtn._elementRef.nativeElement.disabled= true;
    this.globalService.openSnackBar("Range of units should be between 1-10. Please try again.")
  }
  else if(!this.cartsService.cartCheckOut){
  let itemInfo:Item= {
      productName: this.selectedProduct.productName,
      productId: this.selectedProduct.productId,
      price: this.selectedProduct.price,
      quantity: this.units,
      totalPerProduct: this.units*this.selectedProduct.price,
      cartId: this.cartsService.cartId
  }

  this.itemsService.postItemToCart(itemInfo).subscribe({
    next:(value)=>{},
    error:(err)=>{
      err.status=='403'
      ? this.globalService.popThisMessage(err.error.message)
      :this.globalService.openSnackBar(JSON.stringify(err.error.message))
    }
    })}
}catch(err){
  this.globalService.openSnackBar("Oops, Something went wrong! Please try again.")
}}

}
