import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ControlContainer, FormControl } from '@angular/forms';
import { AuthService } from '.././auth.service';
import { DataAccessService } from '../services/data-access.service';
import { Router, Params } from '@angular/router';
import { SessionService } from '../services/session.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	
	constructor(private fb: FormBuilder, 
		private controlContainer: ControlContainer, 
		public auth: AuthService, 
		private router: Router, 
		private dataAccess: DataAccessService,
		public session:SessionService
		) { }

	loginForm: FormGroup;
	public isBusy = false;
  	public hasFailed = false;
 	showInputErrors = true;

	ngOnInit() {
		this._formValidate();
	}

	get f() { return this.loginForm.controls; }

	_formValidate() {
		// Here we have used a form builder and an array to allow for multiple validation rules on a form.
		this.loginForm = this.fb.group(
		  {
			emailAddress: ['', Validators.compose([Validators.required, Validators.email])],
			pwd: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
		  },
		  {
			//validator: MustMatch('pwd', 'cnfPwd')
		  }
		);
	}

	doSignIn() {
		if (this.loginForm.invalid) {
	      this.showInputErrors = true;
	      return;
	    }

	    // Reset status
	    this.isBusy = true;
	    this.hasFailed = false;

	    // Grab values from form
	    let username = this.loginForm.get('emailAddress').value;
    	this.session.emailAddress = username;

	    let password = this.loginForm.get('pwd').value;

	    /*if (username=='user') {
	    	this.router.navigate(['/myaccount']);
	    	return;
		}*/
		
		if (username=='admin@admin.com' && password=='admin123$') {
	    	this.router.navigate(['/users']);
	    	return;
	    }
	    
		let loginDetails = [];
		loginDetails.push(Object.assign({'username': username},{'password': password}));
		loginDetails = loginDetails[0];

	    // Submit request to API
	    this.dataAccess
	    .signIn(loginDetails)
	    .subscribe(
	        (response) => {
	          this.auth.doSignIn(
	            response.token, response.userDetails.user.id
	            //response.name
	          );
	          if(response.userDetails.user.roles[0].role == 'ADMIN'){
	          	this.router.navigate(['/users']);
	          }else if(response.userDetails.user.roles[0].role == 'user'){
	          	//stepper.next();
	          	this.router.navigate(['/myaccount']);
	          	/*this.dataAccess.getMyAccTrials().subscribe( data => {
		      		if(data == '' ) { 
		      			//this.session.trials = false;
		      			stepper.next();
		      		} else if ( data != '' ) {
		      			this.router.navigate(['/myaccount']);
		      		}
		  		});*/

	          	//let step = this.ngAfterViewInit();
	          	//this.stepper.selectedIndex = 2;

	          }


		    },
	        (error) => {
	          this.isBusy = false;
			  this.hasFailed = true;
			  //this.router.navigate(['/myaccount']);
	          return;
	        }
	    );
	}

}
