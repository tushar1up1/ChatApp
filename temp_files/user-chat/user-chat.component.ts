import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-user-chat',
  templateUrl: './user-chat.component.html',
  styleUrls: ['./user-chat.component.css']
})
export class UserChatComponent implements OnInit {

  users: Object[];
  constructor(private router: ActivatedRoute,private chatService:ChatService) {
      
  }

  ngOnInit(): void {
    
    this.chatService.users.subscribe((userArr) => {
        this.users = userArr;
    });

    this.router.queryParams.subscribe((params) => {
        let userName = params['userName'];
        let password = params['password'];
        this.chatService.addUser({userName,password});
    });
  }

}
