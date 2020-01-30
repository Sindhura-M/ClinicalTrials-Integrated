import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { DataAccessService } from '../services/data-access.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
	

  constructor(private http: DataAccessService ,private fb: FormBuilder, private router: Router, private route:ActivatedRoute) { }
 
//userDetailsForm: FormGroup;
//   submitted = false;
  public dataSource: any = [];
  error: String[];
  fullName: String;
  userObj: any;
  selectedUserObj: any = [];
//   user: any;
//   name: any;
//   email: any;

  ngOnInit() {
  	//this._formValidate();
    let id = this.route.snapshot.paramMap.get('userId');
	  this.http.getUserDetails().subscribe( data => {
			this.dataSource = data;
      this.userObj = this.dataSource.filter(function (tmp) {
                       return tmp.id === id;
                  });
      console.log("userObj", JSON.stringify(this.userObj));
      this.selectedUserObj = this.userObj[0];
      this.fullName = this.userObj[0].firstName + ' ' + this.userObj[0].lastName;
		},
	      error => {
	        this.error = error;
		});
	}

 //get f() { return this.userDetailsForm.controls; }

 /* _formValidate() {
    this.userDetailsForm = this.fb.group();
  }*/

 goBack() {
	 this.router.navigate(['/users']);
  }

}
