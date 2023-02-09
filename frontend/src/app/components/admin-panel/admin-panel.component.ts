import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CartsService } from 'src/app/services/carts.service';
import { UsersService } from 'src/app/services/users.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/models/product';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  constructor(
    private productsService:ProductsService,
    private categoriesService:CategoriesService
){}

myProduct:Product= new Product();
mode:string='menu';
newCategory:boolean= false;
categories:Category[];
infoMessage:string;
@ViewChild ('newCategoryCheck') newCategoryCheck: ElementRef;
@ViewChild ('adminForm') adminForm: HTMLFormElement;
@ViewChild ('image') imageInput: ElementRef;
// @ViewChild ('citySelect') citySelect: HTMLSelectElement;
imageVisited: boolean=false;
// path=require("path");


ngOnInit(){
  this.myProduct.categoryId="";
  this.productsService.editProductEmitter.subscribe(
  (editProduct)=>{
    this.mode='edit';
    this.myProduct=editProduct;
    this.infoMessage="";
    if(this.imageInput) this.imageInput.nativeElement.value= "";
    this.imageVisited= false;

    console.log(this.myProduct)
  })

this.categoriesService.categorietsEmitter.subscribe(
  (categories)=>{
  this.categories=categories;
  })
}

addMode(){
  this.mode='add';
  this.infoMessage="";
  this.myProduct= new Product();
  this.imageVisited= false;

}

handleProduct(){
if(this.newCategory){
  console.log(this.myProduct.categoryName)
  this.categoriesService.postNewCategory(this.myProduct.categoryName).subscribe({
  next:(value)=>{console.log(value)
    this.myProduct.categoryId= value.insertId
    this.mode=='add'
    ? this.addProduct()
    : this.editProduct()
  },
  error:(err)=>{console.log(err)}
  })
}else{
  if(this.mode=='add') this.addProduct()
  if(this.mode=='edit') this.editProduct()
}}

ChangeCategoryInput(){
  console.log(this.newCategoryCheck)
// this.categories=this.categoriesService.myCategories
this.newCategory= this.newCategoryCheck.nativeElement.checked ? true : false;
}

addProduct(){
  const fd= Product.convertToFormData(this.myProduct)
  console.log(fd)
  console.log(this.myProduct)
  this.productsService.postNewProduct(fd, this.myProduct.categoryId).subscribe({
    next:(value)=>{
      console.log(value);
      this.adminForm.reset();
      this.imageInput.nativeElement.value="";
      this.imageVisited= false;
      this.myProduct= new Product();
      this.infoMessage="Product has been added successfully!"
      this.mode= "menu";
    },
    error: (err)=>{console.log(err);
      this.infoMessage= err.error.message
    }
  })
}

editProduct(){
  this.infoMessage="";
  console.log(this.myProduct)
  const fd= Product.convertToFormData(this.myProduct)

  this.productsService.editThisProduct(fd, this.myProduct.categoryId).subscribe({
    next:(value)=>{console.log(value);
      this.myProduct= new Product();
      this.infoMessage="Product has been modified successfully!"
      this.mode= 'menu';
    },
    error: (err)=>{console.log(err)}
})
}

saveImage(args:Event): void{
  console.log(this.myProduct.imageFile)
  this.myProduct.imageFile=(args.target as HTMLInputElement).files;
  console.log(this.myProduct.imageFile.length)
  if(this.myProduct.imageFile.length==0) this.myProduct.imageFile=undefined;
}

isImageVisited(): void{
  this.imageVisited= true;
}
}
