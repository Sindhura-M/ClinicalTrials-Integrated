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

	deleteUser(userID:number)
	{
		const data = userID;
    	const httpOptions = {
        headers: new HttpHeaders({ 
          'Access-Control-Allow-Origin':'*',  
          'Authorization':'Basic cm9vdDpyb290',
          'Content-Type' : 'application/json',
          'Accept': 'application/json'
        })
      };

    return this.http.post<any>(this._deleteUrl,data,httpOptions)
    .pipe(
      catchError(this.handleError)
    );
	}
	handleError(error) {
		return throwError(error);
	}
}

