import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit{
constructor(private router:Router){}

  ngOnInit(): void {
    console.log("first")
    // this.router.navigate([{outlets:{signBar: 'login' }}])
    // this.router.navigate([{outlets:{signBar: 'login' }}])
    // this.router.navigateByUrl("/home/login")
  }
}
