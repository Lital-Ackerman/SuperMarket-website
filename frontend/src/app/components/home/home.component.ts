import { literalMap } from '@angular/compiler';
import { AfterContentInit, AfterViewInit, Component, ModuleWithComponentFactories, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterContentInit {
  constructor(private router:Router){}

  ngOnInit(): void {
    // this.router.navigate([{outlets:{primary: ['products'], leftBar: ['cart'] }}]);
    this.router.navigate([{outlets:{primary: ['main'], leftBar: ['login'] }}]);
  }

  ngAfterContentInit(){
    let index=1;
    let my= [{name: 'lital', age: 36}, {name: 'moti', age: 37}]
    let y= my.map((item)=>[index++, item.name, item. age])
    // this.router.navigate([{outlets:{primary: ['main'], leftBar: ['login'] }}]);
    // let y=Array.from(Array(my.length), (my, index)=>([
    //   index + 1,
    //   my
      // item[0],
      // item[1],
      // item[2],
      // item[3]
  // ]))

  console.log(y)

  }
}
