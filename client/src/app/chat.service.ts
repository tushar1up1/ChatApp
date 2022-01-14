import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Message } from './models/Message';

export class ChatService {

  users = this.socket.fromEvent<string[]>('users');
  logoutUsers = this.socket.fromEvent<string>('loggedOutUsers');
  messages;

  constructor(private socket:Socket) { }

  listentMsg = (_id:string) => {
    this.messages = this.socket.fromEvent<Message>(_id.trim());
  }

  addUser = (_id:string) => {
    this.socket.emit('adduser',_id);
  }

  removeUser = (_id:string) => {
    this.socket.emit('removeUser',_id);
  }

  sendMessage = (message:Message) => {
    this.socket.emit('sendMsg',message);
  }

  sendTyping = (message:Message) => {
     this.socket.emit('typing',message);
  }
}
