import { Injectable, ErrorHandler } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import 'rxjs/add/observable/of';
import { AuthService } from '.././auth.service';
import { AccountProfile } from '../welcome/AccountProfile';
import { catchError } from 'rxjs/operators/catchError';
import { AnswerKey } from '.././quiz/quizmodel';
import { TrialsTable } from '../trials/trialsTable';
import { dataQAservice } from './data-QA.service';
import { dataAccountProfile } from './dataAccountProfile.service';

@Injectable({
  providedIn: 'root'
})
export class DataAccessService {

  constructor(private client: HttpClient, private dataQAservice: dataQAservice, private dataAccountProfile: dataAccountProfile) {}

  private _url: string = 'http://localhost:9090/api/ctc/myaccount/accountProfile';
  private _trialsurl: string = 'http://localhost:9090/api/ctc/trials/matchingTrials';
  //private _authURL:  string = '';
  
  	getAccountProfile(): Observable<AccountProfile[]> {

    		let data = this.dataAccountProfile.getData();
        data = data[0];
        const httpOptions = {
    			headers: new HttpHeaders({ 
      			'Access-Control-Allow-Origin':'*',	
      			'Authorization':'Basic cm9vdDpyb290',
      			'Content-Type' : 'application/json',
      			'Accept': 'application/json'
    			})
    		};
   
     		//return this.client.jsonp<AccountProfile[]>(this._url,'callback');
     		return this.client.post<AccountProfile[]>(this._url,data,httpOptions)
        .pipe(
          catchError(this.handleError)
        );

   	}

  getCancerTrials(): Observable<TrialsTable[]> {

    const data = this.dataQAservice.getData();
      const httpOptions = {
        headers: new HttpHeaders({ 
          'Access-Control-Allow-Origin':'*',  
          'Authorization':'Basic cm9vdDpyb290',
          'Content-Type' : 'application/json',
          'Accept': 'application/json'
        })
      };
 
      return this.client.post<TrialsTable[]>(this._trialsurl,data,httpOptions)
      .pipe(
        catchError(this.handleError)
      );

  }

  /*signIn(username: string, password: string) {

    return this.client.post(this._authURL + '/sign-in', {
        username,
        password
      })
      .map(response => response.json())
      .catch(this.handleError(Error));
  }*/

  /*signIn(username: string, password: string): Observable<any> {
      let data = { username, password};
      const httpOptions = {
        headers: new HttpHeaders({ 
          'Access-Control-Allow-Origin':'*',  
          'Authorization':'Basic cm9vdDpyb290',
          'Content-Type' : 'application/json',
          'Accept': 'application/json'
        })
      };

      return this.client.post(this._authURL + '/sign-in', data, httpOptions)
      .map((response: Response) => response.json())
      //.catch(this.handleError(Error));
  }*/

  handleError(error) {
      return throwError(error);
  }

}

