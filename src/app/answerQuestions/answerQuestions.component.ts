import { Component, OnInit, Input } from '@angular/core';
import { Quizmodel } from '.././quiz/quizmodel';
import { Answermodel } from '.././quiz/quizmodel';
import { Router }  from '@angular/router';
import { AnswerKey } from '.././quiz/quizmodel';
import questions from '../.././assets/questions.json';
import { MatDatepickerModule, MatDatepickerInputEvent } from '@angular/material/datepicker';
import { dayKey, monthKey, yearKey } from '.././datemodel';
import { map } from 'rxjs/operators';
import { DataAccessService } from '../services/data-access.service';
import { dataQAservice } from '../services/data-QA.service';

// form '../services/data-QA.service'
@Component({
  selector: 'app-answer-questions',
  templateUrl: './answerQuestions.component.html',
  styleUrls: ['./answerQuestions.component.scss']
})

export class AnswerQuestionsComponent implements OnInit {

	constructor(private _router: Router, private dataQAservice: dataQAservice, private dataAccess: DataAccessService){}

	ngOnInit() {
		this.question = this.quizlist[0].question;
		this.option = this.quizlist[0].anslistobj;
		this.i = 0;
		this.quizlength = this.quizlist.length;
		this.optionType = this.quizlist[0].optionType;
		this.ID = this.quizlist[0].ID;
		this.characteristic = this.quizlist[0].characteristic;

		this.display = false;
		this.display2 = false;

        //Selecting Default Radio item here
        this.optionSelected = [];

	}

	public trialsData: any = [];
	public array3 = [];

	myarray: String[] = [];

	i: number;

	newstr: String;

	quizlist: Quizmodel[] = questions;

	quizlength: number;

	question: String;

	option: any;

	optionType: String;
    optionSelected:any[];
    selectedOpt: String[];

	characteristic: String;
	ID: number;
	str: String;
	value: String[];

	selectedMonth: String;
	selectedYear: number;
	diagnosisDate: String;

	display: boolean;
	display2: boolean;


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
		}
	}
	previous(e, i) {
		this.i =  i-1 < 0 ? 0 : i-1;
		this.question = this.quizlist[this.i].question;
		this.option = this.quizlist[this.i].anslistobj;
		this.optionType = this.quizlist[this.i].optionType;
		this.ID = this.quizlist[this.i].ID;
		this.characteristic = this.quizlist[this.i].characteristic;
		this.selectedOpt = this.optionSelected[this.i];
	}

	onMonthSelect(event, MM) {
		console.log(event.value);
		this.selectedMonth = MM;
	}

	onYearSelect(event, YY, code) {
		console.log(event.value);
		this.selectedYear = YY;
		this.check(event, code);
	}

	answerkey: AnswerKey[] = [];

	check(e,selectedOpt) {

		let val = e.value;
		console.log("Value is : ", val );

		this.optionSelected[this.i] = selectedOpt;

		this.diagnosisDate = this.selectedMonth + ' ' + this.selectedYear;
		if (this.characteristic == 'diagnosis'){
			val = this.diagnosisDate;
		}
		if (this.characteristic == 'tumourSize') {
			val = selectedOpt;
		}

		this.answerkey.push(new AnswerKey(this.characteristic, val));

		let result = Object.assign({},...this.answerkey.map((a:any) => ({ [a.code]: a.status })));

		console.log("result" + JSON.stringify(result));
		let resultQA = this.dataQAservice.getData();

		this.array3 = [];
		this.array3.push(Object.assign({}, resultQA, result));

		console.log(this.array3);
	}

	toggleTreatmentOPtions(e, value, code) {
		if ( code == "Early stage treatment" ) {
			if (value == 'Yes') {
				this.display = true;
			} else if (value != 'Yes') {
				this.display = false;
			}
		}

		if ( code == "Advanced stage treatment" ) {
			if (value == 'Yes') {
				this.display2 = true;
			} else if (value != 'Yes') {
				this.display2 = false;
			}
		}
	}

	onSubmit() {
	  	this.dataQAservice.setData(this.array3[0]);
	}

	month: String[] = [ "Jan", "Feb", "March", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
	year: String[] = [ "1990", "1991", "1992", "1993", "1994", "1995", "1996", "1997", "1998", "1999",
						"2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009",
						"2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019" ];

}
