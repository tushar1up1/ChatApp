import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { User } from '../models/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = {
    userName: '',
    password: ''
  };
  constructor(private router:Router,private loginService: LoginService) { 
      this.navigateIfUserLoggedIn();
  }

  ngOnInit(): void {
  }

  navigateIfUserLoggedIn()
  {
      this.loginService.checkIfUserLoggedIn().subscribe( (_id:string) => {
           if(_id.length > 0)
           {
               this.router.navigate([`/home/${_id}`]);
           }
      });
  }

  submitFormValues = (event) => {
      event.preventDefault();
      if(this.user.userName.length > 0 && this.user.password.length > 0)
      {
        this.loginService.loginUser(this.user).subscribe( (user:User) => {
              this.router.navigate([`/home/${user._id}`]);
         });
      }
  }

}
