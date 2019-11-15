import { Component, OnInit} from '@angular/core';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AuthService } from '.././auth.service';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router, Params } from '@angular/router';
import { MatStepper } from '@angular/material/stepper';

@Component({
	selector: 'app-stepper',
	templateUrl: './stepper.component.html',
	styleUrls: ['./stepper.component.scss']
})

@Injectable()
export class StepperComponent implements CanActivate{
	title = 'clinical-trials-connect-angular';
	isLinear = false;
	firstFormGroup: FormGroup;
	secondFormGroup: FormGroup;
	user: any;
	loggedIn:boolean = false;

	constructor(private _formBuilder: FormBuilder, public authService: AuthService, private router: Router) {}

	canActivate(_route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
			if (this.loggedIn) {
					return true;
			}

			// else route them to a variation of the route
			//this.router.navigate([state.url, 'login']);
			/*let parentUrl = state.url
				.slice(0, state.url.indexOf(route.url[route.url.length - 1].path));

			this.router.navigate([parentUrl, 'login']);*/
			//this.router.navigate(['/notLogged']);
			window.location.reload();
			return false;
	}
	ngOnInit() {
		this.firstFormGroup = this._formBuilder.group({
			email: ['', Validators.required],
			password: ['',Validators.required]
		});
		this.secondFormGroup = this._formBuilder.group({
			postcode: ['', Validators.required],
			dob: ['', Validators.required],
			gender: ['', Validators.required]
		});
	}

	 onGoogleLogin(stepper: MatStepper){
		this.authService.doGoogleLogin()
			.then(res => {
				stepper.next();
				this.router.navigate(['/login']);
				this.user = res.user.displayName;
				this.authService.doSignIn(
		            res.token,
		            res.user.displayName
	            );
			})
	}
}
