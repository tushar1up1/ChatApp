import { Component, AfterContentInit, OnInit, OnDestroy } from '@angular/core';
import { LoginService } from './login.service';
import { User } from './models/User';
import { ChatService } from './chat.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,OnDestroy{
  
   user:string;
   loggedOutService;
   constructor(private loginServie: LoginService,
               private chatService:ChatService,
               private loginService:LoginService,
               private route:Router
               )
   {
      this.loginServie.userStatus.subscribe( (_id:string) => {
        this.user = _id;
      });
   }

   ngOnInit(){
          this.loggedOutService = this.chatService.logoutUsers.subscribe( (_id:string) => {
              if(this.user == _id)
              {
                  this.logout();             
              }
          });
   }

   ngOnDestroy()
   {
        this.loggedOutService.unsubscribe();
   }

   logout()
   {
       this.chatService.removeUser(this.user);
       this.chatService.addUser(undefined);
       this.loginService.logoutUser().subscribe( () => {
            this.route.navigate(['']);
       });
   }
}
