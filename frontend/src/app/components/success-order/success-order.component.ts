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


@Component({
  selector: 'app-success-order',
  templateUrl: './success-order.component.html',
  styleUrls: ['./success-order.component.css']
})
export class SuccessOrderComponent{
  // customerOrder= this.cartsService.cartContent;

  constructor(
    @Inject(MAT_DIALOG_DATA) public orderInfo:any,
    private cartsService: CartsService,
    private userService: UsersService,
    private ordersService: OrdersService
    // private dialogRef:MatDialogRef<>
    ){}

    index=1
    itemsData= this.cartsService.cartContent.map((item:any)=>[
                this.index++,
                `${item.productName}                                        `,
                item.price,
                item.quantity,
                item.totalPerProduct
              ])

    // additionalR= [{col1: 'Total', col2: '100', col3: 'ALL'}, {col1: 'vat', col2: '17', col3: '%'}]

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
          website: "www.superMario.com",
      },
      contact: {
          label: "For:",
          name: `${this.userService.myUser.firstName} ${this.userService.myUser.lastName}`,
          address: `${this.userService.myUser.city}, ${this.userService.myUser.street}`,
          email: `${this.userService.myUser.username}`,
      },
      invoice: {
          label: "Cart #: ",
          num: +`${this.cartsService.cartId}`,
          invDate: `Order Date: ${new Date()}`,
          invGenDate: `Shipping Date: ${this.ordersService.myOrder.shipDate}`,
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
          // additionalRows: this.additionalR,
          // additionalRows: [{
          //     col1: 'Total:',
          //     col2: '100',
          //     col3: 'ALL',
          //     style: {
          //         fontSize: 14 //optional, default 12
          //     }
          // },
          // {
          //     col1: 'VAT:',
          //     col2: '17',
          //     col3: '%',
          //     style: {
          //         fontSize: 10 //optional, default 12
          //     }
          // }],
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
    // console.log(this.cartsService.cartContent)
    // let receiptList= this.cartsService.cartContent;
    // receiptList= receiptList.map((item:any) => {
    //   [item.productName, item.quantity, item.totalPerProduct]
    // })
    // console.log(receiptList)
    // const doc= new jsPDF();

    // let bodyData= [];
    // for (let i = 0; i < receiptList.length; i++) {
    //   bodyData.push([receiptList[i].productName, receiptList[i].quantity, receiptList[i].totalPerProduct]);
    // }
    // console.log(bodyData)

    // let imgData= 'data;:image/jpeg;base64', '+Base64.encode('')';
    // doc.addImage(imgData, 'JPEG', 15, 40, 180, 160)
    // autoTable(doc, {html: 'this.myTable'})
    // doc.text('Reciept From SuperMario', 10, 10);
    // autoTable(doc,{
    //   head:[['Product','Price', 'Quantity', 'Total']],
    //   body:bodyData    })
    // doc.text('Reciept From SuperMario', 10, 20 );
    // // doc.addImage(HTMLImageElement, 'JPEG', 2, 2, )

    // doc.save("myReceipt_SuperMario.pdf");

    jsPDFInvoiceTemplate(this.props)
   }
}

