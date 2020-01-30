import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersListService {

  constructor() { }
  private usersList:any = undefined;

	setData(data:any){
	    this.usersList = data;
	}

	getData():any{
	    return this.usersList;
	}
}

