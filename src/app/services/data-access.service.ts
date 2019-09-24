import { Injectable, ErrorHandler } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {AccountProfile} from '../welcome/AccountProfile';
import {catchError} from 'rxjs/operators/catchError';
import { AnswerKey } from '.././quiz/quizmodel';
import { TrialsTable } from '../trials/trialsTable';
import { dataQAservice } from './data-QA.service';

@Injectable({
  providedIn: 'root'
})
export class DataAccessService {

  constructor(private client: HttpClient, private dataQAservice: dataQAservice ) {}

  private _url: string = 'http://localhost:9090/api/ctc/myaccount/accountProfile';
  private _trialsurl: string = 'http://localhost:9090/api/ctc/trials/matchingTrials';
  //private _data: [];
  
  	getAccountProfile(): Observable<AccountProfile[]> {

    		const httpOptions = {
    			headers: new HttpHeaders({ 
      			'Access-Control-Allow-Origin':'*',	
      			'Authorization':'Basic cm9vdDpyb290',
      			'Content-Type' : 'application/json',
      			'Accept': 'application/json'
    			})
    		};
   
     		//return this.client.jsonp<AccountProfile[]>(this._url,'callback');
     		return this.client.post<AccountProfile[]>(this._url,,httpOptions);

   	}

  /*setAnswerKey(): Observable<AnswerKey[]> {

      const httpOptions = {
        headers: new HttpHeaders({ 
          'Access-Control-Allow-Origin':'*',  
          'Authorization':'Basic cm9vdDpyb290',
          'Content-Type' : 'application/json',
          'Accept': 'application/json'
        })
      };
 
      //return this.client.jsonp<AccountProfile[]>(this._url,'callback');
      this.client.post<AnswerKey[]>(this._url,httpOptions);

  }*/

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
 
      return this.client.post<TrialsTable[]>(this._trialsurl,data,httpOptions);

  }
  

}
