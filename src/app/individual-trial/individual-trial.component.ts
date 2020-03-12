import { ViewChildren, Component, OnInit } from '@angular/core';
import { DataAccessService } from '../services/data-access.service';
import { dataQAservice } from '../services/data-QA.service';
import { TrialsTable } from '../trials/trialsTable';
//import { } from '@types/googlemaps';
import {ActivatedRoute, Router} from '@angular/router';
import { SessionService } from '../services/session.service';
import { TrialsListService } from '../services/trials-list.service';

@Component({
  selector: 'app-individual-trial',
  templateUrl: './individual-trial.component.html',
  styleUrls: ['./individual-trial.component.css']
})
export class IndividualTrialComponent implements OnInit {

	constructor(private dataAccess: DataAccessService, 
		private dataQAservice: dataQAservice, 
		private route:ActivatedRoute,
		private router:Router,
		public session:SessionService,
		private trialsList : TrialsListService ) { }

	//public dataSource: TrialsTable[] = [];
	public dataSource: TrialsTable[] = this.trialsList.getData();
	selectedTrial: any;
	trial: any;
	error: String[];
	phase: String[];
	userId:any ;

 /* @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;*/

	ngOnInit() {
	    //const tempData = this.dataQAservice.getData();
	    this.userId=this.session.accountUserId;
	    let trialID = parseInt(this.route.snapshot.paramMap.get('id'));
		this.dataAccess.fetchTrialsSummary(trialID,this.userId).subscribe( data => {
	    	this.dataSource = data;

	    },
	    error => {
	    	this.error = error;
	    });
	    this.selectedTrial = this.dataSource.filter(function (tmp) {
	                     return tmp.id === trialID;
	                });
	    console.log("selectedTrial", JSON.stringify(this.selectedTrial));
	    this.trial = this.selectedTrial[0];
	}


	//public TrialsTable: any = [];

	displayedColumns: String[] = ['Phase'/*, 'Interventions', 'Modalities', 'Sponser' */];

	displayedInterventionColumns: string[] = ["Radiation: SABR", "Drug: Atezolizumab"];
	//dataSource: PeriodicElement[] = treatments;

}
