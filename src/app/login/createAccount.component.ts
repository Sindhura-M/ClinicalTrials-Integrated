import { Component, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { dataAccountProfile } from '../services/dataAccountProfile.service';
import { DataAccessService } from '../services/data-access.service';
import { AuthService } from '.././auth.service';

@Component({
  selector: 'app-createAccount',
  templateUrl: './createAccount.component.html',
  styleUrls: ['./createAccount.component.scss']
})

export class CreateAccountComponent implements OnInit {

title = 'Angular6 Reactive forms custom validation';

	createAccForm: FormGroup;
	submitted = false;
	mustMatch;


  constructor(private fb: FormBuilder, private router: Router, private dataAccountProfile: dataAccountProfile, private dataAccess: DataAccessService, private auth: AuthService) { }


  ngOnInit() {
	this._formValidate();
	//let pp = this.dataAccountProfile.getData();
  }

   get f() { return this.createAccForm.controls; }

  _formValidate() {
	this.createAccForm = this.fb.group(
	  {
		firstName: ['', Validators.required],
		lastName: ['', Validators.required],
		emailAddress: ['', Validators.compose([Validators.required, Validators.email])],
		cnfemail: ['', Validators.compose([Validators.required, Validators.email])],
		password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
		cnfPwd: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
	  },
	  {
		validator: MustMatch('emailAddress','cnfemail', 'password', 'cnfPwd')
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


		/*const username = this.createAccForm.get('firstName').value;
	    const password = this.createAccForm.get('pwd').value;
	    let objecttt = {"username" : "abc", "password":"123456"};

		this.dataAccess
	    .register(objecttt)
	    .subscribe(
	        (response) => {
	          this.auth.doSignIn(
	            response.jwttoken
	            //response.name
	          );
	          this.router.navigate(['/myaccount']);
	        },
	        (error) => {
	          console.log('error');
	        }
	    );*/

	}

}

export function MustMatch(email: string, cnfEmail: string, controlName: string, matchingControlName: string) {
	return (formGroup: FormGroup) => {
		const control = formGroup.controls[controlName];
		const matchingControl = formGroup.controls[matchingControlName];
		const emailControl = formGroup.controls[email];
		const cnfEmailControl = formGroup.controls[cnfEmail];
		
		// set error on matchingControl if validation fails
		if (emailControl.value !== cnfEmailControl.value) {
			cnfEmailControl.setErrors({ mustMatch: true });
		} else {
			cnfEmailControl.setErrors(null);
		}

		
		// set error on matchingControl if validation fails
		if (control.value !== matchingControl.value) {
			matchingControl.setErrors({ mustMatch: true });
		} else {
			matchingControl.setErrors(null);
		}

		
	}
}
