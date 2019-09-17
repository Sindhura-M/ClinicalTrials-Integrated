export class Quizmodel {
	 ID :number;
	 question:String;
	 anslistobj:String[];
	 optionType:String;
	 characteristic:String;

	 constructor(  ID :number, question:String,
		 anslistobj:String[], optionType:String, characteristic:String) {
		 this.ID=ID;
		 this.anslistobj=anslistobj;
		 this.optionType=optionType;
		 this.characteristic=characteristic;
	}
}

export class Answermodel {

	option:String[];
	constructor(option:String[]){

	this.option=option;

	}
}

export class AnswerKey {
  	code: String;
 	 status: String[];
 	 constructor(code: String, status: String[]) {
		this.code = code;
		this.status = status;
 	 }
}
