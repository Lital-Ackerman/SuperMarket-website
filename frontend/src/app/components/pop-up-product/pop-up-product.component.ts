import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Item } from 'src/app/models/item';
import { Product } from 'src/app/models/product';
import { CartsService } from 'src/app/services/carts.service';
import { itemsService } from 'src/app/services/items.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-pop-up-product',
  templateUrl: './pop-up-product.component.html',
  styleUrls: ['./pop-up-product.component.css']
})
export class PopUpProductComponent implements OnInit {
  myProduct= this.selectedProduct.productName;
  units:number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public selectedProduct:Product,
    private productsService: ProductsService,
    private itemsService: itemsService,
    private cartsService: CartsService
  ){}

  ngOnInit(): void {
    console.log(this.selectedProduct)
  }

addToCart(){
  if(!this.cartsService.cartCheckOut){

console.log(this.units);
let itemInfo:Item= {
  productName: this.selectedProduct.productName,
  productId: this.selectedProduct.productId,
  price: this.selectedProduct.price,
  quantity: this.units,
  totalPerProduct: this.units*this.selectedProduct.price,
  cartId: this.cartsService.cartId
}
console.log(itemInfo)

this.itemsService.postItemToCart(itemInfo).subscribe({
  next:(value)=>{console.log(value)},
  error:(error)=>{console.log(error)}
  })}}
}
