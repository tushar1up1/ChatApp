import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  user: any;
  userName: string;
  password: string;
  constructor(private router:Router,private loginService: LoginService) { }

  ngOnInit(): void {
  }


  submitFormValues = (event) => {
      event.preventDefault();
      if(this.userName && this.password)
      {
         this.user = {userName:this.userName,password:this.password};
         this.loginService.registerUser(this.user).subscribe( (user:any) => {
            // this.router.navigate(['/user_chat'],{queryParams: user});
            this.loginService.getListOfUsers().subscribe( (res) => {
                console.log(res);
            });
         });
      }
  }

}
