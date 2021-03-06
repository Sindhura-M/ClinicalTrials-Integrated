import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class SessionService {

	public accessToken: string;
  	public name: string;
  	public emailAddress: string;
	  public accountUserId: any;
	 
	  public trials: any;
	  public questionId:any;

  	constructor() { }

  	public destroy(): void {
	    this.accessToken = null;
	    this.name = null;
	    this.emailAddress = null;
		this.accountUserId = null;
		this.questionId=null;
		this.trials = false;
		
	}
}
