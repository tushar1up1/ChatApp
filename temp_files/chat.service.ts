import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  users = this.socket.fromEvent<string[]>('users');
  constructor(private socket:Socket) { }

  addUser = (user:any) => {
    this.socket.emit('adduser',user);
  }

}
