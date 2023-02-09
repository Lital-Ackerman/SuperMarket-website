import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-pop-message',
  templateUrl: './pop-message.component.html',
  styleUrls: ['./pop-message.component.css']
})
export class PopMessageComponent implements OnInit{
  constructor(
    @Inject(MAT_DIALOG_DATA) public message:any
  ){}

  displayText:string;

  ngOnInit(): void {
    if(this.message=='Invalid Token'){
      this.displayText= `
      Your Login Session has expired.
      Please Login Again`
    }
  }

}
