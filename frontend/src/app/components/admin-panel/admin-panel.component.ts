import { Component, OnInit } from '@angular/core';
import { CartsService } from 'src/app/services/carts.service';
import { UsersService } from 'src/app/services/users.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  constructor(
    private productsService:ProductsService
){}

myProduct:Product= new Product();
mode:string='add';

ngOnInit(){
this.productsService.editProductEmitter.subscribe(
  (editProduct)=>{
    this.mode='edit';
    this.myProduct=editProduct
  })
}

addMode(){
  this.mode='add';
  this.myProduct= new Product();
}

// handleProduct(){
// if(this.mode==this.addMode){
//   this.productsService
// }

// }

}
