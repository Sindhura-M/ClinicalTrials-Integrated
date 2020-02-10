import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class SessionService {

	public accessToken: string;
  	public name: string;
  	public emailAddress: string;

  	constructor() { }

  	public destroy(): void {
	    this.accessToken = null;
	    this.name = null;
	    this.emailAddress = null;
	}
}
