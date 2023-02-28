import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CartsService } from 'src/app/services/carts.service';
import { GlobalService } from 'src/app/services/global.service';
import { OrdersService } from 'src/app/services/orders.service';
import { ProductsService } from 'src/app/services/products.service';
import { UsersService } from 'src/app/services/users.service';


@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  orderInfo:string | number;
  productsInfo:string | number;
  orderStatus:string="Let's Start Your Shopping!";
  @ViewChild('dinamnicMessage') dinamnicMessage:ElementRef;

  constructor(
    private ordersService: OrdersService,
    private productsService: ProductsService,
    private usersService: UsersService,
    private cartsService: CartsService,
    private globalService: GlobalService,
    ){}

  ngOnInit():void{
    if(this.usersService.myUser)
      this.orderStatus= `Welcome ${this.usersService.myUser.firstName}`;


    /**
     * Get information about amount of orders.
     */
      this.ordersService.getAmountOfOrders()
        .subscribe({
          next: (value:any) => {this.orderInfo=`${value.quantity} orders were made until now!`},
          error: (err) => {
            this.orderInfo= err.error.message;
            err.status=='403'
            ? this.globalService.popThisMessage(err.error.message)
            :this.globalService.openSnackBar(err.error.message)
          },
          })


      /**
       * Get information about amount of products in the store.
       */
      this.productsService.getAmountOfProducts()
      .subscribe({
        next: (value:any) => {
          this.productsInfo=`${value.quantity} products are availabe in our store!`
        },
        error: (err) => {
        this.productsInfo= err.error.message
        err.status=='403'
        ? this.globalService.popThisMessage(err.error.message)
        :this.globalService.openSnackBar(err.error.message)
      }})


      /**
       *Get information about last purchase/open cart.
       */
      this.cartsService.statusEmitter.subscribe(
        ({value, firstName})=>{
          firstName= firstName.toUpperCase()
          switch (value.resType) {
            case 1:
              this.dinamnicMessage.nativeElement.innerHTML= `
              <i class="bi bi-person-vcard"></i>
              You Have open cart from ${this.globalService.convertDate(value.data.cartDate)}.<br/>
              Total Order: ${value.data.total} NIS`;
              break;
            case 2:
              this.orderStatus= `Your Last purchase was on ${this.globalService.convertDate(value.data.orderDate)}`;
              break;
            case 3:
              this.orderStatus= `Welcome ${firstName} to your first purchase!`;
          }})
    }




  }


