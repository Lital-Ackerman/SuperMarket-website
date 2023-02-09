import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Observable } from "rxjs";
import { PopMessageComponent } from "../components/pop-message/pop-message.component";
import { UsersService } from "../services/users.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(
      private usersService: UsersService,
      private matDialog: MatDialog
    ){}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const userToken = localStorage.getItem("userToken");
        console.log(userToken)

        if (userToken && !req.url.includes('public')) {

          // this.usersService.isValidToken({status:'authorizedReq', token:userToken})
          //   .subscribe({
          //     next:(value)=>{
          //       console.log(value);
          //       if(value.message== "Invalid Token"){
          //         this.matDialog.open(PopMessageComponent, {
          //           "width": '300px',
          //           "maxHeight": '90vh',
          //           "data": value.message,
          //           "autoFocus": false
          //     })}
          //     },
          //     error:(err)=>{console.log(err);}
          //   })

            const cloned = req.clone({
                headers: req.headers.set("authorization",
                    "Bearer " + userToken)
            });

            return next.handle(cloned);
        }
        else {
            return next.handle(req);
        }
    }


}
