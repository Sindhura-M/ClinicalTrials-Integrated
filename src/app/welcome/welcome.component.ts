import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, ControlContainer, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from '../user.model';
import { Router, Params } from '@angular/router';
import { dayKey, monthKey, yearKey } from '.././datemodel';
import { DataAccessService } from '../services/data-access.service';
import { AuthService } from '.././auth.service';
//import { AnswerKey } from '.././quiz/quizmodel';
import { dataQAservice } from '../services/data-QA.service';
import { dataAccountProfile } from '../services/dataAccountProfile.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})

export class WelcomeComponent implements OnInit {

	  public accountProfile: any = [];
	  error: String[];
	  showSuccessMsg: boolean = false;

	  constructor(public auth: AuthService, 
	  	private router: Router,
	  	private controlContainer: ControlContainer, 
	  	private route: ActivatedRoute, 
	  	private dataAccess: DataAccessService, 
	  	private dataQAservice: dataQAservice, 
	  	private dataAccountProfile: dataAccountProfile) { }

	  ngOnInit() {
	  }

	  	day: String[] = [ "00","01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31"];
	    month: String[] = [ "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
	    //month: String[] = [ "Jan", "Feb", "March", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
	    year: String[] = [ "1950", "1951", "1952", "1953", "1954", "1955", "1956", "1957", "1958", "1959",
	    					"1960", "1961", "1962", "1963", "1964", "1965", "1966", "1967", "1968", "1969",
	    					"1970", "1971", "1972", "1973", "1974", "1975", "1976", "1977", "1978", "1979",
	    					"1980", "1981", "1982", "1983", "1984", "1985", "1986", "1987", "1988", "1989",
	    					"1990", "1991", "1992", "1993", "1994", "1995", "1996", "1997", "1998", "1999",
	    					"2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009",
	    					"2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019" ];

	selectedDay: number;
	selectedMonth: String;
	selectedYear: number;
	birthDate: String;
	firstName: String;

	onDaySelect(event, DD) {
		    console.log(event.value);
	    this.selectedDay = DD;
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

	result: any[];
	  //value: string[] = [];
	  check(e, val, character) {

	  	console.log(" Value is : ", val );

	  	this.birthDate = this.selectedYear + '-' + this.selectedMonth + '-' + this.selectedDay;
	  	if (character === 'dob'){
	  		val = this.birthDate;
	  	}

	  	this.answerkey.push(new AnswerKey(character, val));

	  	this.result = Object.assign({},...this.answerkey.map((a:any) => ({ [a.code]: a.status })));
	  	//console.log("result" + JSON.stringify(result));

	  	this.dataQAservice.setData(this.result);

	}

	onNext(e) {
		let tempData = this.dataAccountProfile.getData();
	  	let accData = [];
		accData.push(Object.assign({}, tempData[0], this.result));
		this.dataAccountProfile.setData(accData);

		this.dataAccess.getAccountProfile().subscribe( data => {
			this.accountProfile=data[0];
			//this.auth.doSignIn( response.token );
			this.answerkey.push(new AnswerKey('accountUserId', data.id));
			this.result = Object.assign({},...this.answerkey.map((a:any) => ({ [a.code]: a.status })));
			this.dataQAservice.setData(this.result);

			this.showSuccessMsg = true;
			//this.dataQAservice.setUserID(data.id);
		},
		error => {
	        this.error = error;
	        this.showSuccessMsg = true;
	    });
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