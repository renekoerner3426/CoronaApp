import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

interface DecreeEntity {
  description: string;
  state: string;
  regulations: string;
  id: number;
}
@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.css']
})
export class ImportComponent implements OnInit {

  importUrl = "http://localhost:8081/maches";

  selectedState: string;
  decrees: DecreeEntity[] = [];

  states = ["Baden-Württemberg", "Bayern", "Berlin","Brandenburg", 
  "Bremen", "Hamburg", "Hessen", "Mecklenburg-Vorpommern",
  "Niedersachsen", "Nordrhein-Westfalen", "Rheinland-Pfalz", "Saarland", 
  "Sachsen", "Sachsen-Anhalt", "Schleswig-Holstein", "Thüringen"];
  
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  import(){
      this.http.get<DecreeEntity[]>(`http://localhost:8081/maches`).subscribe(({
        error: error => console.error('basicImport() - could not use ImportService!', error),
        next: data => data.forEach(element => {
          this.decrees.push(element);
          console.log(element);
        })
      }))
  }

  filteredImport(){
    this.http.get<DecreeEntity[]>(`http://localhost:8081/maches` + '/' + this.selectedState).subscribe(({
      error: error => console.error('basicImport() - could not use ImportService!', error),
      next: data => data.forEach(element => {
        this.decrees.push(element);
        console.log(element);
      })
    }))
  }

}
