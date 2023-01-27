import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environment/environment';
import { AuthInterceptor } from '../methods/auth.interceptor';
import { Credentials } from '../models/credentials';
import User from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

BASE_URL= environment.usersBaseUrl;
myUser:User;

constructor(private http: HttpClient) { }
userEmitter= new EventEmitter<User>();


  isLogged(userInfo:Credentials): Observable<User>{
    return this.http.post<User>(`${this.BASE_URL}/public/login`, userInfo)
    .pipe(tap((value)=>{
      console.log(value)
      this.myUser= value;
      this.userEmitter.emit(value)
      console.log(this.myUser)
    }))
  }



    isIdExist(userId:number):Observable<User[]|undefined>{
      return this.http.get<User[]|undefined>(`${this.BASE_URL}/public/idValidation/${userId}`);
    }

    isUsernameExist(username:string):Observable<User[]|undefined>{
      return this.http.get<User[]|undefined>(`${this.BASE_URL}/public/usernameValidation/${username}`);
    }

    getRegister(userInfo:User):Observable<User>{
      return this.http.post<User>(`${this.BASE_URL}/public/register`, userInfo);
    }

  }




