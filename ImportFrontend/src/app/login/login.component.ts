import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

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

  selectedState: string = "Niedersachsen";
  selectedUploadState: string = "Niedersachsen";
  selectedDecree: DecreeEntity;

  controls: FormArray;

  decrees: DecreeEntity[] = [];

  decreeCreated: number;

  states = ["Baden-Württemberg", "Bayern", "Berlin","Brandenburg", 
"Bremen", "Hamburg", "Hessen", "Mecklenburg-Vorpommern",
"Niedersachsen", "Nordrhein-Westfalen", "Rheinland-Pfalz", "Saarland", 
"Sachsen", "Sachsen-Anhalt", "Schleswig-Holstein", "Thüringen"];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    const toGroups = this.decrees.map(decree => {
      return new FormGroup({
        description: new FormControl(decree.description, Validators.required),
        regulations: new FormControl(decree.regulations)
      });
    });
    this.controls = new FormArray(toGroups);
  }

  login() {
    if(this.userName == "admin" && this.userPassword == "admin") {
      this.loggedIn = true;
    }
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

  public getControl(index: number, field: string): FormControl {
    return this.controls.at(index).get(field) as FormControl;
  }

  public updateDecree(decree: DecreeEntity){
    return this.http.put<DecreeEntity>(this.editUrl, decree).subscribe({
      error: error => console.error('addDecree() - could not use ImportService!', error)
    })
  }

  public deleteDecree(decree: DecreeEntity){
    return this.http.put<DecreeEntity>(this.deleteUrl, decree).subscribe({
      error: error => console.error('addDecree() - could not use ImportService!', error)
    })
  }

  public updateField(index: number, field: string) {
    const control = this.getControl(index, field);

    if (control.valid) {
      this.decrees = this.decrees.map((e, i) => {
        if (index === i) {
          return {
            ...e,
            [field]: control.value 
          }
        }
        this.updateDecree(e);
        return e;
      });
    }
  }
}
