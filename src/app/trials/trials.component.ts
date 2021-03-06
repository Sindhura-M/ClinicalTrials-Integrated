import { Component, OnInit } from '@angular/core';
import { DataAccessService } from '../services/data-access.service';
import { dataQAservice } from '../services/data-QA.service';
import { SessionService } from '../services/session.service';


@Component({
  selector: 'app-trials',
  templateUrl: './trials.component.html',
  styleUrls: ['./trials.component.scss']
})
export class TrialsComponent implements OnInit {

  constructor( private dataAccess: DataAccessService, private dataQAservice: dataQAservice,public session:SessionService, ) { }

  public dataSource: any = [];
  error: String[];
  showTrials:boolean = true;
  userId:any ;

  ngOnInit() {
      //this.userId=this.session.accountUserId;
      const tempData = this.dataQAservice.getData();
      this.dataAccess.getCancerTrials().subscribe( data => {
      this.dataSource=data;
      this.showTrials=true;
      },
      error => {
        this.error = error;
        this.showTrials=false;
      });
      //this.showTrials= ( (this.dataSource.length > 1) ? true : false);
  }

  displayedColumns: String[] = ['Study title', 'Interventions', 'Phase', 'Sponsor', 'Sex', 'Location', 'Save'];
  
  saveTrial(event, trialId: number) {
    this.userId=this.session.accountUserId;

    let trialDetails = [];
    trialDetails.push(Object.assign({'trialId': trialId},{'userId': this.userId}));
    trialDetails = trialDetails[0];
    if (event.currentTarget.innerText === "star_border") {
      event.currentTarget.innerText = 'star';
      this.dataAccess.userFavouriteTrials(trialDetails).subscribe();
    }else {
      event.currentTarget.innerText = 'star_border';
      //this.dataAccess.unSaveTrial(trialID).subscribe();
    }

    //this.router.navigate([])
    
    //this.iconSave = 'star'? 'star_border': 'star';
    //this.dataSource.id + '_icon' = this.iconSave;
  }
}
