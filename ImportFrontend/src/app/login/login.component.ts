import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface DecreeEntity {
  description: string;
  state: string;
  regulations: string;
  id: number;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loggedIn: boolean = false;
  userName: string;
  userPassword: string ;

  decreeUrl = "http://localhost:8081/newDecree";

  stateDecree: string;
  descriptionDecree: string;
  regulationsDecree: string;

  decreeCreated: number;

  states = ["Baden-Württemberg", "Bayern", "Berlin","Brandenburg", 
"Bremen", "Hamburg", "Hessen", "Mecklenburg-Vorpommern",
"Niedersachsen", "Nordrhein-Westfalen", "Rheinland-Pfalz", "Sarland", 
"Sachsen", "Sachsen-Anhalt", "Schleswig-Holstein", "Thüringen"];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  login() {
    if(this.userName == "admin" && this.userPassword == "admin") {
      this.loggedIn = true;
    }
  }

  addDecree() {
    let decree: DecreeEntity = {id: 0, state: this.stateDecree, description: this.descriptionDecree, regulations: this.regulationsDecree }
    return this.http.post<DecreeEntity>(this.decreeUrl, decree).subscribe({
      next: data => {this.decreeCreated = data.id},
      error: error => console.error('addDecree() - could not use ImportService!', error)
  })
  }
}
