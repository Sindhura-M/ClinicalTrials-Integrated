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
  error: String[];

  ngOnInit() {
      //const tempData = this.dataQAservice.getData();
      this.dataAccess.getCancerTrials().subscribe( data => {
      this.dataSource=data;
      },
      error => {
        this.error = error;
      });
  }

  public TrialsTable: any = [];

  displayedColumns: String[] = ['Study title', 'Interventions', 'Phase', 'Sponsor', 'Sex', 'Location', 'Save'];
  
}
