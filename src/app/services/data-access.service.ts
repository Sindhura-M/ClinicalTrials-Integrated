import { Injectable, ErrorHandler } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {AccountProfile} from '../welcome/AccountProfile';
import {catchError} from 'rxjs/operators/catchError';
import { AnswerKey } from '.././quiz/quizmodel';

@Injectable({
  providedIn: 'root'
})
export class DataAccessService {

  constructor(private client: HttpClient) {}

  private _url: string = 'http://localhost:9090/api/ctc/myaccount/accountProfile';

  
  
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
   		return this.client.get<AccountProfile[]>(this._url,httpOptions);

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
  

}
