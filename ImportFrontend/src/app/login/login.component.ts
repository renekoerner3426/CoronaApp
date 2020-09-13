import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loggedIn: boolean = false;
  userName: string;
  userPassword: string ;

  constructor() { }

  ngOnInit(): void {
  }

  login() {
    if(this.userName == "admin" && this.userPassword == "admin") {
      this.loggedIn = true;
    }
  }

}
