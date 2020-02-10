import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TrialsListService {

  constructor() { }

  private trialsList:any = undefined;

	setData(data:any){
	    this.trialsList = data;
	}

	getData():any{
	    return this.trialsList;
	}

}
