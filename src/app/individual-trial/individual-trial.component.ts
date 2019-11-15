import { ViewChildren, Component, OnInit } from '@angular/core';
import { DataAccessService } from '../services/data-access.service';
import { dataQAservice } from '../services/data-QA.service';
import { TrialsTable } from '../trials/trialsTable';
//import { } from '@types/googlemaps';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-individual-trial',
  templateUrl: './individual-trial.component.html',
  styleUrls: ['./individual-trial.component.css']
})
export class IndividualTrialComponent implements OnInit {

	constructor(private dataAccess: DataAccessService, private dataQAservice: dataQAservice, private route:ActivatedRoute,private router:Router) { }
	public dataSource: TrialsTable[] = [];
	error: String[];
	phase: String[];

 /* @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;*/

	ngOnInit() {
	    //const tempData = this.dataQAservice.getData();
	    let trialId = this.route.snapshot.paramMap.get('id');
	    this.dataAccess.fetchTrialsSummary(trialId).subscribe( data => {
	    this.dataSource = data;
	    },
	    error => {
	    	this.error = error;
	    });

	 	/* var mapProp = {
	      center: new google.maps.LatLng(18.5793, 73.8143),
	      zoom: 15,
	      mapTypeId: google.maps.MapTypeId.ROADMAP
	    };
	    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);*/
	}

	//public TrialsTable: any = [];

	displayedColumns: String[] = ['Phase'/*, 'Interventions', 'Modalities', 'Sponser' */];

	displayedInterventionColumns: string[] = ["Radiation: SABR", "Drug: Atezolizumab"];
	//dataSource: PeriodicElement[] = treatments;

}
