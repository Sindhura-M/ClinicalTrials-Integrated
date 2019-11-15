import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ControlContainer, FormControl } from '@angular/forms';
import { AuthService } from '.././auth.service';
import { DataAccessService } from '../services/data-access.service';
import { Router, Params } from '@angular/router';
import { MatStepper } from '@angular/material/stepper';
import {MatDialog} from '@angular/material'

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
			emailAddress: ['', Validators.compose([Validators.required, Validators.email])],
			pwd: ['', Validators.required]
		  },
		  {
			//validator: MustMatch('pwd', 'cnfPwd')
		  }
		);
	}

	/*doSignIn() : void {
		if (this.loginForm.invalid) {
	      this.showInputErrors = true;
	      return;
	    }

	    // Reset status
	    this.isBusy = true;
	    this.hasFailed = false;

	    // Grab values from form
	    const username = this.loginForm.get('emailAddress').value;
	    const password = this.loginForm.get('pwd').value;

	    // Submit request to API
	    this.dataAccess
	    .signIn(username, password)
	    .subscribe(
	        (response) => {
	          this.auth.doSignIn(
	            response.token,
	            response.name
	          );
	          this.router.navigate(['/myaccount']);
	        },
	        (error) => {
	          this.isBusy = false;
	          this.hasFailed = true;
	        }
	    );
	  }*/


}
