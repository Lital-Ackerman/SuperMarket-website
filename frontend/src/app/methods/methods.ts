import { MatDialog } from "@angular/material/dialog";
import { PopMessageComponent } from "../components/pop-message/pop-message.component";

export const convertDate=(date: string): string=> {
    let dt= new Date(date).toLocaleString('en-GB').substring(0,10);
    return dt;
  }


  // export const popThisMessage=(message:string):void=>{
  //   const matDialog:MatDialog= new MatDialog()
  //        matDialog.open(PopMessageComponent, {
  //          "width": '300px',
  //          "maxHeight": '90vh',
  //          "data": message,
  //          "autoFocus": false
  //        })
  //       }
     // if(value.message== "Invalid Token"){

          //   this.matDialog.open(PopMessageComponent, {
          //     "width": '300px',
          //     "maxHeight": '90vh',
          //     "data": value.message,
          //     "autoFocus": false
          //   })

          // }
