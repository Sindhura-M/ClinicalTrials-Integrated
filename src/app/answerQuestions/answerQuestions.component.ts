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
		console.log(this.years);
	}
	ngOnInit() {
		this.httpClient.get("assets/questions.json").subscribe(data =>{
			console.log(data);
			this.quizlist = data;
			this.question = this.quizlist[0].question;
			this.option = this.quizlist[0].anslistobj;
			this.i = 0;
			this.quizlength = this.quizlist.length;
			this.optionType = this.quizlist[0].optionType;
			this.ID = this.quizlist[0].ID;
			this.characteristic = this.quizlist[0].characteristic;
		})
		

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
		console.log("this.events" + this.events);
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
		this.showIncompleteQuestions = false;
	}

	onMonthSelect(event, MM) {
		console.log(event.value);
		this.selectedMonth = MM;
	}

	onYearSelect(event, YY, code) {
		console.log(event.value);
		this.selectedYear = YY;
		this.onCheck(event, code);
	}

	answerkey: AnswerKey[] = [];

	onCheck(e,selectedOpt) {

		let val = e.value;
		console.log("Value is : ", val );		

		this.diagnosisDate = this.selectedMonth + ' ' + this.selectedYear;


		if (this.characteristic === 'diagnosis'){
			val = this.diagnosisDate;
			selectedOpt = val;
		}else if (this.characteristic === 'tumourSize') {
			val = selectedOpt;
		}else if (this.optionType === 'checkbox') {
			this.checkboxValues.push(selectedOpt);
			val = selectedOpt = this.checkboxValues;

		}else if (this.optionType === 'multipleRadio') {
			this.characteristic = e;
			val = selectedOpt;
			selectedOpt = e + '-' + selectedOpt;
		} else if (this.optionType == 'selectbox-earlyStage' || this.optionType == 'selectbox-advanced') {
			this.characteristic = this.characteristic + '-' + e.currentTarget.name;
			val = selectedOpt;
		}

		this.optionSelected[this.i] = selectedOpt;
		this.answerkey.push(new AnswerKey(this.characteristic, val));
		this.answerkey.push(new AnswerKey('accountUserId', this.session.accountUserId));

		let result = Object.assign({},...this.answerkey.map((a:any) => ({ [a.code]: a.status })));

		console.log("result" + JSON.stringify(result));
		let resultQA = this.dataQAservice.getData();

		this.array3 = [];
		this.array3.push(Object.assign({}, resultQA, result));

		console.log(this.array3);
	}

	toggleTreatmentOPtions(e, value) {
		if ( this.characteristic === "Early stage treatment" ) {
			if (value === 'Yes') {
				this.display = true;
			} else if (value !== 'Yes') {
				this.display = false;
			}
		}

		if ( this.characteristic === "Advanced stage treatment" ) {
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
