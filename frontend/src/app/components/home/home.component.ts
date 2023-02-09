import { Location } from '@angular/common';
import { literalMap } from '@angular/compiler';
import { AfterContentInit, AfterViewInit, Component, ElementRef, HostListener, ModuleWithComponentFactories, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(
    private router:Router,
    private location:Location,
    private usersService:UsersService,

    ){}
  @ViewChild ('leftBar') leftBar:ElementRef;
  @ViewChild ('mainBar') mainBar:ElementRef;
  @ViewChild ('main') main:ElementRef;
  isResizing:boolean;
  lastDownX:number=0;
  isMinimize:boolean=false;
  cartProducts:boolean=false;
  isAdmin:boolean;


  ngOnInit(): void {
    // this.router.navigate([{outlets:{primary: ['products'], leftBar: ['cart'] }}]);
    this.router.navigate([{outlets:{primary: ['main'], leftBar: ['login'] }}]);
    // this.router.url
    this.location.onUrlChange((url)=>{
      this.cartProducts=
          url=='http://localhost:4200/products(leftBar:cart)' ? true : false ;
    })


  this.usersService.userEmitter.subscribe(
    (value)=>{
      this.isAdmin= value.role==1 ?true : false;
    }
  )

  }

rangeClick:boolean;
  @HostListener('document:mouseup')
  onMouseUp(){
    console.log('up');
    this.isResizing=false;
    this.rangeClick= false
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event:MouseEvent){
    this.lastDownX= this.leftBar.nativeElement.offsetWidth;
    if(this.lastDownX+10 > event.clientX && this.lastDownX-10 < event.clientX && this.cartProducts){
      this.leftBar.nativeElement.style.cursor= 'col-resize';
      this.mainBar.nativeElement.style.cursor= 'col-resize';
    }else{
      this.leftBar.nativeElement.style.cursor= 'auto';
      this.mainBar.nativeElement.style.cursor= 'auto';
    }


    if(this.isResizing && this.rangeClick) {
    const delta= event.clientX-this.lastDownX;
    this.leftBar.nativeElement.style.width= (this.leftBar.nativeElement.offsetWidth + delta)+ 'px';
    this.mainBar.nativeElement.style.width= (this.mainBar.nativeElement.offsetWidth - delta)+ 'px';
    this.lastDownX= event.clientX
    }
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event:MouseEvent){
    console.log(this.router.url)
    // if(this.router.url=="/products(leftBar:cart)"){
    //   console.log("yes")
    console.log(window.innerWidth)

    if(this.lastDownX+10 > event.clientX && this.lastDownX-10 < event.clientX && this.cartProducts ) {
    this.rangeClick= true;
    this.isResizing= true;
    console.log('down');
    console.log(event.clientX);
    this.lastDownX= event.clientX;
    }
    // }
  }

  minimize(){
    console.log("minimizer")
    console.log(this.leftBar)
    // this.leftBar.nativeElement.style.gridColumn='span 4';
    // this.leftBar.nativeElement.style.display='initial';
    // this.mainBar.nativeElement.style.gridColumn= 'span 8';

    this.leftBar.nativeElement.style.gridColumn='span 0';
    this.leftBar.nativeElement.style.display='none';
    this.mainBar.nativeElement.style.gridColumn= 'span 12'
    this.isMinimize= true
  }

  maximize(){
    console.log(this.leftBar)
    this.leftBar.nativeElement.style.gridColumn='span 4';
    this.leftBar.nativeElement.style.display='initial';
    this.mainBar.nativeElement.style.gridColumn= 'span 8';

    this.isMinimize= false
  }
}
