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

@Component({
  selector: 'app-answer-questions',
  templateUrl: './answerQuestions.component.html',
  styleUrls: ['./answerQuestions.component.scss']
})

export class AnswerQuestionsComponent implements OnInit {

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
	}

	myarray: String[] = [];

	i: number;

	newstr: String;
	  
	quizlist: Quizmodel[] = questions;

	quizlength: number;

	question: String;

	option: any[];

	optionType: String;

	characteristic: String;
	ID: number;
	str: String;
	value: String[];

	selectedMonth: String;
	selectedYear: number;
	diagnosisDate: String;

	display: boolean;
	display2: boolean;
	gettinglanguage() {

	}

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
		}
	  }
	  previous(e, i) {
		this.i =  i-1 < 0 ? 0 : i-1;
		this.question = this.quizlist[this.i].question;
		this.option = this.quizlist[this.i].anslistobj;
		this.optionType = this.quizlist[this.i].optionType;
		this.ID = this.quizlist[this.i].ID;
		this.characteristic = this.quizlist[this.i].characteristic;
	  }

	 	onMonthSelect(event, MM) {
		    console.log(event.value);
		    this.selectedMonth = MM;
		}

		onYearSelect(event, YY, code) {
		    console.log(event.value);
		    this.selectedYear = YY;
		    this.check(event,this.selectedYear, code);
		}
	  
	  answerkey: AnswerKey[] = [];
	  //value: string[] = [];
	  check(e, val, character) {

	  	console.log(" Value is : ", val );

	  	/*if (e.target.checked) {
		    this.value.push(val);
	  	} else {
	  		this.value = val;
	  	}*/
	  	/*let j = 0;
	  	for (j=0; j<=AnswerKey.length; j++) {
	  		if ( character == AnswerKey[j]) {
	  			this.value = AnswerKey[j].status;
	  		}
	  	}
	  	
		this.value.push(val);
		this.value = val;
	  	this.str = character;*/

	  	this.diagnosisDate = this.selectedMonth + ' ' + this.selectedYear;
	  	if (character == 'Initial diagnosis'){
	  		val = this.diagnosisDate;
	  	}

	  	this.answerkey.push(new AnswerKey(character, val));
	  	
	  	console.log("this.answerkey" + this.answerkey);

	  	//let result = Object.assign( ...this.answerkey.map( a => { [a.code]: a.status }) );
	  	let result = Object.assign(...this.answerkey.map(a => ({[a.code]: a.status})));
	  	console.log("result" + JSON.stringify(result));
	  }

	  onSave() {

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

	  ///////////////////////////////////

	  //marks: number = 0;
	  constructor(private _router: Router){} 
	  onSubmit(): void { 
			this._router.navigate(['/']); 
	   }

	month: String[] = [ "Jan", "Feb", "March", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
    year: String[] = [ "1990", "1991", "1992", "1993", "1994", "1995", "1996", "1997", "1998", "1999", 
    					"2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009",
    					"2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019" ];
	  /*recursivecheck() {
		var result1 = this.quizlist;
		var result2 = this.answerkey;

		var props = ['id', 'answer'];

		var result = result1.filter(function (o1) {
		  // filter out (!) items in result2
		  return result2.some(function (o2) {
			return o1.answer === o2.answer;
			// assumes unique id
		  });

		}).map(function (o) {

		  // use reduce to make objects with only the required properties
		  // and map to apply this to the filtered array as a whole
		  return props.reduce(function (newo, ans) {
			newo[ans] = o[ans];
			return newo;
		  }, {});
		});
		console.log("result:" + JSON.stringify(result));
	  }*/

}
