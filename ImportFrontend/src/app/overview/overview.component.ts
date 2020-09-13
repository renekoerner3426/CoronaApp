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



  deleteUrl = "http://localhost:8081/deleteDecree";
  editUrl = "http://localhost:8081/editDecree";
  decreeUrl = "http://localhost:8081/newDecree";
  importUrl = "http://localhost:8081/maches";

  //Filterfunction
  selectedDecreesByState = [];
  selectedDecreesByStateFiltered = [];
  descriptionDecree: string;
  regulationsDecree: string;
  searchWords;
  selectedState: string;

  //Import
  selectedUploadState: string;

  //Edit
  selectedDecree: DecreeEntity;
  editingDescription: string;
  editingRegulations: string;
  editingState: string;
  popupVisible: boolean = false;
  // Get the modal

  decrees: DecreeEntity[] = [ 
    {id: 7, state:"Bayern", description:"Bratwurst", regulations:"nicht vor 9"},
    {id: 3, state:"Bayern", description:"Bier", regulations:"so viel wie geht"}
  ];

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

  basicImport(){
    this.http.get<DecreeEntity[]>(`http://localhost:8081/maches`).subscribe(({
      error: error => console.error('basicImport() - could not use ImportService!', error),
      next: data => data.forEach(element => {
        this.decrees.push(element);
        console.log(element);
      })
    }))
  }

  filteredImport(){
    this.http.get<DecreeEntity[]>(`http://localhost:8081/maches` + '/' + this.selectedUploadState).subscribe(({
      error: error => console.error('basicImport() - could not use ImportService!', error),
      next: data => data.forEach(element => {
        this.decrees.push(element);
        console.log(element);
      })
    }))
  }

  public searchByState(state: string) {
    this.selectedDecreesByState = this.decrees.filter(decreeEntry => decreeEntry.state == state);
    this.selectedDecreesByStateFiltered = this.selectedDecreesByState;
  }

  public searchByRegulations(regulations: string) {
    this. selectedDecreesByStateFiltered = this.selectedDecreesByState.filter(decreeEntry => !decreeEntry.regulations.search(regulations));
  }

  public updateDecree(){ 
    this.selectedDecree.description = this.editingDescription;
    this.selectedDecree.regulations = this.editingRegulations;
    this.popupVisible = false;
   /*  return this.http.put<DecreeEntity>(this.editUrl, this.selectedDecree).subscribe({
      error: error => console.error('addDecree() - could not use ImportService!', error)
    }) */
  }

  public deleteDecree(decree: DecreeEntity){
    console.log(decree);
/*     return this.http.post<DecreeEntity>(this.deleteUrl, decree).subscribe({
      error: error => console.error('addDecree() - could not use ImportService!', error)
    }) */
  }

  public openDecreeEditor(decree: DecreeEntity){
    this.editingDescription = decree.description;
    this.editingRegulations = decree.regulations;
    this.editingState = decree.state;
    this.popupVisible = true;
    this.selectedDecree = decree;
  }
}
