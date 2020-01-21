import { Component, OnInit } from '@angular/core';
// import treatments from '../.././assets/BC-treatments.json';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-tabOne',
  templateUrl: './breastCancer.component.html',
  styleUrls: ['./breastCancer.component.scss']
})

export class BreastCancerComponent implements OnInit {
  dataSource:any=[]
  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.httpClient.get("assets/BC-treatments.json").subscribe(data =>{
      console.log(data);
      this.dataSource = data;
      })
    }
  displayedColumnsOne: string[] = ["Chemotherapy", "Targeted therapy"];
  displayedColumnsTwo: string[] = [ "Harmonaltherapy", "Immunotherapy", "Other"]; 
}

export interface PeriodicElement {
	Chemotherapy: string[];
  Targetedtherapy: string[];
  Harmonaltherapy: string[];
  Immunotherapy: string[];
  Other: string[];
}