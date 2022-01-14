import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { User } from '../models/User';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User = {
    userName: '',
    password: ''
  };
  constructor(private router:Router,private loginService: LoginService) { }

  ngOnInit(): void {
  }


  submitFormValues = (event) => {
      event.preventDefault();
      if(this.user.userName && this.user.password)
      {
         this.loginService.registerUser(this.user).subscribe( (user:User) => {
              this.router.navigate(['']);
         });
      }
  }


}
