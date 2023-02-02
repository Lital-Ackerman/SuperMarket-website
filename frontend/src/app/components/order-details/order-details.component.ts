import { Component, ViewChild, ElementRef } from '@angular/core';
import { Order } from 'src/app/models/order';
import { CartsService } from 'src/app/services/carts.service';
import { itemsService } from 'src/app/services/items.service';
import { OrdersService } from 'src/app/services/orders.service';
import { ProductsService } from 'src/app/services/products.service';
import { UsersService } from 'src/app/services/users.service';
import { environment } from 'src/environment/environment';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { SuccessOrderComponent } from '../success-order/success-order.component';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent {
  cities= environment.cities;
  @ViewChild ('orderBtn') orderBtn:ElementRef;
  minShipDate=new Date();
  busyShipDate:boolean;
  orderInfo= new Order(
    this.usersService.myUser.userId,
    this.cartsService.cartId,
    this.cartsService.cartTotal

    );

    constructor(
      private productsService: ProductsService,
      private orderService: OrdersService,
      private cartsService: CartsService,
      private usersService: UsersService,
      private matDialog:MatDialog
    ){}

  autoSelect(prop:any){
    prop=="shipCity" ? this.orderInfo.shipCity=this.usersService.myUser.city :"";
    prop=="shipStreet" ? this.orderInfo.shipStreet=this.usersService.myUser.street :"";
  }

  checkShipDate(){
    this.orderService.validateShipDate(this.orderInfo.shipDate).subscribe({
      next:(ordersInDate)=>{console.log(ordersInDate);
        this.busyShipDate= ordersInDate.length>2 ? true :false;
      },
      error: (err)=>{console.log(err)}
    })
  }

  onOrder(){
    // this.orderInfo.isCompleted= 1;
    this.orderInfo.payLastDigits= +(this.orderInfo.creditCard.toString().substr(-4));
    console.log(this.orderInfo);

    this.orderService.openNewOrder(this.orderInfo).subscribe({

      next:(value=>{console.log(value);
        this.orderService.myOrder= this.orderInfo;
        this.orderBtn.nativeElement.disabled=true;
        this.orderStatusMessage()}),
      error: (error=>console.log(error))
    })
  }

  orderStatusMessage(){
    this.matDialog.open(SuccessOrderComponent, {
      "width": '300px',
      "maxHeight": '90vh',
      "data": this.orderInfo,
      "autoFocus": false
    })
  }

}
