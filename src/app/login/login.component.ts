import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ControlContainer, FormControl } from '@angular/forms';
import { AuthService } from '.././auth.service';
import { Router, Params } from '@angular/router';
import { MatStepper } from '@angular/material/stepper';
import {MatDialog} from '@angular/material'

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	
	constructor(private fb: FormBuilder, private controlContainer: ControlContainer, public authService: AuthService, private router: Router ) { }

	loginForm: FormGroup;

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

	login() : void {
		
	}

}
