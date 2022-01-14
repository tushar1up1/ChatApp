import { Component, OnInit, OnDestroy, Input, OnChanges, ViewChild, AfterViewChecked,ElementRef} from '@angular/core';
import { ChatService } from '../chat.service';
import {Message} from '../models/Message';
import { UserService } from '../user.service';
import { User } from '../models/User';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import * as moment from 'moment-timezone';
import * as Moment from 'moment';

@Component({
  selector: 'app-user-chat',
  templateUrl: './user-chat.component.html',
  styleUrls: ['./user-chat.component.css']
})
export class UserChatComponent implements OnInit,OnDestroy,OnChanges,AfterViewChecked  {

  @Input('users') 
  users: User[] = [];
  @Input('currentUserId')
  fromId: string;
  toId: string;
  message: string;
  messageService;
  messages: Message[] = [];
  isScrolled: boolean = false;
  @ViewChild('messagesContainer',{static:false}) 
  private chatContainer: CdkVirtualScrollViewport;
  constructor(private chatService:ChatService,private userService: UserService) {
      
  }

  ngOnInit(): void {
       this.chatService.listentMsg(this.fromId)
       this.messageService = this.chatService.messages.subscribe( (message:Message) => {
           let fromId = message.fromId;
           if(message.typing)
           {
                this.users.map( (user:User) => {
                     if(user._id == fromId)
                     {
                         if(message.typing === "true")
                               user.isTyping = true;
                         else if(message.typing === "false")
                               user.isTyping = false;
                         return;
                     }
                });
           }
           else if(this.toId === fromId && !message.typing)
           {
              this.isScrolled = false;
              this.addNewMessage(message);
           }
           else
           {
              this.users.map( (user:User) => {
                 if(user._id === fromId)
                 {
                     user.newMessage = true;
                     user.countMessage = user.countMessage ? user.countMessage : 0;
                     user.countMessage = user.countMessage + 1;
                     return;
                 }
              });
           }
      });
  }

  ngOnChanges(): void{
       if(this.users && this.users.length > 0)
       {
          this.onUserClicked(this.users[0]);
       }
       else
       {
          this.toId = "";
          this.emptyMessages();
       }
  }

  ngOnDestroy() : void{
       this.messageService.unsubscribe();
  }

  ngAfterViewChecked() :void{
       if(!this.isScrolled)
              this.scrollToBottom();
  }

  scrolling(): void
  {
       setTimeout(() => { this.isScrolled = true;},2000);
  }

  resetMessageCount(fromId:string) : void
  {
        this.users.map( (user:User) => {
          if(user._id === fromId)
          {
              user.countMessage = 0;
              return;
          }
      });
  }

  emptyMessages()
  {
     while(this.messages.length > 0)
     {
        this.messages.pop();
     }
  }

  sortCompare(a:Message,b:Message)
  {
      let dateA = Moment(a.timeStamp).format();
      let dateB = Moment(b.timeStamp).format();
      if(dateA > dateB)
      {
        return 1;
      }
      else
      {
        return -1;
      }
  }

  addNewMessage(message:Message)
  {
    let messages = [message].concat(this.messages);
    this.sortMessages(messages);
  }

  convertToBrowserTimeZone(messages:Message[])
  {
        let defaultTz = "Asia/Kolkata";
        let timeZone = "Asia/Kolkata";
        if(moment.tz.guess())
        {
           timeZone = moment.tz.guess();
        }
        messages.map( (message: Message) => {
            let timeStamp = message.timeStamp;
            let mTimeStamp = Moment(timeStamp,"MM/DD/YYYY, hh:mm:ss a").format("YYYY-MM-DD HH:mm:ss");
            let defaultMTz    = moment.tz(mTimeStamp, defaultTz);
            let localTimeStamp =   defaultMTz.clone().tz(timeZone);
            let formattedTimeStamp = localTimeStamp.format("MM/DD/YYYY, hh:mm:ss a");
            message.timeStamp = formattedTimeStamp;
        });
  }

  sortMessages(messages:Message[])
  {
      this.convertToBrowserTimeZone(messages);
      let messagesArr = messages.sort(this.sortCompare);
      this.isScrolled = false;
      this.messages = messagesArr;
  }

  onUserClicked(user:User)
  {
      user.newMessage = false;
      this.emptyMessages();
      this.resetMessageCount(user._id);
      this.userService.getUserMessage(this.fromId,user._id).subscribe( (messages:Message[]) => {
            this.sortMessages(messages);       
      });
      this.toId = user._id;
  }

  scrollToBottom()
  {
    try {
      this.chatContainer.scrollTo({bottom:0});
    //  this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
  } catch(err) {
      
   }    
  }

  sendMsg()
  {
      let message = new Message(this.fromId,this.toId,this.message);
      this.userService.getDate().subscribe( (date:string) => {
            message.timeStamp = date;
            this.chatService.sendMessage(JSON.parse(JSON.stringify(message)));
            this.addNewMessage(message);
            this.message = "";

      });     
  }

  typingMsg(event)
  {
      let code = event.keyCode;
      let lMsg = this.message;
      setTimeout( () => {
          let message = new Message(this.fromId,this.toId);
          if(lMsg == this.message || code == 13)
          {
              message.typing = "false";
          }
          else
          {
              message.typing = "true";
          }
          this.chatService.sendTyping(message);
      },300);
  }
  
  isActive(user)
  {
     if(this.toId == user._id)
     {
        return true;
     }
     return false;
  }

  isFromMsg(message:Message)
  {
     if(this.fromId == message.fromId)
     {
         return true;
     }
     return false;
  }

  isToMsg(message:Message)
  {
      if(this.toId == message.fromId)
      {
          return true;
      }
      return false;
  }


}
