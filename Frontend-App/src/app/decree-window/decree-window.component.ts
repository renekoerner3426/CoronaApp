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
  forbiddenValues: boolean = false;
  eventPopupVisible: boolean = false;
  persons: number;
  area: number;
  outside: boolean;
  maxHomesString: string;
  maxHomesInsideDecree;
  maxHomesOutsideDecree;
  selectedEventState: string = "Niedersachsen";
  allowedVisible: boolean;
  notAllowedVisible: boolean;
  selectedDecreesForEventCalculation = [];
  calculatePerStateDecrees = [];
  maxPersonsInsideString = "Maximale Anzahl Personen innen:";
  maxPersonsOutsideString = "Maximale Anzahl Personen außen:";
  maxHomesInsideString = "Maximale Anzahl Haushalte innen:";
  maxHomesOutsideString = "Maximale Anzahl Haushalte außen:";
  maxPersonsPerAreaInsideString = "Maximale Teilnehmerzahl pro m² Fläche innen:";
  maxPersonsPerAreaOutsideString = "Maximale Teilnehmerzahl pro m² Fläche außen:";
  maxPersonsInsideNumber: number;
  maxPersonsOutsideNumber: number;
  maxPersonsPerAreaInsideNumber: number;
  maxPersonsPerAreaOutsideNumber: number;
  closedFacilitiesString = "Schließungen:";
  closedFacilities = [];




  ngOnInit() {
    this.decrees = [];
     this.getDecreesFromDB().subscribe((data)=>{
    data.forEach(element => {
        this.decrees.push(element);
        console.log(element);
      });
    });

    this.selectDecreesForEventCalculating();
  }
  public searchByState(state: string) {
    this.selectedDecreesByState = this.decrees.filter(decreeEntry => decreeEntry.state == state);
    this.selectedDecreesByStateFiltered = this.selectedDecreesByState;
  }

  public searchByRegulations(regulations: string) {
    this.selectedDecreesByStateFiltered = this.selectedDecreesByState.filter(decreeEntry => !decreeEntry.regulations.search(regulations));
  }

   public getDecreesFromDB() {
    let decreeEntity = this.httpClient.get<DecreeEntity[]>(`http://localhost:8082/decrees`)
    return decreeEntity
  } 

  public openEventPopup() {
    this.selectedEventState = "Niedersachsen";
    this.eventPopupVisible = true;
  }

  public closeEventPopup() {
    this.eventPopupVisible = false;
    this.allowedVisible = false;
    this.notAllowedVisible = false;
  }

  public calculate() {
    this.calculatePerStateDecrees = this.selectedDecreesForEventCalculation.filter(decree => decree.state === this.selectedEventState);
    this.maxHomesInsideDecree = this.calculatePerStateDecrees.filter(decree => decree.description.search(this.maxHomesInsideString));
    this.maxHomesOutsideDecree = this.calculatePerStateDecrees.filter(decree => decree.description.search(this.maxHomesOutsideString));

    this.maxPersonsInsideNumber = this.getValueForCalculating(this.maxPersonsInsideString);
    this.maxPersonsOutsideNumber = this.getValueForCalculating(this.maxPersonsOutsideString);
    this.maxPersonsPerAreaInsideNumber = this.getValueForCalculating(this.maxPersonsPerAreaInsideString);
    this.maxPersonsPerAreaOutsideNumber = this.getValueForCalculating(this.maxPersonsPerAreaOutsideString);

    if (this.outside) {
      this.maxHomesString = this.maxHomesOutsideDecree.description;
      if((this.maxPersonsOutsideNumber > this.persons) || (this.persons > (this.area/this.maxPersonsOutsideNumber))){
        this.notAllowedVisible = true;
      }
    } else {
      this.maxHomesString = this.maxHomesInsideDecree.description;
      if((this.maxPersonsInsideNumber > this.persons) || (this.persons > (this.area/this.maxPersonsInsideNumber))){
        this.notAllowedVisible = true;
      }
    }

    if(!this.notAllowedVisible){
      this.allowedVisible = true;
    }
  }

  public selectDecreesForEventCalculating() {
    this.selectedDecreesForEventCalculation.push(this.decrees.filter(decreeEntity => decreeEntity.description.search(this.maxPersonsInsideString)));
    this.selectedDecreesForEventCalculation.push(this.decrees.filter(decreeEntity => decreeEntity.description.search(this.maxPersonsOutsideString)));
    this.selectedDecreesForEventCalculation.push(this.decrees.filter(decreeEntity => decreeEntity.description.search(this.maxHomesInsideString)));
    this.selectedDecreesForEventCalculation.push(this.decrees.filter(decreeEntity => decreeEntity.description.search(this.maxHomesOutsideString)));
    this.selectedDecreesForEventCalculation.push(this.decrees.filter(decreeEntity => decreeEntity.description.search(this.maxPersonsPerAreaInsideString)));
    this.selectedDecreesForEventCalculation.push(this.decrees.filter(decreeEntity => decreeEntity.description.search(this.maxPersonsPerAreaOutsideString)));
    this.selectedDecreesForEventCalculation.push(this.decrees.filter(decreeEntity => decreeEntity.description.search(this.closedFacilitiesString)));
  }

  public getValueForCalculating(description: string) {
    let decrees = this.selectedDecreesForEventCalculation.filter(decree => decree.state === this.selectedEventState);
    let valueDecree: DecreeEntity[] = decrees.filter(decree => decree.description.search(description));
    let valueString = valueDecree[0].description;
    valueString = valueString.replace(description, "");
    valueString = valueString.replace(" ", "");
    let value: number = +valueString;
    if(value === NaN) {
      return 0;
    }
    if(value < 0){
      this.forbiddenValues = true;
    }
    return value;
  }
}
