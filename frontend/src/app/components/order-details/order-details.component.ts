import { Component, ViewChild, ElementRef, OnInit, AfterViewInit } from '@angular/core';
import { Order } from 'src/app/models/order';
import { CartsService } from 'src/app/services/carts.service';
import { itemsService } from 'src/app/services/items.service';
import { OrdersService } from 'src/app/services/orders.service';
import { ProductsService } from 'src/app/services/products.service';
import { UsersService } from 'src/app/services/users.service';
import { environment } from 'src/environment/environment';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { SuccessOrderComponent } from '../success-order/success-order.component';
import { GlobalService } from 'src/app/services/global.service';
import { MatButton } from '@angular/material/button';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})

export class OrderDetailsComponent implements OnInit {
  cities= environment.cities;
  creditRegEx= environment.patterns.creditAllTypes
  @ViewChild('orderBtn') orderBtn:MatButton;
  minShipDate=new Date();
  busyShipDate:boolean;
  myBusyDates:Date[] = [];
  orderInfo= new Order(
    this.usersService.myUser.userId,
    this.cartsService.cartId,
    this.cartsService.cartTotal
  );

  constructor(
      private orderService: OrdersService,
      private cartsService: CartsService,
      private usersService: UsersService,
      private globalService: GlobalService,
      private matDialog:MatDialog
  ){ }


  /**
   * Get days with 3+ orders
   */
  ngOnInit(): void {
        this.orderService.busyDates().subscribe({
          next:(value)=>{
            value.forEach(d=>this.myBusyDates.push(new Date(d.shipDate)))
            },
          error: (err)=>{
            err.status=='403'
              ? this.globalService.popThisMessage(err.error.message)
              :this.globalService.openSnackBar(err.error.message)
          }
        })
      }


/**
 * Display user's city/street after double click
 * @param {string} prop city/street
 */
  autoSelect(prop:any){
    prop=="shipCity" ? this.orderInfo.shipCity=this.usersService.myUser.city :"";
    prop=="shipStreet" ? this.orderInfo.shipStreet=this.usersService.myUser.street :"";
  }


/**
 * Open new order after validating credit card pattern (in adittion to HTML and server validation )
 */
  onOrder(){
    try{
      let regex= new RegExp(environment.patterns.creditAllTypes)
      if(regex.test(String(this.orderInfo.creditCard))){
        this.orderService.openNewOrder(this.orderInfo).subscribe({
          next:(value=>{
            this.orderService.myOrder= this.orderInfo;
            this.orderBtn._elementRef.nativeElement.disabled= true;
            this.orderStatusMessage()
          }),
          error: (err=>{
            const errors=err.error.message;

            err.status=='403'
              ? this.globalService.popThisMessage(errors)
              :this.globalService.openSnackBar(errors)
          })
        })
      }else{
        this.globalService.openSnackBar("Please check your Details again")
      }
    }
    catch(err){
        this.orderBtn._elementRef.nativeElement.disabled= true;
        this.globalService.openSnackBar("Oops, something went wrong!");
      }
    }

/**
 * Display pop-up dialog when order is completed
 */
  orderStatusMessage(){
    this.matDialog.open(SuccessOrderComponent, {
      disableClose: true,
      "width": '300px',
      "maxHeight": '90vh',
      "data": this.orderInfo,
      "autoFocus": false
    })
  }



  /**
   * Disable weekends and busy Dates in Datepicker
   */
  myDatesFilter = (d: Date): boolean => {
  if(d==null){
    const day = new Date().getDay();
    return !this.myBusyDates && day !== 6 && day !== 5 ;
  } else{
    const time=d.getTime();
    const day = d.getDay();
    return !this.myBusyDates.find(x=>x.getTime()==time) && day !== 6 && day !== 5}
  }
}
