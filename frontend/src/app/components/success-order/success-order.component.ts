import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import User from 'src/app/models/user';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
// import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'
// import jsPDFInvoiceTemplate from "jspdf-invoice-template";
import jsPDFInvoiceTemplate, { OutputType, jsPDF } from "jspdf-invoice-template";

import { ProductsService } from 'src/app/services/products.service';
import { itemsService } from 'src/app/services/items.service';
import { Item } from 'src/app/models/item';
import { CartsService } from 'src/app/services/carts.service';
import { UsersService } from 'src/app/services/users.service';
import { OrdersService } from 'src/app/services/orders.service';
import { Order } from 'src/app/models/order';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-success-order',
  templateUrl: './success-order.component.html',
  styleUrls: ['./success-order.component.css']
})
export class SuccessOrderComponent{

  constructor(
    @Inject(MAT_DIALOG_DATA) public orderInfo:any,
    private cartsService: CartsService,
    private userService: UsersService,
    private ordersService: OrdersService,
    private datePipe: DatePipe,
    private router: Router
    ){}

    index=1
    itemsData= this.cartsService.cartContent.map((item:any)=>[
                this.index++,
                `${item.productName}                                        `,
                item.price,
                item.quantity,
                item.totalPerProduct
              ])


    props = {
      outputType: OutputType.Save,
      returnJsPDFDocObject: true,
      fileName: "YourReciept_SuperMario",
      orientationLandscape: false,
      compress: true,
      logo: {
          src: "../../../assets/superMarioLogo.png",
          type: 'PNG', //optional, when src= data:uri (nodejs case)
          width: 30, //aspect ratio = width/height
          height: 26.66,
          margin: {
              top: 0, //negative or positive num, from the current position
              left: 0 //negative or positive num, from the current position
          }
      },
      stamp: {
          inAllPages: true, //by default = false, just in the last page
          src: "https://raw.githubusercontent.com/edisonneza/jspdf-invoice-template/demo/images/qr_code.jpg",
          type: 'JPG', //optional, when src= data:uri (nodejs case)
          width: 20, //aspect ratio = width/height
          height: 20,
          margin: {
              top: 0, //negative or positive num, from the current position
              left: 0 //negative or positive num, from the current position
          }
      },
      business: {
          name: "Super Mario",
          address: "Jaffa St, Jerusalem",
          phone: "053-7389200",
          email: "superMario@gmail.com",
          email_1: "www.superMario.com",
          website: ''
      },
      contact: {
          label: "For:",
          name: `${this.userService.myUser.firstName} ${this.userService.myUser.lastName}`,
          address: `${this.userService.myUser.city}, ${this.userService.myUser.street}`,
          phone: `${this.userService.myUser.username}`,
      },
      invoice: {
          label: "Cart #: ",
          num: +`${this.cartsService.cartId}`,
          invDate: `Order Date: ${this.datePipe.transform(new Date(), 'dd/MM/yyyy')}`,
          invGenDate: `Shipping Date: ${this.datePipe.transform(this.ordersService.myOrder.shipDate, 'dd/MM/yyyy')}`,
          headerBorder: false,
          tableBodyBorder: false,
          header: [
            {
              title: "#",
              style: {
                width: 10
              }
            },
            {
              title: "Product",
              style: {
                width: 30
              }
            },
            { title: "Price"},
            { title: "Quantity"},
            { title: "Total"}
          ],
          table: this.itemsData,
          invDescLabel: `Total:  ${this.ordersService.myOrder.orderSum} NIS`,
          invDesc: `Thank you for shopping in Super Mario!`
      },
      footer: {
          text: "The invoice is created on a computer and is valid without the signature and stamp.",
      },
      pageEnable: true,
      pageLabel: "Page "
  };


  downloadReceipt(){
    jsPDFInvoiceTemplate(this.props)
   }

   goHome(){
    // this.router.navigate([{outlets:{primary: ['main'], leftBar: ['login']}}], {state:{isJustFinishedShop: true}});
    location.reload()

   }
}

