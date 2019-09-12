export class Quizmodel {
	 ID :number;
	 question:String;
	 anslistobj:String[];
	 optionType:String;

	 constructor(  ID :number, question:String,
		 anslistobj:String[], optionType:String) {
		 this.ID=ID;
		 this.anslistobj=anslistobj;
		 this.optionType=optionType;
	}
}

export class Answermodel {

	option:String[];
	constructor(option:String[]){

	this.option=option;

	}
}

export class AnswerKey {
  	question: String;
 	 answer: String[];
 	 constructor(question: String, answer: String[]) {
		this.question = question;
		this.answer = answer;
 	 }
}
