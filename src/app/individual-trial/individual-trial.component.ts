import { ViewChildren, Component, OnInit } from '@angular/core';
import { DataAccessService } from '../services/data-access.service';
import { dataQAservice } from '../services/data-QA.service';
//import { } from '@types/googlemaps';

@Component({
  selector: 'app-individual-trial',
  templateUrl: './individual-trial.component.html',
  styleUrls: ['./individual-trial.component.css']
})
export class IndividualTrialComponent implements OnInit {

  constructor( private dataAccess: DataAccessService, private dataQAservice: dataQAservice ) { }
  public dataSource: any = [];
  error: String[];

 /* @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;*/

 ngOnInit() {
	    //const tempData = this.dataQAservice.getData();
	    this.dataAccess.getCancerTrials().subscribe( data => {
	    this.dataSource=data;
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

  displayedColumns: String[] = ['Phase', 'Interventions', 'Modalities'];

  displayedInterventionColumns: string[] = ["Radiation: SABR", "Drug: Atezolizumab"];
  //dataSource: PeriodicElement[] = treatments;

}
