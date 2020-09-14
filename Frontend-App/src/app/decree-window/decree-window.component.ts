import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


interface DecreeEntity {
  id: number;
  description: string;
  state: string;
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

  //event
  eventPopupVisible: boolean = false;
  persons: number;
  area: number;
  outside: boolean;
  selectedEventState: string;
  allowedVisible: boolean;
  notAllowedVisible: boolean;

  ngOnInit() {
    this.decrees = [];
     this.getDecreesFromDB().subscribe((data)=>{
    data.forEach(element => {
        this.decrees.push(element);
        console.log(element);
      });
    });

  }
  public searchByState(state: string) {
    this.selectedDecreesByState = this.decrees.filter(decreeEntry => decreeEntry.state == state);
    this.selectedDecreesByStateFiltered = this.selectedDecreesByState;
  }

  public searchByRegulations(regulations: string) {
    this. selectedDecreesByStateFiltered = this.selectedDecreesByState.filter(decreeEntry => !decreeEntry.regulations.search(regulations));
  }

   public getDecreesFromDB() {
    let decreeEntity = this.httpClient.get<DecreeEntity[]>(`http://localhost:8082/decrees`)
    return decreeEntity
  } 

  public openEventPopup() {
    this.eventPopupVisible = true;
  }

  public closeEventPopup() {
    this.eventPopupVisible = false;
    this.allowedVisible = false;
    this.notAllowedVisible = false;
  }

  public calculate() {
  this.allowedVisible = true;
  this.notAllowedVisible = true;
  }
}
