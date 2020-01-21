import { Component, OnInit } from '@angular/core';
import { DataAccessService } from '../services/data-access.service';
import { FormBuilder, FormGroup, ControlContainer, FormControl } from '@angular/forms';
import { dataQAservice } from '../services/data-QA.service';
import { Quizmodel } from '.././quiz/quizmodel';
import { Answermodel } from '.././quiz/quizmodel';
import { AnswerKey } from '.././quiz/quizmodel';
// import questions from '../.././assets/questions.json';
import { MatDatepickerModule, MatDatepickerInputEvent } from '@angular/material/datepicker';
import { dayKey, monthKey, yearKey } from '.././datemodel';
import { map } from 'rxjs/operators';
import { MatDialog, MatDialogRef } from '@angular/material';
import { dataAccountProfile } from '../services/dataAccountProfile.service';
import { HttpClient } from "@angular/common/http";
import { ConditionChangedConfirmationComponent } from '../condition-changed-confirmation/condition-changed-confirmation.component';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {

  	constructor(private dataAccess: DataAccessService, private formBuilder: FormBuilder, private dataQAservice: dataQAservice, private dataAccountProfile: dataAccountProfile, private httpClient: HttpClient, public dialog: MatDialog) { }
	dialogRef: MatDialogRef<ConditionChangedConfirmationComponent>;
	public tabIndex =2;
  	myAccForm: FormGroup;
	public accountProfile: any = [];
	error: String[];

	Object = Object;
	ngOnInit() {

		/*this.dataAccess.getAccountProfile().subscribe( data => {
			this.accountProfile = data[0];
			this.myAccForm.patchValue({firstName: this.accountProfile.firstName});
		});*/
		//const tempData = this.dataQAservice.getData();
		this.httpClient.get("assets/questions.json").subscribe(data =>{
			console.log(data);
			this.quizlist = data;
			})
		this.dataAccess.getCancerTrials().subscribe( data => {
	    	this.dataSource=data;
	    },
	      error => {
	        this.error = error;
	    });

	    let profile = this.dataAccountProfile.getData();
		console.log('dataAccountProfile' + profile);

		
		this.dialogRef = this.dialog.open(ConditionChangedConfirmationComponent,  
			{
			  disableClose: false
			});
			this.dialogRef.componentInstance.confirmMessage = "Has your condition changed since you last logged in?"
			this.dialogRef.afterClosed().subscribe(result => {
			  if(result) {
				this.tabIndex=1;
			  }
			  this.dialogRef = null;
			});
		  
  	}

	//My trials code//
  	public dataSource: any = [];

    public TrialsTable: any = [];

    displayedColumns: String[] = ['Study title', 'Interventions', 'Phase', 'Sponsor', 'Sex', 'Location', 'Save'];

  	quizlist: any = [];

  	toggleAccordian(event, index) {
	    var element = event.target;
	    element.classList.toggle("active");

	    if(this.quizlist[index].isActive) {
	   		this.quizlist[index].isActive = false;
	    } else {
	    	this.quizlist[index].isActive = true;
	    }      
	    var panel = element.nextElementSibling;
	    if (panel.style.maxHeight) {
	    	panel.style.maxHeight = null;
	    } else {
	    	panel.style.maxHeight = panel.scrollHeight + "px";
	    }
	}
	printPage(){
		
		window.print();
	}
}