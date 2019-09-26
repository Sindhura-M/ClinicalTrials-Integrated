import { Component, OnInit } from '@angular/core';
import { TrialsTable } from './trialsTable';
import { DataAccessService } from '../services/data-access.service';
import { dataQAservice } from '../services/data-QA.service';

@Component({
  selector: 'app-trials',
  templateUrl: './trials.component.html',
  styleUrls: ['./trials.component.scss']
})
export class TrialsComponent implements OnInit {

  constructor( private dataAccess: DataAccessService, private dataQAservice: dataQAservice ) { }

  public dataSource: any = [];

  ngOnInit() {
      this.dataAccess.getCancerTrials().subscribe( data => {
      this.dataSource=data;
      });
  }

  public TrialsTable: any = [];

  displayedColumns: String[] = ['Study title', 'Interventions', 'Phase', 'Sponsor', 'Sex', 'Location', 'Save'];
  //dataSource: TrialsTable[] = this.trialsData;

  //console.log("trialsData::::::" + this.dataSource.name);
  /*[
	  {studyTitle: 'Use of Hair to Diagnose Breast Cancer', interventions: 'Procedure: cutting scalp hair', phase: 2, sponsor: 'Femiscan Ltd', sex: 'Female', location: 'St George Private Hospital, Sydney, NSW, 2217', save: ''},
	  {studyTitle: 'Stereotactic Radiation and Immunotherapy in Patients with Advanced Triple Negative Breast Cancer', interventions: 'Radiation: SABR, Drug: Atezolizumab', phase: 2, sponsor: 'Peter MacCallum Cancer Centre, Australia', sex: 'All', location: 'Peter MacCallum Cancer Centre, Melborune, VIC, 3000', save: ''}];
  */
  //this.dataAccess.getCancerTrials().subscribe( data =>
  //this.TrialsTable=data[0]);
}
