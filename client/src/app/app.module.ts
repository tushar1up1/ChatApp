import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { ScrollingModule } from '@angular/cdk/scrolling'
import { HttpClientModule } from '@angular/common/http';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { HomeComponent } from './home/home.component';
import { UserChatComponent } from './user-chat/user-chat.component';
import { LoginService } from './login.service';
import { ChatService } from './chat.service';
import { CookieService } from 'ngx-cookie-service';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import {MatInputModule} from '@angular/material/input';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { DatePipe } from './date.pipe';
import { FirstletterPipe } from './firstletter.pipe';

const config:SocketIoConfig = {url:'',options:{}};
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserChatComponent,
    RegisterComponent,
    LoginComponent,
    DatePipe,
    FirstletterPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ScrollingModule,
    MatInputModule,
    BrowserAnimationsModule,
    SocketIoModule.forRoot(config),
    RouterModule.forRoot([
        {path:'',component:LoginComponent},
        {path:'register',component:RegisterComponent},
        {path:'home/:_id',component:HomeComponent}
    ])
  ],
  providers: [LoginService,ChatService,CookieService,{provide:"BASE_URL",useValue:""}],
  bootstrap: [AppComponent]
})
export class AppModule { }
