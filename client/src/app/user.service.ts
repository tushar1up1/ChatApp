import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { Message } from './models/Message';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url:string;
  constructor(private http:HttpClient,private injector:Injector) {
       this.url = injector.get("BASE_URL");
   }

  getDate()
  {
    return this.http.get<string>(`${this.url}/api/getDate`,{withCredentials: true}).pipe(
      map( (res: string) => {
         return res;
      },
      catchError(this.handleError)
    ));
  }

  getUsersById(usersId): Observable<any>{

    return this.http.post<any>(`${this.url}/api/getUsers`,usersId,{withCredentials: true}).pipe(
      map( (res: any) => {
         return res;
      },
      catchError(this.handleError)
    ));
  }

  getUserMessage(fromId:string,toId:string) : Observable<Message[]>
  {
     return this.http.post<any>(`${this.url}/api/getMessages`,{fromId,toId},{withCredentials:true}).pipe(
        map( (res:Message[]) => {
           return res;
        }) 
     )
  }


  handleError(error)
  {
      let errorMessage = `Error : ${error.error.message}`;
      window.alert(errorMessage);
      return throwError(errorMessage);
  }
}
