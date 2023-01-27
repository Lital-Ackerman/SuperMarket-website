import { Component, OnInit } from '@angular/core';
import { ConvertDatePipe } from 'src/app/convert-date.pipe';
import { convertDate } from 'src/app/methods/methods';
import { CartsService } from 'src/app/services/carts.service';
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
  orderStatus:string= "Welcome Guest!";

  constructor(
    private ordersService: OrdersService,
    private productsService: ProductsService,
    private usersService: UsersService,
    private cartsService: CartsService
    ){}

  ngOnInit():void{
      this.ordersService.getAmountOfOrders()
        .subscribe({
          next: (value:any) => {this.orderInfo=`${value.quantity} orders were made until now!`},
          error: (error) => {console.log(error)},
          // complete: () => {console.info('complete Info')}
  })

      this.productsService.getAmountOfProducts()
      .subscribe({
        next: (value:any) => {this.productsInfo=`${value.quantity} products are availabe in our store!`},
        error: (error) => {console.log(error)},
        // complete: () => {console.info('complete Info')}
      })

      this.cartsService.statusEmitter.subscribe(
        ({value, firstName})=>{
          console.log({value, firstName})
          firstName= firstName.toUpperCase()
          switch (value.resType) {
            case 1:
              this.orderStatus= `You Have open cart from ${convertDate(value.data.cartDate)}. Total Order: ${value.data.total}`;
              break;
            case 2:
              this.orderStatus= `Your Last purchase was on ${convertDate(value.data.orderDate)}`;
              break;
            case 3:
              this.orderStatus= `Welcome ${firstName} to your first purchase!`;
          }
        console.log(value)}
      )

    }

  }


