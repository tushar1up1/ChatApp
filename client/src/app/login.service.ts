import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, catchError} from 'rxjs/operators';
import { Observable, throwError, Subject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { User } from './models/User';

export class LoginService {

  url:string;
  constructor(private http:HttpClient,private _cookieService:CookieService,private injector:Injector) {
        this.url = injector.get("BASE_URL");
   }
  
  userStatus:Subject<String> = new Subject<String>();

  registerUser(user: any) : Observable<User>
  {
      return this.http.post<any>(`${this.url}/api/register`,user,{withCredentials: true}).pipe(
        map( (res: User) => {
           return res;
        },
        catchError(this.handleError)
      ));
  }

  checkIfUserLoggedIn() : Observable<string>
  {
      return this.http.get(`${this.url}/api/checkUserLogged`,{withCredentials: true}).pipe(
         map( (res:any) => {

            this.userStatus.next(res._id);
            return res._id;
         }),
         catchError(this.handleError)
      );
  }

  loginUser(user: User) : Observable<User>
  {
       return this.http.post<User>(`${this.url}/api/login`,user,{withCredentials: true}).pipe(
        map( (res: User) => {
          this.userStatus.next(res._id);
          return res;
       },
       catchError(this.handleError)
       ));
  }

  logoutUser(): Observable<any>
  {
    return this.http.get<User>(`${this.url}/api/logout`,{withCredentials: true}).pipe(
      map( (res: any) => {
        return res;
     },
     catchError(this.handleError)
     )); 
  }

  getListOfUsers()
  {
    return this.http.get<any>(`http://localhost:3000/api/users`,{withCredentials: true}).pipe(
      map( (res) => {
         return res;
      },
      catchError(this.handleError)
    ));
  }

  handleError(error)
  {
      let errorMessage = `Error : ${error.error.message}`;
      window.alert(errorMessage);
      return throwError(errorMessage);
  }

}
