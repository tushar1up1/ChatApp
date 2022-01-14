import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, catchError} from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http:HttpClient,private _cookieService:CookieService) { }
  
  registerUser(user: any) : Observable<any>
  {
      return this.http.post<any>('http://localhost:3000/api/register',user).pipe(
        map( (res) => {
           this._cookieService.set('connect.sid',res.sId);
           return res;
        },
        catchError(this.handleError)
      ));
  }

  getListOfUsers()
  {
    return this.http.get<any>(`http://localhost:3000/api/users`).pipe(
      map( (res) => {
         return res;
      },
      catchError(this.handleError)
    ));
  }

  handleError(error)
  {
      let errorMessage = `Error : ${error.error.message}`;
      console.log(error);
      window.alert(errorMessage);
      return throwError(errorMessage);
  }

}
