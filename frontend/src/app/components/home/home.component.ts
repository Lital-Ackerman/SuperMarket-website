import { AfterContentInit, AfterViewInit, Component, OnInit } from '@angular/core';
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
    // this.router.navigate([{outlets:{primary: ['main'], leftBar: ['login'] }}]);

  }
}
