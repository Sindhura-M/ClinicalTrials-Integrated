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
	public form: FormGroup;
	public control : FormControl;
	@Input() email : any;
	//@Input() password : any;
	user = '';

	/*this.myGroup = new FormGroup({
       firstName: new FormControl()
    });*/
	constructor(private controlContainer: ControlContainer, public authService: AuthService, private router: Router ) { }

	ngOnInit() {
		//this.form = <FormGroup>this.controlContainer.control;
		//this.email = <FormControl>this.form.get(this.email);
		//this.password = <FormControl>this.form.get(this.password);
	}

	username: string;
	password: string;

	login() : void {
	    if (this.username == 'admin' && this.password == 'admin') {
	     	this.router.navigate(["user"]);
	    } else {
	      	alert("Invalid credentials");
	    }
	}

	/*toggleClass(e, egClass) {
	  const hasClass = event.target.classList.contains(egClass);
	  const child = this.parent.children;
	  if(hasClass) {
	    this.renderer.removeClass(event.target, 'display');
	  } else {
	    this.renderer.addClass(event.target, 'display');
	  }
	}*/
}
