import { Component, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { dataAccountProfile } from '../services/dataAccountProfile.service';
import { DataAccessService } from '../services/data-access.service';
//import { PasswordValidator } from '../helpers/PasswordValidator';
//import { EmailValidator } from '../helpers/EmailValidator';

@Component({
  selector: 'app-createAccount',
  templateUrl: './createAccount.component.html',
  styleUrls: ['./createAccount.component.scss']
})

export class CreateAccountComponent implements OnInit {

title = 'Angular6 Reactive forms custom validation';

  createAccForm: FormGroup;
   submitted = false;

  constructor(private fb: FormBuilder, private router: Router, private dataAccountProfile: dataAccountProfile, private dataAccess: DataAccessService) { }


  ngOnInit() {
	this._formValidate();
  }

   get f() { return this.createAccForm.controls; }

  _formValidate() {
	this.createAccForm = this.fb.group(
	  {
		firstName: ['', Validators.required],
		lastName: ['', Validators.required],
		emailAddress: ['', Validators.compose([Validators.required, Validators.email])],
		cnfemail: ['', Validators.compose([Validators.required, Validators.email])],
		pwd: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
		cnfPwd: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
	  },
	  {
		validator: MustMatch('pwd', 'cnfPwd')
	  }
	);

	//matchEmail(this.createAccForm.get('emailAddress').value, this.createAccForm.get('cnfemail').value);
  }

  	onSubmit() {
		this.submitted = true;

		// stop here if form is invalid
		if (this.createAccForm.invalid) {
			return;
		}

		let temp = [];
		temp.push(Object.assign({role: "user"},this.createAccForm.value));
		this.dataAccountProfile.setData(temp);

	}

	matchEmail(controlName: string, matchingControlName: string) {

		if( controlName !== matchingControlName) {
			this.f.cnfemail.errors.mustMatch = true;
		}
	}

}

export function MustMatch(controlName: string, matchingControlName: string) {
	return (formGroup: FormGroup) => {
		const control = formGroup.controls[controlName];
		const matchingControl = formGroup.controls[matchingControlName];

		if (matchingControl.errors && !matchingControl.errors.mustMatch) {
			// return if another validator has already found an error on the matchingControl
			return;
		}

		// set error on matchingControl if validation fails
		if (control.value !== matchingControl.value) {
			matchingControl.setErrors({ mustMatch: true });
		} else {
			matchingControl.setErrors(null);
		}
	}
}
