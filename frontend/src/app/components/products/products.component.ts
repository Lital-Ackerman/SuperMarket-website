import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import {PopUpProductComponent } from 'src/app/components/pop-up-product/pop-up-product.component';
import { CartsService } from 'src/app/services/carts.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  categories:Category[];
  products:Product[];
  imageUrl= "http://localhost:5000/api/products/images/"

  constructor(
  private categeriesService:CategoriesService,
  private productsService:ProductsService,
  private userService:UsersService,
  private cartsService:CartsService,
  private matDialog:MatDialog){}

  ngOnInit(){
    this.categeriesService.getCategories().subscribe({
      next:(value)=>{this.categories=value},
      error: (error)=>{console.log(error)}}
    )

    this.productsService.productsEmitter.subscribe(
      (products)=>{this.products=products;}
    )

    console.log(this.userService.myUser)

  }

  showProducts(categoryId:number){
    console.log(categoryId);
    this.productsService.getProductsByCategory(categoryId).subscribe({
      next:(value)=>{this.products=value; console.log(this.products)},
      error: (error)=>{console.log(error)}}
    )
  }

  selectProduct(selectedProduct:any){
    console.log(selectedProduct)
    this.matDialog.open(PopUpProductComponent, {
      "width": '300px',
      "maxHeight": '90vh',
      "data": selectedProduct,
      "autoFocus": false
    });  }


}
