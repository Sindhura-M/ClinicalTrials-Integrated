import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators/catchError';
@Injectable({
  providedIn: 'root'
})
export class UsersListService {

  constructor(private http: HttpClient) { }
  private usersList:any = undefined;
  private _deleteUrl: string = environment.apiUrl + '';

	setData(data:any){
	    this.usersList = data;
	}

	getData():any{
	    return this.usersList;
	}
	handleError(error) {
		return throwError(error);
	}
}

