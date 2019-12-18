import { Component, OnInit } from '@angular/core';
import treatments from '../.././assets/BC-treatments.json';

@Component({
  selector: 'app-tabOne',
  templateUrl: './breastCancer.component.html',
  styleUrls: ['./breastCancer.component.scss']
})

export class BreastCancerComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

  displayedColumns: string[] = ["Chemotherapy", "Targeted therapy"];
  dataSource: PeriodicElement[] = treatments;

}

export interface PeriodicElement {
	Chemotherapy: string[];
	Targetedtherapy: string[];
}