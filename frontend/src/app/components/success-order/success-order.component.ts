import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import jsPDFInvoiceTemplate,   { OutputType } from "jspdf-invoice-template";
import { jsPDF } from 'jspdf-invoice-template';
import { CartsService } from 'src/app/services/carts.service';
import { UsersService } from 'src/app/services/users.service';
import { OrdersService } from 'src/app/services/orders.service';
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
    
    progBar=false;
    index=1;

    //Reciept Settings

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
          type: 'PNG', 
          width: 30, 
          height: 26.66,
          margin: {
              top: 0, 
              left: 0 
          }
      },
      stamp: {
          inAllPages: true, 
          src: "https://raw.githubusercontent.com/edisonneza/jspdf-invoice-template/demo/images/qr_code.jpg",
          type: 'JPG', 
          width: 20, 
          height: 20,
          margin: {
              top: 0, 
              left: 0 
          }
      },
      business: {
          name: "Super Mario",
          address: "Agudat Sport HapPo'el 2, Jerusalem",
          phone: "1800-56-56-56",
          email: "superMario@gmail.com",
          email_1: "www.supermario.com",
          website: ''
      },
      contact: {
          label: "For:",
          name: `${this.userService.myUser.firstName} ${this.userService.myUser.lastName}`,
          address: `${this.userService.myUser.city}, ${this.userService.myUser.street}`,
          phone: `${this.userService.myUser.username}`

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


/**
 * Download receipt when user click on the link
 * Display progress bar for 3 seconds.
 */
  downloadReceipt(){
    jsPDFInvoiceTemplate(this.props)
    this.progBar=true;
    setTimeout(() => {
      this.progBar=false
    }, 3000);
   }


   /**
    * Reload app back to home page
    */
   goHome(){
    location.reload()
   }

}

