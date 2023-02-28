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
  constructor(private http: HttpClient) { }
  userEmitter= new EventEmitter<User>();

  BASE_URL= environment.usersBaseUrl;
  myUser:User;



/**
 *Check if user token is still valid
 * @param lastUserToken
 * @returns {user} user details or error message if token is invalid.
 */
isTokenValid(lastUserToken:string): Observable<any>{
    return this.http.post<any>(`${this.BASE_URL}/public/autoLogin`, {lastUserToken})
    .pipe(tap((value)=>{
      if(value.message!= "Invalid Token") {
        this.myUser= value;
        this.userEmitter.emit(value)
      }
    }))
}

/**
 *Login process, emits event in order to display the user name in the header component (at the top navbar)
 * @param userInfo username and password
 * @returns user logged details
 */
  isLogged(userInfo:Credentials): Observable<User>{
    return this.http.post<User>(`${this.BASE_URL}/public/login`, userInfo)
    .pipe(tap((value)=>{
      this.myUser= value;
      this.userEmitter.emit(value)
    }))
  }


/**
 *Check id Id already exist in DB during registration.
 * @param userId
 * @returns empty array/ array with user that has tha same ID
 */
  isIdExist(userId:number):Observable<User[]>{
    return this.http.get<User[]>(`${this.BASE_URL}/public/idValidation/${userId}`);
  }


  /**
   *Check if usrname alreadt exist in DB during registration.
   * @param username
   * @returns empty array/ array with user that has tha same username
   */
    isUsernameExist(username:string):Observable<User[]|undefined>{
      return this.http.get<User[]|undefined>(`${this.BASE_URL}/public/usernameValidation/${username}`);
    }


  /**
   *Add new user
   * @param userInfo
   * @returns result of request
   */
    getRegister(userInfo:User):Observable<User>{
      return this.http.post<User>(`${this.BASE_URL}/public/register`, userInfo);
    }

  }




