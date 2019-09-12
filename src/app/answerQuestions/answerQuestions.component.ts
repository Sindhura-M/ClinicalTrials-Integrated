import { Component, OnInit, Input } from '@angular/core';
import { Quizmodel } from '.././quiz/quizmodel';
import { Answermodel } from '.././quiz/quizmodel';
import { Router }  from '@angular/router';
import { AnswerKey } from '.././quiz/quizmodel';
import questions from '../.././assets/questions.json';
import {MatDatepickerModule} from '@angular/material/datepicker';

@Component({
  selector: 'app-answerQuestions',
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

	ID: number;
	str: String;
	value: String[];

	display: boolean;
	display2: boolean;
	gettinglanguage() {

	  }

	  next(e, i) { 
		this.i = i + 1;
		if (this.i<this.quizlist.length) {
			this.question = this.quizlist[this.i].question;
			this.option = this.quizlist[this.i].anslistobj;
			this.optionType = this.quizlist[this.i].optionType;
			this.ID = this.quizlist[this.i].ID;
		}
	  }
	  previous(e, i) {
		this.i =  i-1 < 0 ? 0 : i-1;
		this.question = this.quizlist[this.i].question;
		this.option = this.quizlist[this.i].anslistobj;
		this.optionType = this.quizlist[this.i].optionType;
		this.ID = this.quizlist[this.i].ID;
	  }

	  
	  answerkey: AnswerKey[] = [];

	  check(e, val, question) {

	  	console.log(" Value is : ", val );

	  	/*if (e.target.checked) {
		    this.value.push(val);
	  	} else {
	  		this.value = val;
	  	}*/

		
	  	this.str = this.question;
	  	this.answerkey.push(new AnswerKey(question, val));

		  
		/*if (e.target.checked) {
		  console.log("..................."+this.str + " " + value);
		  this.answerkey.push(new AnswerKey(this.str, value));
		}
		else {
		  this.answerkey.splice(0, 1);
		}*/
		console.log(this.answerkey);
		//this.recursivecheck();
	  }

	  toggleTreatmentOPtions(e, value, ID) {
	  	if ( ID == 11 ) {
			if (value == 'Yes') {
				this.display = true;
			} else if (value != 'Yes') {
				this.display = false;
			}
		}

		if ( ID == 12 ) {
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

	  generateResult() {

		var message = '';
		var html = "";

		for (var i = 0; i < this.answerkey.length; i++) {
		  message += "<tr>";
		  message += "<td>"+ this.quizlist[i].question +"</td>";
		  message += "<td>"+ this.answerkey[i].question +"</td>";
		  message += "</tr>";

		  //document.writeln("your survey is " + this.quizlist[i].question + "-" + this.answerkey[i].choosen);
		}
		html =  "<table>" + message + "</table>";
		document.writeln("your survey is " + html);

	  }

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
