import { Component, OnInit, Input } from '@angular/core';
import { Quizmodel } from '.././quiz/quizmodel';
import { Answermodel } from '.././quiz/quizmodel';
import { Router }  from '@angular/router';
import { AnswerKey } from '.././quiz/quizmodel';
import questionnaire from '../.././assets/questions.json';

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

		this.show = true;
	}

	myarray: String[] = [];
	i: number = 0;
	//languages: String[] = ["java", "cprogram", "C++", "Spring", "Html", "Asp.net"];
	 newstr: String;
	  
	  quizlist: Quizmodel[] = [
		{
		  ID: 1, 
		  question: "What is the patient's menopausal status?",
		  optionType: "radio",
		  anslistobj: [ 
		  	"Premenopausal", 
		  	"Postmenopausal", 
		  	"Not sure", 
		  	"Not applicable (male)"
		  ], 
		  answer: ""
		},
		{
		  ID: 2, 
		  question: "What type of breast cancer (tumour type) does the patient have?", 
		  optionType: "radio",
		  anslistobj: [
		  	"Ductal Carcinoma In Situ (DCIS)", 
		  	"Lobular Carcinoma In Situ (LCIS)", 
		  	"Infiltrating ductal carcinoma", 
		  	"Infiltrating lobular carcinoma",
		  	"Inflammatory breast cancer",
		  	"Other",
		  	"Not sure"
		  ], 
		  answer: ""
		},
		{
		  ID: 3, 
		  question: "Has the cancer spread to other parts of the body?", 
		  optionType: "radio",
		  anslistobj: ["Yes", "No", "Not sure"], 
		  answer: ""
		},
		{
		  ID: 4, 
		  question: "Has the breast cancer metastasised (spread) from the breast to any of the following areas? Please select all that apply.", 
		  optionType: "checkbox",
		  anslistobj: ["Breast cancer has not spread ", 
		  "Lymph nodes near the tumour", 
		  "Tissue adjacent to primary tumor (locally advanced)", 
		  "Distant lymph nodes",
		   "Other breast", 
		   "Abdomen", 
		   "Bone (including vertebrae)", 
		   "Brain", 
		   "Fluid around the lungs (malignant pleural effusion)", 
		   "Liver", 
		   "Lung", 
		   "Skin", 
		   "Other", 
		   "Not sure"
		   ],
		   answer: ""
		}
	  ];

	quizlength: number;
	//selectedlanguage: Quizmodel[] = [];
	question: String;
	//selectedvalue: String;
	option: any[];
	optionType: String;
	show: any;
	//selectedlanques: any[];
	gettinglanguage() {
	//this.selectedlanques =  this.quizlist.filter(d => (d.language == "java"));
	  }

	  next(e) { 
		++this.i;
		if (this.i<this.quizlist.length) {
			this.question = this.quizlist[this.i].question;
			this.option = this.quizlist[this.i].anslistobj;
			this.optionType = this.quizlist[this.i].optionType;
		}
		if ( this.i > 0 ) {
			this.show = false;
		}
	  }
	  previous(e) {
		--this.i;
		this.question = this.quizlist[this.i].question;
		this.option = this.quizlist[this.i].anslistobj;
		this.optionType = this.quizlist[this.i].optionType;
		if ( this.i = 0 ) {
			this.show = true;
		}
	  }

	  
	  answerkey: AnswerKey[] = [];

	  check(e, str: String, answer: String) {
		if (e.target.checked) {
		  console.log("..................."+str + " " + answer);
		  this.answerkey.push(new AnswerKey(str, answer));
		}
		else {
		  this.answerkey.splice(0, 1);
		}
		console.log(this.answerkey);
		this.recursivecheck();
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
		  //if (this.answerkey[i].choosen == this.quizlist[i].answer) this.marks++;
		  message += "<tr>";
		  message += "<td>"+ this.quizlist[i].question +"</td>";
		  message += "<td>"+ this.answerkey[i].choosen +"</td>";
		  message += "</tr>";

		  //document.writeln("your survey is " + this.quizlist[i].question + "-" + this.answerkey[i].choosen);
		}
		html =  "<table>" + message + "</table>";
		// alert("your score is "+JSON.stringify(this.marks));
		document.writeln("your survey is " + html);

	  }

	  recursivecheck() {
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
	  }
}
