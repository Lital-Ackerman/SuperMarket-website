import { Location } from '@angular/common';
import { literalMap } from '@angular/compiler';
import { AfterContentInit, AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
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
    ){ }

  @ViewChild ('leftBar') leftBar:ElementRef;
  @ViewChild ('mainBar') mainBar:ElementRef;
  @ViewChild ('main') main:ElementRef;
  isResizing:boolean;
  lastDownX:number=0;
  isMinimize:boolean=false;
  cartProducts:boolean=false;
  isAdmin:boolean;
  rangeClick:boolean;


  /**
   * Navigates to home page.
   * If products component isn't display - components width will be back to it's inital width.
   */
  ngOnInit(): void {
    this.router.navigate([{outlets:{primary: ['main'], leftBar: ['login'] }}]);
    this.location.onUrlChange((url)=>{
      this.cartProducts= url.includes('products') ? true : false ;

      if(this.cartProducts==false){
            this.leftBar.nativeElement.style.width='100%';
            this.mainBar.nativeElement.style.width= '100%';
      }
    })


  /**
   * Setting 'isAdmin' variable according to the user rile
   */
  this.usersService.userEmitter.subscribe(
    (value)=>{
      this.isAdmin= value.role==1 ?true : false;
    })
  }


  /**
   * When releasing mouse click- reset variables accordingly
   */
  @HostListener('document:mouseup')
  onMouseUp(){
    this.isResizing=false;
    this.rangeClick= false
  }


  /**
   * Enables components to change width according to the pointer and the relevant variables
   */
  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event:MouseEvent){
    this.lastDownX= this.leftBar.nativeElement.offsetWidth;
    if(this.lastDownX+10 > event.clientX && this.lastDownX-10 < event.clientX && this.cartProducts && !this.isAdmin){
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


  /**
   * When clicking mouse- changes variables accordingly
   * @param event 
   */
  @HostListener('mousedown', ['$event'])
  onMouseDown(event:MouseEvent){
    if(this.lastDownX+10 > event.clientX && this.lastDownX-10 < event.clientX && this.cartProducts && !this.isAdmin ) {
    this.rangeClick= true;
    this.isResizing= true;
    this.lastDownX= event.clientX;
    }
  }


  /**
   * Minimize cart component
   */
  minimize(){
    this.leftBar.nativeElement.style.gridColumn='span 0';
    this.leftBar.nativeElement.style.display='none';
    this.mainBar.nativeElement.style.gridColumn= 'span 12'
    this.mainBar.nativeElement.style.width= '100%'
    this.isMinimize= true
  }

/**
 * Maximize cart component
 */
  maximize(){
    this.leftBar.nativeElement.style.gridColumn='span 4';
    this.leftBar.nativeElement.style.display='initial';
    this.mainBar.nativeElement.style.gridColumn= 'span 8';
    this.isMinimize= false
  }
}
