import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-match-results',
  templateUrl: './match-results.component.html',
  styleUrls: ['./match-results.component.css']
})
export class MatchResultsComponent implements OnInit {

	constructor( private router: Router ) { }

	ngOnInit() {
	}

	showTrials() {
	  	//this.router.navigateByUrl('/trials');
	  	this.router.navigate(['/trials']);
	}

}
