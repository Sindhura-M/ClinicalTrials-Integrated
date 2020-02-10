import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators, ControlContainer, FormControl } from '@angular/forms';
import { AuthService } from '../auth.service';
import { DataAccessService } from '../services/data-access.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css']
})
export class AddAdminComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddAdminComponent>,private fb: FormBuilder, private router:Router,public auth: AuthService,private dataAccess: DataAccessService) { }
  addAdminForm: FormGroup;
  ngOnInit() {
  }
  // Grab values from form
  doSignIn() : void{
    let username = this.addAdminForm.get('username').value;
    let password = this.addAdminForm.get('password').value;

    let addAdminDetails = [];
		addAdminDetails.push(Object.assign({'username': username},{'password': password}));
		addAdminDetails = addAdminDetails[0];

    this.dataAccess
	    .signIn(addAdminDetails)
	    .subscribe(
	        (response) => {
	          this.auth.doSignIn(
	            response.token
	            //response.name
	          );
	          this.router.navigate(['/users']);
	        },
	        (error) => {
	          return;
	        }
	    );
  }
}
