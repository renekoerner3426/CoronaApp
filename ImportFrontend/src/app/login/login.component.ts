import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userName: string;
  userPassword: string ;
  linkEnabled: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  checkInput() {
    if(this.userName == "admin" && this.userPassword == "admin") {
      this.linkEnabled = true;
    }
  }

  checkForData() {
    
  }


}
