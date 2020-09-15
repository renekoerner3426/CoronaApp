import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';

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
  getDecreesUrl = "http://localhost:8081/decrees";

  //Filterfunction
  allStatesVisible: boolean = true;
  selectedDecreesByState = [];
  selectedDecreesByStateFiltered = [];
  descriptionDecree: string;
  regulationsDecree: string;
  searchWords;
  selectedState: string;

  //add
  missingValues: boolean = false;
  addingWasOk: boolean = false;
  addingWasfalse: boolean = false;

  //Import
  selectedUploadState: string;
  importPopupVisible : boolean = false;
  failedImport: boolean = false;
  successfullImport: boolean = false;

  //Edit
  selectedDecree: DecreeEntity;
  editingDescription: string;
  editingRegulations: string;
  editingState: string;
  popupVisible: boolean = false;
  updateDecreeFailed: boolean = false;
  deleteFailed: boolean = false;

  //all
  decrees: DecreeEntity[] = [
    {id: 3, state:"Bayern", description:"hallo", regulations:"duuu"},
    {id: 7, state:"Bayern", description:"dasdasasd", regulations:"duasdffasddfsauu"},
  ];

  decreeCreated: number;

  states = ["Baden-Württemberg", "Bayern", "Berlin","Brandenburg", 
"Bremen", "Hamburg", "Hessen", "Mecklenburg-Vorpommern",
"Niedersachsen", "Nordrhein-Westfalen", "Rheinland-Pfalz", "Saarland", 
"Sachsen", "Sachsen-Anhalt", "Schleswig-Holstein", "Thüringen"];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.updateDecreeList();
    this.selectedDecreesByStateFiltered = this.decrees;
  }

  public updateDecreeList() {
    this.setMessageBooleansToFalse();
     this.http.get<DecreeEntity[]>(`http://localhost:8081/decrees`).subscribe(({
      error: error => console.error('updateDecreeList() - could not use ImportService!', error),
      next: data => data.forEach(element => {
        this.decrees.push(element);
        console.log(element);
      })
    }));
    this.decrees = this.decrees.filter((element, i) => i === this.decrees.indexOf(element))
  }

  addDecree() {
    this.setMessageBooleansToFalse();
    if(this.selectedState && this.descriptionDecree.length > 0) {
      let decree: DecreeEntity = {id: 0, state: this.selectedState, description: this.descriptionDecree, regulations: this.regulationsDecree }
      this.http.post<DecreeEntity>(this.decreeUrl, decree).subscribe({
       next: data => {
        this.addingWasOk = true;
         this.decreeCreated = data.id;
       },
       error: error => {
         this.addingWasfalse = true;
         this.decrees.splice(this.decrees.indexOf(decree), 1);
    this.decrees = this.decrees;
    this.selectedDecreesByState.splice(this.selectedDecreesByState.indexOf(decree), 1);
    this.selectedDecreesByState = this.selectedDecreesByState;
    this.selectedDecreesByStateFiltered.splice(this.selectedDecreesByStateFiltered.indexOf(decree), 1);
    this.selectedDecreesByStateFiltered = this.selectedDecreesByStateFiltered;
         console.error('addDecree() - could not use ImportService!', error)}}); 
     this.descriptionDecree = "";
     this.regulationsDecree = "";
     this.decrees.push(decree);
     this.searchByState(this.selectedState);
     this.searchByRegulations("");
    } else {
      this.missingValues = true;
    }
   
  }

  basicImport(){
    this.importPopupVisible = false;
     this.http.get<DecreeEntity[]>(`http://localhost:8081/maches`).subscribe(({
      error: error => console.error('basicImport() - could not use ImportService!', error)}));
  }

  filteredImport(){
    this.importPopupVisible = false;
    if(!this.selectedUploadState) {
      this.basicImport();
    } else {
      this.http.get<DecreeEntity[]>(`http://localhost:8081/maches` + '/' + this.selectedUploadState).subscribe(({
        error: error => console.error('basicImport() - could not use ImportService!', error)}));
    }    
  }

  public searchByState(state: string) {
    this.setMessageBooleansToFalse();
    this.allStatesVisible = false;
    this.selectedDecreesByState = this.decrees.filter(decreeEntry => decreeEntry.state == state);
    this.selectedDecreesByStateFiltered = this.selectedDecreesByState;
  }

  public searchByRegulations(regulations: string) {
    this. selectedDecreesByStateFiltered = this.selectedDecreesByState.filter(decreeEntry => !decreeEntry.regulations.search(regulations));
  }

  public updateDecree(){ 
    this.setMessageBooleansToFalse();
    this.selectedDecree.description = this.editingDescription;
    this.selectedDecree.regulations = this.editingRegulations;
    this.popupVisible = false;
    return this.http.put<DecreeEntity>(this.editUrl, this.selectedDecree).subscribe({
      error: error => {
        this.updateDecreeFailed = true;
        console.error('updateDecree() - could not use ImportService!', error)
    }});
  }

  public deleteDecree(decree: DecreeEntity){
    this.setMessageBooleansToFalse();
    this.http.post<DecreeEntity>(this.deleteUrl, decree).subscribe({
      error: error => {
        this.deleteFailed = true;
        console.error('deleteDecree() - could not use ImportService!', error)
    }});
    this.decrees.splice(this.decrees.indexOf(decree), 1);
    this.decrees = this.decrees;
    this.selectedDecreesByState.splice(this.selectedDecreesByState.indexOf(decree), 1);
    this.selectedDecreesByState = this.selectedDecreesByState;
    this.selectedDecreesByStateFiltered.splice(this.selectedDecreesByStateFiltered.indexOf(decree), 1);
    this.selectedDecreesByStateFiltered = this.selectedDecreesByStateFiltered;
    
  }

  public openDecreeEditor(decree: DecreeEntity){
    this.setMessageBooleansToFalse();
    this.editingDescription = decree.description;
    this.editingRegulations = decree.regulations;
    this.editingState = decree.state;
    this.popupVisible = true;
    this.selectedDecree = decree;
  }

  public openImportPopup() {
    this.setMessageBooleansToFalse();
    this.importPopupVisible = true;
  }

  public closeImportPopup() {
    this.importPopupVisible = false;
  }

  public setMessageBooleansToFalse(){
    this.missingValues = false;
    this.addingWasOk = false;
    this.addingWasfalse = false;
    this.failedImport = false;
    this.successfullImport = false;
    this.updateDecreeFailed = false;
    this.deleteFailed = false;
  }
}
