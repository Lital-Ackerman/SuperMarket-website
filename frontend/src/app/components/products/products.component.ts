import { Component, HostListener, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service';
import { MatDialog } from '@angular/material/dialog';
import {PopUpProductComponent } from 'src/app/components/pop-up-product/pop-up-product.component';
import { CartsService } from 'src/app/services/carts.service';
import { UsersService } from 'src/app/services/users.service';
import { GlobalService } from 'src/app/services/global.service';
import {currentHost} from 'src/environment/environment'

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})


export class ProductsComponent implements OnInit {

  isAdmin= this.usersService.myUser.role==1 ?true :false;
  selectedCategory:number|string;
  categories:Category[];
  products:Product[]=[];
  imageUrl= `${currentHost}/api/products/images/`
  productsMessage:string=" Choose category to find your product..."
  clickMe:boolean=false;
  fillIcon:string[]=this.productsService.likesArray;
  smallScreen=true;
  innerWidth:number;


  constructor(
  private categeriesService:CategoriesService,
  private productsService:ProductsService,
  private usersService:UsersService,
  private globalService: GlobalService,
  private matDialog:MatDialog){}


  /**
   * Sets 'smallScreen' variable for responsive purpose
   * @param event 
   */
  @HostListener('window:resize', ['$event'])
  onResize(event:MouseEvent) {
    this.smallScreen= window.innerWidth<576? true : false;
  }


  /**
   * Get categories and products when component mount
   */
  ngOnInit(){
    this.getCategories();
    this.showProducts(1);
    this.smallScreen= window.innerWidth<576? true : false;
    

  //Display modified products at the same category after Admin edit/add action.
    this.productsService.modificationEmitter.subscribe(
      (value)=>{
        if(value.status!='simple')this.getCategories();
        this.showProducts(value.categoryId);
      });

  //Display products according to user search
    this.productsService.productsEmitter.subscribe(
      (products)=>{
      this.selectedCategory=-1;
      this.products=products;
      if(this.products.length==0) this.productsMessage=" No product match your search"
      })
  }


/**
 * Change heart icon according to user click.
 * Save product in array in order to save user favorites
 * @param productName 
 */
  toggleIcon(productName:string){
      if(this.fillIcon.includes(productName) ){
        this.fillIcon=this.fillIcon.filter(i=>i!=productName)
        this.productsService.likesArray= this.fillIcon;
      }else{
        this.fillIcon.push(productName);
        this.productsService.likesArray= this.fillIcon;
      }
  }


  /**
   * Get categories
   */
  getCategories(){
    this.categeriesService.getCategories().subscribe({
      next:(value)=>{this.categories=value},
      error: (err)=>{
        err.status=='403'
        ? this.globalService.popThisMessage(err.error.message)
        :this.globalService.openSnackBar(err.error.message)
      }}
    )
  }


  /**
   * Display categories according to category Id
   * @param categoryId 
   */
  showProducts(categoryId:number|string){
    this.selectedCategory= categoryId;
    this.productsService.clearEmitter.emit('cart');
    this.productsService.getProductsByCategory(categoryId).subscribe({
      next:(value)=>{
        this.products=value;
        if(this.products.length==0)
                this.productsMessage=" No products match this category"
      },
      error: (err)=>{
        err.status=='403'
          ? this.globalService.popThisMessage(err.error.message)
          :this.globalService.openSnackBar(err.error.message)
      }}
    )
  }


  /**
   * Select Product: 
   * 1.for admin- change button text and send product details to editing form
   * 2. for user- open pop-up dialog to choose product quantity
   * @param selectedProduct 
   */
  selectProduct(selectedProduct:Product){
    this.productsService.clearEmitter.emit('cart');
    if(this.isAdmin){
      this.productsService.productDataToEdit(selectedProduct)
    }
    else {
    this.matDialog.open(PopUpProductComponent, {
      "width": '300px',
      "maxHeight": '90vh',
      "data": selectedProduct,
      "autoFocus": false
    });  
  }}

}
