import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


interface DecreeEntity {
  description: string;
  stateID: string;
  regulations: string;
}

@Component({
  selector: 'app-decree-window',
  templateUrl: './decree-window.component.html',
  styleUrls: ['./decree-window.component.css']
})

@Injectable({
  providedIn: 'root'
})


export class DecreeWindowComponent implements OnInit {

  constructor(private httpClient: HttpClient) { }

  title = 'VerordnungenFrontend';
  states = ["Baden-Württemberg", "Bayern", "Berlin","Brandenburg", 
"Bremen", "Hamburg", "Hessen", "Mecklenburg-Vorpommern",
"Niedersachsen", "Nordrhein-Westfalen", "Rheinland-Pfalz", "Sarland", 
"Sachsen", "Sachsen-Anhalt", "Schleswig-Holstein", "Thüringen"];

  decrees: DecreeEntity[] = [];
  selectedDecreesByState = [];
  selectedDecreesByStateFiltered = [];
  selectedState="keine Auswahl";
  searchWords;


  ngOnInit() {
     this.getDecreesFromDB().subscribe((data)=>{
    data.forEach(element => {
        this.decrees.push(element);
        console.log(element);
      });
    });

  }
  public searchByState(state: string) {
    this.selectedDecreesByState = this.decrees.filter(decreeEntry => decreeEntry.stateID == state);
    this.selectedDecreesByStateFiltered = this.selectedDecreesByState;
  }

  public searchByRegulations(regulations: string) {
    this. selectedDecreesByStateFiltered = this.selectedDecreesByState.filter(decreeEntry => !decreeEntry.regulations.search(regulations));
  }

   public getDecreesFromDB() {
    let decreeEntity = this.httpClient.get<DecreeEntity[]>(`http://localhost:8082/decrees`)
    return decreeEntity
  } 

}
