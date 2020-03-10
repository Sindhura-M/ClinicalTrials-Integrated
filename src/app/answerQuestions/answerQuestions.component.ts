import { Component, OnInit, Input } from '@angular/core';
import { Quizmodel } from '.././quiz/quizmodel';
import { Answermodel } from '.././quiz/quizmodel';
import { Router }  from '@angular/router';
import { AnswerKey } from '.././quiz/quizmodel';
//import questions from '../.././assets/questions.json';
import { MatDatepickerModule, MatDatepickerInputEvent } from '@angular/material/datepicker';
import { dayKey, monthKey, yearKey } from '.././datemodel';
import { map } from 'rxjs/operators';
import { DataAccessService } from '../services/data-access.service';
import { dataQAservice } from '../services/data-QA.service';
import { HttpClient } from "@angular/common/http"; 
import { SessionService } from '../services/session.service';

// form '../services/data-QA.service'
@Component({
  selector: 'app-answer-questions',
  templateUrl: './answerQuestions.component.html',
  styleUrls: ['./answerQuestions.component.scss']
})

export class AnswerQuestionsComponent implements OnInit {

	month: String[] = [ "Jan", "Feb", "March", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
	years: any[]
	currentYear = (new Date()).getFullYear();
	range = [];	
	error: String[];
	myAccDetails: any;			
	selectboxCharacteristic: any;
	constructor(private _router: Router, 
		private dataQAservice: dataQAservice, 
		private dataAccess: DataAccessService,
		private httpClient: HttpClient,
		public session:SessionService)
	{
		for (let _k = 1950; _k < this.currentYear+1; _k++) 
		{
				this.range.push(_k);
		}
		this.years = this.range;
	}
	ngOnInit() {


		this.httpClient.get("assets/questions.json").subscribe(data =>{
			this.quizlist = data;

			this.question = this.quizlist[0].question;
			this.option = this.quizlist[0].anslistobj;
			this.i = 0;
			this.quizlength = this.quizlist.length;
			this.optionType = this.quizlist[0].optionType;
			this.ID = this.quizlist[0].ID;
			this.characteristic = this.quizlist[0].characteristic;
		})


		this.dataAccess.getAccountDetails().subscribe(data => {
			this.myAccDetails=data;
            if(this.myAccDetails!=null){

			
			//Code to map the data based on displaytypes//

			this.quizlist.forEach(element => {
				for (let key of Object.keys(this.myAccDetails.condition)) {
				if(element.optionType=="radio")
				{	
				if(element.characteristic==key){
					element.anslistobj.forEach(item => {
						if(item.status==this.myAccDetails.condition[key]){
						      item.value=true;
						}
					});
				}
			}else if(element.optionType=="checkbox"){
				if(element.characteristic==key){
					element.anslistobj.forEach(item => {
						if(this.myAccDetails.condition[key]!=null){
							if(item.name==this.myAccDetails.condition[key]){
								item.checked=true;
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
						  }
						});
					}
				});
				
			}else if(element.optionType=="text"){
				if(element.characteristic==key){
				element.anslistobj.forEach(item => {
					if(item.status==this.myAccDetails.condition[key]){
						item.value=this.myAccDetails.condition[key];
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
		}
	
	    },
	      	error => {
	        this.error = error;
		});
		

		this.display = false;
		this.display2 = false;

        //Selecting Default Radio item here
        this.optionSelected = [];

	}
	public trialsData: any = [];
	public array3 = []

	myarray: String[] = [];

	i: number;

	newstr: String;

	quizlist: any;//Quizmodel[] = questions;

	quizlength: number;

	question: String;

	option: any;

	optionType: String;
    optionSelected:any[];
    selectedOpt: String[];
	checkboxValues: String[] = [];
	characteristic: String;
	ID: number;
	str: String;
	value: String[];

	selectedMonth: String;
	selectedYear: number;
	diagnosisDate: String;

	display: boolean;
	display2: boolean;

	showIncompleteQuestions:boolean = false;

	
	events: string[] = [];
	addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
		this.events.push(`${type}: ${event.value}`);
	}


	
	

	next(e, i) {
		
		this.i = i + 1;
		if (this.i<this.quizlist.length) {
			this.question = this.quizlist[this.i].question;
			this.option = this.quizlist[this.i].anslistobj;
			this.optionType = this.quizlist[this.i].optionType;
			this.ID = this.quizlist[this.i].ID;
			this.characteristic = this.quizlist[this.i].characteristic;
			this.selectedOpt = this.optionSelected[this.i];
		} else { 
			if (this.optionSelected.length < this.quizlist.length) {
				this.showIncompleteQuestions = true;
				this.i = this.quizlist.length;	
			}
		}
		this.checkboxValues = [];			
	}
	previous(e, i) {
		this.i =  i-1 < 0 ? 0 : i-1;
		this.question = this.quizlist[this.i].question;
		this.option = this.quizlist[this.i].anslistobj;
		this.optionType = this.quizlist[this.i].optionType;
		this.ID = this.quizlist[this.i].ID;
		this.characteristic = this.quizlist[this.i].characteristic;
		this.selectedOpt = this.optionSelected[this.i];
        switch (this.optionType)
		 {
        case "radio" :
		this.selectedOpt = this.optionSelected[this.i];
		this.option.forEach(element => {
		if(element.code==this.selectedOpt){
		element.value=true;
		}else {
			element.value=false;
		}
		});
		break
		case "checkbox":
			this.optionSelected.forEach(element => {
				this.selectedOpt = element[0].name;
				this.option.forEach(element => {
					if(element.name==this.selectedOpt){
					element.checked=true;
					}else {
						element.checked=false;
			}
					});

			});
			break
			case "text" :
				this.selectedOpt = this.optionSelected[this.i];
				this.option.forEach(element => {
				if(element.status==this.selectedOpt){
				element.value=true;
				}else {
					element.value=false;
				}
				});
				break
		   case "multipleRadio":
			let optionIs="";
		    this.option.forEach(element => {
				this.selectedOptArray.forEach(function(item){
					 optionIs=item.split('-');
					
						
							if(element.status==this.selectedOpt){
								element.value=true;
							}else {
								element.value=false;
							}
						
					
				});
				
				
				
			});
			

				
			
	 }
		this.showIncompleteQuestions = false;
	
	}

	onMonthSelect(event, MM) {
		this.selectedMonth = MM;
	}

	onYearSelect(event, YY, code) {
		this.selectedYear = YY;
		this.onCheck(event, code);
	}

	answerkey: AnswerKey[] = [];
	selectedOptArray=[];
	selectedOptionValue;
	onCheck(e,selectedOpt) {

		let val = e.value;		

		this.diagnosisDate = this.selectedMonth + ' ' + this.selectedYear;


		if (this.characteristic === 'diagnosis'){
			val = this.diagnosisDate;
			selectedOpt = val;
		}else if (this.characteristic === 'tumourSize') {
			val = selectedOpt;
		}else if (this.optionType === 'checkbox') {
			if(selectedOpt.checked==true){
					this.checkboxValues.push(selectedOpt.name);
				}
		
			
			val = selectedOpt = this.checkboxValues;
			//val=val[0].name;

		}else if (this.optionType === 'multipleRadio') {
			this.characteristic = e;
			val = selectedOpt;
			selectedOpt = e + '-' + selectedOpt;
			this.selectedOptArray.push(selectedOpt);
		} else if (this.optionType == 'selectbox-earlyStage' || this.optionType == 'selectbox-advanced') {
			this.selectboxCharacteristic = this.quizlist[this.i].characteristic;
			var targetIS=e.currentTarget.name;
			e.currentTarget.name=e.currentTarget.name.split(" ").join("");
			this.characteristic = this.selectboxCharacteristic+e.currentTarget.name;
			val = selectedOpt;
			this.option[0].selectbox.forEach(element => {
				
					if(element.therapyName==targetIS){
						element.answer=val;
					}
			});
		}

		this.optionSelected[this.i] = selectedOpt;
		this.answerkey.push(new AnswerKey(this.characteristic, val));
		this.answerkey.push(new AnswerKey('accountUserId', this.session.accountUserId));
		this.answerkey.push(new AnswerKey('quesId', this.session.questionId));
		
		

		let result = Object.assign({},...this.answerkey.map((a:any) => ({ [a.code]: a.status })));

		let resultQA = this.dataQAservice.getData();

		this.array3 = [];
		this.array3.push(Object.assign({}, resultQA, result));
	}

	toggleTreatmentOPtions(e, value) {
		if ( this.characteristic === "early" ) {
			if (value === 'Yes') {
				this.display = true;
			} else if (value !== 'Yes') {
				this.display = false;
			}
		}

		if ( this.characteristic === "advanced" ) {
			if (value === 'Yes') {
				this.display2 = true;
			} else if (value !== 'Yes') {
				this.display2 = false;
			}
		}
	}

	onSubmit() {
	  	this.dataQAservice.setData(this.array3[0]);
	}
}
