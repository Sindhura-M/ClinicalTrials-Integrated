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
import { SessionService } from '../services/session.service';
import { Router, Params } from '@angular/router';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {

  	constructor(private dataAccess: DataAccessService, 
  		private formBuilder: FormBuilder, 
  		private dataQAservice: dataQAservice, 
  		private dataAccountProfile: dataAccountProfile,
  		private httpClient: HttpClient, 
  		public dialog: MatDialog,
  		public session:SessionService,
  		private router: Router ) { }
  	
	dialogRef: MatDialogRef<ConditionChangedConfirmationComponent>;
	public tabIndex =2;
  	myAccForm: FormGroup;
	public accountProfile: any = [];
	error: String[];
	myAccDetails: any;
	userId:any;
	Object = Object;
	
	quizlist: any = [];
	ngOnInit() {
		 this.userId=this.session.accountUserId;
		/*this.dataAccess.createAccountProfile().subscribe( data => {
			this.accountProfile = data[0];
			this.myAccForm.patchValue({firstName: this.accountProfile.firstName});
		});*/
		//const tempData = this.dataQAservice.getData();
		  this.httpClient.get("assets/questions.json").subscribe(data =>{
			this.quizlist = data;
			})
		  this.dataAccess.getAccountDetails().subscribe(data => {
			this.myAccDetails=data;
			this.session.questionId=this.myAccDetails.condition.quesId;
            
			//Code to map the data based on displaytypes//

			this.quizlist.forEach(element => {
				for (let key of Object.keys(this.myAccDetails.condition)) {
				if(element.optionType=="radio")
				{	
				if(element.characteristic==key){
					element.anslistobj.forEach(item => {
						if(item.status==this.myAccDetails.condition[key]){
							  item.value=true;
							  element.answer=item.code;
						}
					});
				}
			}else if(element.optionType=="checkbox"){
				if(element.characteristic==key){
					element.anslistobj.forEach(item => {
						if(this.myAccDetails.condition[key]!=null){
							if(item.name==this.myAccDetails.condition[key]){
								item.checked=true;
								element.answer=item.code;
						  }
						}
						
					});
				}
			}else if(element.optionType=="multipleRadio"){
				element.anslistobj.forEach(item => {
					if(item.subcharacteristic==key){
					    item.anslistobj.forEach(element => {
							if(element.status==this.myAccDetails.condition[key]){
								element.value=true;
								element.answer=item.code;
						  }
						});
					}
				});
				
			}else if(element.optionType=="text"){
				if(element.characteristic==key){
				element.anslistobj.forEach(item => {
					if(item.status==this.myAccDetails.condition[key]||this.myAccDetails.condition[key]=="Any"){
						item.value=this.myAccDetails.condition[key];
						element.answer=item.code;
						  }
					
					
				});
			}
			}else if(element.optionType=="selectbox-earlyStage" || element.optionType=="selectbox-advanced"){
				if(element.characteristic==key){
				
					element.anslistobj[0].selectbox.forEach(item => {
						if(item.status==this.myAccDetails.condition[key]){
							item.value=this.myAccDetails.condition[key];
							  }
						
						
					});
				
				}
			}
			}});
				
	
	    },
	      	error => {
	        this.error = error;
		});
		
	
 
         
		this.dataAccess.getMyAccTrials(this.userId).subscribe( data => {
	    	this.myAccDetails=data;
	    	this.dataSource = data.summaries;
	    },
	      	error => {
	        this.error = error;
	    });

	    let profile = this.dataAccountProfile.getData();
		
		this.dialogRef = this.dialog.open(ConditionChangedConfirmationComponent,  
			{
			  disableClose: false
			});
			this.dialogRef.componentInstance.confirmMessage = "Has your condition changed since you last logged in?"
			this.dialogRef.afterClosed().subscribe(result => {
			  if(result) {
				//this.tabIndex=1;
				this.router.navigate(['/stepper/3']);
			  }
			  this.dialogRef = null;
			});
		  
  	}

	//My trials code//
  	public dataSource: any = [];

    public TrialsTable: any = [];

    displayedColumns: String[] = ['Study title', 'Interventions', 'Phase', 'Sponsor', 'Sex', 'Location', 'Save'];

  	omit_special_char(event) {   
		var k;  
		k = event.charCode;  //         k = event.keyCode;  (Both can be used)
		return((k > 64 && k < 91) || (k > 96 && k < 123));
	}
	

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