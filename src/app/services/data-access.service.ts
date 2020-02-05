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
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})  
export class DataAccessService {

  constructor(private client: HttpClient, private dataQAservice: dataQAservice, private dataAccountProfile: dataAccountProfile) {}

  private _url: string = environment.apiUrl + '/ctc/myaccount/createAccountProfile';
  private _trialsurl: string = environment.apiUrl + '/ctc/trials/matchingTrials';
  private _fetchTrial: string = environment.apiUrl + '/ctc/trials/trialssummary/fetchRecord';
  private _saveTrial: string = environment.apiUrl + '/ctc/trials/trialssummary/userTrialsSummary';
  //private _register: string = environment.apiUrl + '/register';
  private _login: string = environment.apiUrl + '/authenticate';
  private _userDetails: string = environment.apiUrl + '/ctc/trials/userList';
  private _removeUser: string = environment.apiUrl + '/ctc/trials/removeUser';

  //private _authURL:  string = '';
  
  	getAccountProfile(): Observable<any> {

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
     		return this.client.post<any>(this._url,data,httpOptions)
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

  getUserDetails(): Observable <any>{
    const httpOptions = {
      headers: new HttpHeaders({ 
        'Access-Control-Allow-Origin':'*',  
        'Authorization':'Basic cm9vdDpyb290',
        'Content-Type' : 'application/json',
        'Accept': 'application/json'
      })
    };

    return this.client.get<any>(this._userDetails,httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }

  removeUser(userID: number): Observable<any> {
    const data = userID;
    const httpOptions = {
        headers: new HttpHeaders({ 
          'Access-Control-Allow-Origin':'*',  
          'Authorization':'Basic cm9vdDpyb290',
          'Content-Type' : 'application/json',
          'Accept': 'application/json'
        })
      };

    let _url = this._removeUser + '/' + userID;
    return this.client.post<any>(_url,data,httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }

  saveTrial(trialID: number): Observable<any> {
    const data = trialID;
    const httpOptions = {
        headers: new HttpHeaders({ 
          'Access-Control-Allow-Origin':'*',  
          'Authorization':'Basic cm9vdDpyb290',
          'Content-Type' : 'application/json',
          'Accept': 'application/json'
        })
      };

    return this.client.post<any>(this._saveTrial,data,httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }

  fetchTrialsSummary(trialID: string): Observable<any> {
    const httpOptions = {
        headers: new HttpHeaders({ 
          'Access-Control-Allow-Origin':'*',  
          'Authorization':'Basic cm9vdDpyb290',
          'Content-Type' : 'application/json',
          'Accept': 'application/json'
        })
      };

    let url = this._fetchTrial + '/' + trialID;
    return this.client.get<any>(url, httpOptions)
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

  signIn(credentials: any[]): Observable<any> {
      let data = credentials;
      const httpOptions = {
        headers: new HttpHeaders({ 
          'Access-Control-Allow-Origin':'*',  
          'Authorization':'Basic cm9vdDpyb290',
          'Content-Type' : 'application/json',
          'Accept': 'application/json'
        })
      };

      return this.client.post(this._login, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
      //.map((response: Response) => response.json())
      //.catch(this.handleError(Error));
  }


 /* register(credentials: any[]): Observable<any> {
      let data = credentials;
      const httpOptions = {
        headers: new HttpHeaders({ 
          'Access-Control-Allow-Origin':'*',
          'Content-Type' : 'application/json',
          'Accept': 'application/json'
        })
      };

      return this.client.post(this._register, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
      //.map((response: Response) => response.json())
      //.catch(this.handleError(Error));
  }*/
  handleError(error) {
      return throwError(error);
  }
 

}

