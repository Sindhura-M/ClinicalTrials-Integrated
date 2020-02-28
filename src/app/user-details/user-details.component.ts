import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { DataAccessService } from '../services/data-access.service';
import { UsersListService } from '../services/users-list.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
	

  constructor(private http: DataAccessService, private usersList : UsersListService, private fb: FormBuilder, private router: Router, private route:ActivatedRoute) { }
 
//userDetailsForm: FormGroup;
//   submitted = false;
  public dataSource: any = this.usersList.getData();
  error: String[];
  fullName: String;
  userObj: any;
  selectedUserObj: any = [];

  ngOnInit() {
  	let id = parseInt(this.route.snapshot.paramMap.get('userId'));
    //this.http.getUserDetails().subscribe( data => {
    //this.dataSource = data;

    this.userObj = this.dataSource.filter(function (tmp) {
                     return tmp.quesId === id;
                });
    this.selectedUserObj = this.userObj[0];
    this.fullName = this.selectedUserObj.account.firstName + ' ' + this.selectedUserObj.account.lastName;
  }


  goBack(event) {
	 this.router.navigate(['/users']);
  }

}
