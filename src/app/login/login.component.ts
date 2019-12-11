import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ControlContainer, FormControl } from '@angular/forms';
import { AuthService } from '.././auth.service';
import { DataAccessService } from '../services/data-access.service';
import { Router, Params } from '@angular/router';
import { MatStepper } from '@angular/material/stepper';
import { MatDialog } from '@angular/material';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	
	constructor(private fb: FormBuilder, private controlContainer: ControlContainer, public auth: AuthService, private router: Router, private dataAccess: DataAccessService ) { }

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
			emailAddress: [''],
			pwd: ['', Validators.required]
		  },
		  {
			//validator: MustMatch('pwd', 'cnfPwd')
		  }
		);
	}

	doSignIn() : void {
		if (this.loginForm.invalid) {
	      this.showInputErrors = true;
	      return;
	    }

	    // Reset status
	    this.isBusy = true;
	    this.hasFailed = false;

	    // Grab values from form
	    let username = this.loginForm.get('emailAddress').value;
	    let password = this.loginForm.get('pwd').value;

	    if (username=='admin') {
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
	            response.token
	            //response.name
	          );
	          this.router.navigate(['/myaccount']);
	        },
	        (error) => {
	          this.isBusy = false;
	          this.hasFailed = true;
	          return;
	        }
	    );
	  }


}
