import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ControlContainer, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from '../user.model';
import { Router, Params } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})

export class WelcomeComponent implements OnInit {
	  user: User = new User();
	  public form: FormGroup;
	  public control : FormControl;
	  //@Input() postcode : any;
	  postcode;

	  constructor(private controlContainer: ControlContainer, private route: ActivatedRoute) { }

	  ngOnInit() {
	    this.route.data.subscribe(routeData => {
	      let data = routeData['data'];
	      if (data) {
	        this.user = data;
	        console.log(this.user);
	        //this.createForm(this.user.name);
	      }
	    })

	    this.form = <FormGroup>this.controlContainer.control;
	    this.postcode = <FormControl>this.form.get(this.postcode);
	  }
}