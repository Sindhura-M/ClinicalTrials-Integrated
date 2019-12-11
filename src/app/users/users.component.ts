import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, Params } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private router:Router, private fb: FormBuilder) {}

  userDataForm: FormGroup;

  public dataSource: any = [];
  ngOnInit() {
    this._formValidate();
  	this.dataSource = [	{id: "0", name:"Mary Alice", email: "mary.alice@xmail.com", role:"user", action:"[Edit, Delete]"},
  						{id: "1", name:"Brenda Cooper", email: "brendacooper@hmail.com", role:"admin", action:"[Edit, Delete]"},
  						{id: "2", name:"June Scavo", email: "junescavo@abc.com", role:"user", action:"[Edit, Delete]"}
  					  ];
  }


  _formValidate() {
    this.userDataForm = this.fb.group(
      {
        name: ['', Validators.required],
        age: ['', Validators.required],
        sex: ['', Validators.required]
      }
    );
  }

  displayedColumns: String[] = ['Id', 'Name', 'Email', 'Role', 'Action'];

  next(e) {
  	this.router.navigate(['/userdetails/:new']);
  }
}
