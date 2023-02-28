import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-pop-message',
  templateUrl: './pop-message.component.html',
  styleUrls: ['./pop-message.component.css']
})
export class PopMessageComponent{
  constructor(
    @Inject(MAT_DIALOG_DATA) public message:any
  ){}


  refresh(){
    if(this.message=='Your login session has expired')
    location.reload();
  }

}
