import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  constructor(private fb: FormBuilder, private router: Router, private route:ActivatedRoute) { }

  userDetailsForm: FormGroup;
  submitted = false;
  public dataSource: any = [];
  user: any;
  name: any;
  email: any;

  ngOnInit() {
  	this._formValidate();
  	
  	this.dataSource = [	{id: "0", name:"Mary Alice", email: "mary.alice@xmail.com", role:"user", action:"[Edit, Delete]"},
  						{id: "1", name:"Brenda Cooper", email: "brendacooper@hmail.com", role:"admin", action:"[Edit, Delete]"},
  						{id: "2", name:"June Scavo", email: "junescavo@abc.com", role:"user", action:"[Edit, Delete]"}
  					  ];

  	let userId = this.route.snapshot.paramMap.get('id');
  	this.user = this.dataSource[userId];
  	this.name = this.user.name;
  	this.email = this.user.email;

  	console.log('username', this.user.name);
  }

  get f() { return this.userDetailsForm.controls; }

  _formValidate() {
	this.userDetailsForm = this.fb.group(
	  {
		name: ['', Validators.required],
		email: ['', Validators.compose([Validators.required, Validators.email])],
		password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
		role: ['', Validators.required]
	  }
	);
  }

  onSave() {
	this.submitted = true;

	// stop here if form is invalid
	if (this.userDetailsForm.invalid) {
		//return;
	}

	this.router.navigate(['/users']);
  }

}
