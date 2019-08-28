export class Quizmodel {

 ID :number;
 question:String;
 anslistobj:String[];
 answer:String;

 constructor(  ID :number, question:String,
 anslistobj:String[], answer:String) {
 this.ID=ID;
 this.anslistobj=anslistobj;
this.answer=answer;
}
}
export class Answermodel
{

option:String[];
constructor(option:String[]){

this.option=option;

}
}

