import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(){}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const userToken = localStorage.getItem("userToken");
        console.log(userToken)

        if (userToken && !req.url.includes('public')) {
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