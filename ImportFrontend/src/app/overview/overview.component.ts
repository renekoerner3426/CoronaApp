import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface DecreeEntity {
  description: string;
  state: string;
  regulations: string;
  id: number;
}
@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  decreeUrl = "http://localhost:8081/newDecree";
  importUrl = "http://localhost:8081/maches";

  //Filterfunction
  selectedDecreesByState = [];
  selectedDecreesByStateFiltered = [];
  searchWords;

  selectedState: string;
  descriptionDecree: string;
  regulationsDecree: string;

  decrees: DecreeEntity[] = [];

  decreeCreated: number;

  states = ["Baden-Württemberg", "Bayern", "Berlin","Brandenburg", 
"Bremen", "Hamburg", "Hessen", "Mecklenburg-Vorpommern",
"Niedersachsen", "Nordrhein-Westfalen", "Rheinland-Pfalz", "Saarland", 
"Sachsen", "Sachsen-Anhalt", "Schleswig-Holstein", "Thüringen"];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }
  addDecree() {
    let decree: DecreeEntity = {id: 0, state: this.selectedState, description: this.descriptionDecree, regulations: this.regulationsDecree }
    return this.http.post<DecreeEntity>(this.decreeUrl, decree).subscribe({
      next: data => {this.decreeCreated = data.id},
      error: error => console.error('addDecree() - could not use ImportService!', error)
    })
  }

  public searchByState(state: string) {
    this.selectedDecreesByState = this.decrees.filter(decreeEntry => decreeEntry.state == state);
    this.selectedDecreesByStateFiltered = this.selectedDecreesByState;
  }

  public searchByRegulations(regulations: string) {
    this. selectedDecreesByStateFiltered = this.selectedDecreesByState.filter(decreeEntry => !decreeEntry.regulations.search(regulations));
  }
}
