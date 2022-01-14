import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {RouterModule,Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import {HttpClientModule} from '@angular/common/http';
import {SocketIoModule,SocketIoConfig} from 'ngx-socket-io';
import {FormsModule} from '@angular/forms';
import { UserChatComponent } from './user-chat/user-chat.component';

const config:SocketIoConfig = {url:'http://localhost:3000',options:{}};
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserChatComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    SocketIoModule.forRoot(config),
    RouterModule.forRoot([
        {path:'',component:HomeComponent},
        {path:'user_chat',component:UserChatComponent}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
