import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  isAdmin= this.usersService.myUser.role==1 ?true :false;

  categories:Category[];
  products:Product[]=[];
  imageUrl= "http://localhost:5000/api/products/images/"
  productsMessage:string="Choose category to find your product..."
  clickMe:boolean=false;

  constructor(
  private categeriesService:CategoriesService,
  private productsService:ProductsService,
  private usersService:UsersService,
  private cartsService:CartsService,
  private matDialog:MatDialog){}

  ngOnInit(){
    this.getCategories();
    this.showProducts(1);

    this.productsService.modificationEmitter.subscribe(
      (categoryId)=>{
        this.getCategories();
        this.showProducts(categoryId);
        // let categoryBtn= document.getElementById(`${categoryId}`) as HTMLButtonElement
        // console.log(categoryBtn)
        // (document.getElementById(`${categoryId}`) as HTMLButtonElement).click()

      }
      );

    this.productsService.productsEmitter.subscribe(
      (products)=>{
      this.products=products;
      console.log(products)
      if(this.products.length==0) this.productsMessage="No products match your search"
      }
    )
    console.log(this.usersService.myUser)
  }

  // ngAfterViewInit(): void {
  //   (document.getElementById('1') as HTMLButtonElement).click()
  // }

  getCategories(){
    this.categeriesService.getCategories().subscribe({
      next:(value)=>{this.categories=value},
      error: (error)=>{console.log(error)}}
    )
  }

  showProducts(categoryId:number){
    console.log(categoryId);
    this.productsService.getProductsByCategory(categoryId).subscribe({
      next:(value)=>{
        this.products=value;
        console.log(this.products)
        if(this.products.length==0)
                this.productsMessage="No products match this category"
      },
      error: (error)=>{console.log(error)}}
    )
  }

  selectProduct(selectedProduct:any){
    if(this.isAdmin){
      console.log("hey Admin");
      console.log(selectedProduct);
      this.productsMessage= "select product to Edit"
      this.productsService.productDataToEdit(selectedProduct)
      // .subscribe((value:any)=>{console.log(value)})
    }
    else {
    console.log(selectedProduct)
    this.matDialog.open(PopUpProductComponent, {
      "width": '300px',
      "maxHeight": '90vh',
      "data": selectedProduct,
      "autoFocus": false
    });  }
  }


}
