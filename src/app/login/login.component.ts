import { Component, OnInit, Input } from '@angular/core';
import {FormBuilder, FormGroup, Validators, ControlContainer, FormControl } from '@angular/forms';
import { AuthService } from '.././auth.service';
import { Router, Params } from '@angular/router';
import { MatStepper } from '@angular/material/stepper';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	public form: FormGroup;
	public control : FormControl;
	@Input() email : any;
	@Input() password : any;

	constructor(private controlContainer: ControlContainer, public authService: AuthService, private router: Router) { }

	ngOnInit() {
		this.form = <FormGroup>this.controlContainer.control;
		this.email = <FormControl>this.form.get(this.email);
		this.password = <FormControl>this.form.get(this.password);
	}

	
	onGoogleLogin(stepper: MatStepper){
		this.authService.doGoogleLogin()
			.then(res => {
				stepper.next();
				this.router.navigate(['/welcome']);
				this.user = res.user.displayName;
			})
	 }
 

}
