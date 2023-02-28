import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PopMessageComponent } from '../components/pop-message/pop-message.component';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  constructor(
    private matDialog: MatDialog,
    private _snackBar: MatSnackBar
  ) { }

/**
 *Convert Date to a prettier format.
 * @param date
 * @returns {string} date is converted to another format of date.
 */
  convertDate(date: string): string {
    let dt= new Date(date).toLocaleString('en-GB').substring(0,10);
    return dt;
  }


  /**
   * Display message as a pop-up dialog
   */
  popThisMessage(message:string):void{
    this.matDialog.open(PopMessageComponent, {
      disableClose: true,
      "width": '300px',
      "maxHeight": '90vh',
      "data": message,
      "autoFocus": false
    })
   }

   
   /**
    * Display Snack bar in the bottom of the browser
    * @param info the text message
    */
  openSnackBar(info:any){
    this._snackBar.open(info, 'OK',{
      data: info,
      duration: 5000
    })
}
}
