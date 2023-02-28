import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/models/product';
import { Category } from 'src/app/models/category';
import { GlobalService } from 'src/app/services/global.service';
import { MatCheckbox } from '@angular/material/checkbox';


@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  constructor(
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    private globalService: GlobalService
){}

myProduct:Product= new Product();
mode:string='menu';
newCategory:boolean= false;
categories:Category[];
@ViewChild ('newCategoryCheck') newCategoryCheck: MatCheckbox;
@ViewChild ('adminForm') adminForm: HTMLFormElement;
@ViewChild ('image') imageInput: ElementRef;
@ViewChild ('citySelect') citySelect: HTMLSelectElement;
imageVisited: boolean=false;
addBtnText= "Add new Product";
nameExist:boolean;


ngOnInit(){

  /**
   * Update the inputs according to the selected product.
   */
  this.productsService.editProductEmitter.subscribe(
  (editProduct)=>{
    this.mode='edit';
    this.addBtnText= ""
    this.myProduct=editProduct;
    this.productsService.modificationEmitter.emit({categoryId: this.myProduct.categoryId, status:'simple'});
    if(this.imageInput) this.imageInput.nativeElement.value= "";
    this.imageVisited= false;
  })

  /**
   * Get categories
   */
  this.categoriesService.categorietsEmitter.subscribe(
  (categories)=>{
  this.categories=categories;
  })
}

/**
 * Add Mode gets the relevant headlines and inputs
*/
addMode(){
  this.myProduct.categoryId
  ?this.productsService.modificationEmitter.emit({categoryId: this.myProduct.categoryId, status:'simple'}):null
  this.mode='add';
  this.myProduct= new Product();
  if(this.adminForm)this.adminForm.reset();
  this.imageVisited= false;
  this.productsService.clearEmitter.emit();
}

/**
 * When user click the SAVE button- the action will be according to edit/add mode and if the user add new category.
 */
handleProduct(){
  try{
  if(this.newCategory){
    this.categoriesService.postNewCategory(this.myProduct.categoryName).subscribe({
    next:(value)=>{
      this.myProduct.categoryId= value.insertId
      this.mode=='add'
      ? this.addProduct()
      : this.editProduct();
    },
    error:(err)=>{
      err.status=='403'
      ?this.globalService.popThisMessage(err.error.message)
      :this.globalService.openSnackBar(JSON.stringify(err.error.message));
    }})
  }else{
    if(this.mode=='add') this.addProduct();
    if(this.mode=='edit') this.editProduct()
  }}
  catch(err){
    this.globalService.openSnackBar("Oops, Something went wrong. Please check your Product Details and try again!")
  }}


/**
 * Change Category input from drop-down list to free-text input.
 */
ChangeCategoryInput(){
  this.newCategory= this.newCategoryCheck.checked ? true : false;
}

/**
 * Add new product
 */
addProduct(){
  this.nameExist= false;
  const fd= Product.convertToFormData(this.myProduct)
  this.productsService.postNewProduct(fd, this.myProduct.categoryId).subscribe({
    next:(value)=>{
      this.myProduct= new Product();
      // this.adminForm.reset();
      this.mode= "menu";
      this.addBtnText= "Add new Product"
      this.globalService.openSnackBar("Product has been added successfully!")
    },
    error: (err)=>{
      err.status=='403'
      ?this.globalService.popThisMessage(err.error.message)
      :this.globalService.openSnackBar(JSON.stringify(err.error.message));

    }
  })
}


/**
 * Edit product by sending FORM DATA with the modified info.
 */
editProduct(){
  this.nameExist= false;
  const fd= Product.convertToFormData(this.myProduct)

  this.productsService.editThisProduct(fd, this.myProduct.categoryId).subscribe({
    next:(value)=>{;
      this.myProduct= new Product();
      this.mode= 'menu';
      this.addBtnText= "Add new Product"
      this.globalService.openSnackBar("Product has been modified successfully!")
    },
    error: (err)=>{
      if(err.error.message=="Product Name is already Exist") {
        this.nameExist= true;
      }
      err.status=='403'
      ?this.globalService.popThisMessage(err.error.message)
      :this.globalService.openSnackBar(JSON.stringify(err.error.message));
    }
})}


/**
 *Save product image in 'myProduct' object
 * @param {Event} event the event details.
 */
saveImage(event:Event): void{
  this.myProduct.imageFile=(event.target as HTMLInputElement).files;
  if(this.myProduct.imageFile.length==0) this.myProduct.imageFile=undefined;
}


/**
 * Change variable for validation of the image input
 */
isImageVisited(): void{
  this.imageVisited= true;
}

}
