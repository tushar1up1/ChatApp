import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../login.service';
import { ChatService } from '../chat.service';
import { UserService } from '../user.service';
import { flatMap, debounceTime } from 'rxjs/operators';
import { User } from '../models/User';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit,OnDestroy {
  
  users: User[] = [];
  colors:string[] = ["#FF6F61","#6B5B95","#955251","#009B77","#D65076","#5B5EA6"];
  usersChatService;
  currentUserId:string;
  constructor(private loginServcie:LoginService,
              private chatService:ChatService,
              private router:ActivatedRoute,
              private usersService:UserService
              )
  {
        this.router.params.subscribe( (params) => {
            this.currentUserId = params['_id'];
            this.loginServcie.userStatus.next(this.currentUserId);
            this.chatService.addUser(params['_id']);  
        });   
  }

  ngOnInit(): void {

      this.usersChatService = this.chatService.users.pipe(
          debounceTime(100),
          flatMap( (userIdArr) =>  { return this.usersService.getUsersById(userIdArr)})
      ).subscribe( (res: User[]) => {

          res = res.map( (user:User) => {
               user.color = this.getImageColor(user);
               return user;
          });
          this.users = res.filter( (user:User) => {
              if(user._id == this.currentUserId) return false;
              return true;
          });
      });
  }

  getImageColor(user:User)
  {
     let charCode = user._id.charCodeAt(user._id.length-1) + user._id.charCodeAt(user._id.length-2);
     let colorNumber = charCode % this.colors.length;
     return this.colors[colorNumber];
  }

  ngOnDestroy()
  {
      this.usersChatService.unsubscribe();
  }
}
