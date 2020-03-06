import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, Params } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material';
import { HttpClient } from "@angular/common/http";
import { ExportToExcelService } from '../services/export-to-excel.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { DataAccessService } from '../services/data-access.service';
import { UsersListService } from '../services/users-list.service';
import { dataAccountProfile } from '../services/dataAccountProfile.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  addAdminForm: FormGroup;
  submitted = false;
  emailAddress: string = '';
  password: string = '';

  constructor(private dataAccountProfile: dataAccountProfile, private http: DataAccessService, private usersList : UsersListService, private router:Router, private fb: FormBuilder, public dialog: MatDialog, private httpClient: HttpClient, private excelService:ExportToExcelService) {}
  dialogRef: MatDialogRef<ConfirmationDialogComponent>;

   public roles: any = [];
  public dataSource: any = [];
  ngOnInit() {

    this.http.getUserDetails().subscribe( data => {
      this.dataSource = data;
      this.usersList.setData(data);
    });

    this._formValidate();
  }

  displayedColumns: String[] = ['Id', 'Name', 'Email','Action'];
  addAdminDetails:any = [];

  openConfirmationDialog($event, userId:number) {
    this.dialogRef = this.dialog.open(ConfirmationDialogComponent,  
    {
      disableClose: false
    });
    this.dialogRef.componentInstance.confirmMessage = "Are you sure you want to delete?"
    this.dialogRef.afterClosed().subscribe(result => {
      if(result) {
        //this.deleteUser(userId);
        this.http.removeUser(userId).subscribe( response => {
            if (response) {
              /*window.location.reload();*/
            }
          });
      }
      this.dialogRef = null;
      window.location.reload();
      /*this.http.getUserDetails().subscribe( data => {
        this.dataSource = data;
        this.usersList.setData(data);
      });*/
    });
  }
  exportAllUsers():void {

    let data = [];
    this.dataSource.forEach( tmp => { 
        data.push(tmp.account);
    })

    let results = [];
    for (var i = 0; i<data.length; i++) {
      //results = [ ...this.dataSource[i], ...data[i]];
      results.push(Object.assign({}, data[i], this.dataSource[i]));
    }

    this.excelService.exportExcel(results, 'users')  
  }

 /* this.addAdminForm = new FormGroup({
       username: new FormControl()
    });*/



    get f() { return this.addAdminForm.controls; }

  _formValidate() {
    this.addAdminForm = this.fb.group(
      {
      emailAddress: ['', Validators.required],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
      }
    );
  }


  addAdminUser($event){
    this.submitted = true;

    // stop here if form is invalid
    if (this.addAdminForm.invalid) {
      return;
    }
    
    let emailAddress = this.addAdminForm.get('emailAddress').value;
    let password = this.addAdminForm.get('password').value;
    this.addAdminDetails.push(Object.assign({'emailAddress': emailAddress},{'password': password}, {'roles':[{"role": "ADMIN"}]}));
    let tempData = this.addAdminDetails[0];

    this.dataAccountProfile.setData(tempData);
    
    this.http.addAdminUser().subscribe( data => {
      alert(data);
      if (data == 'Admin User added successfully') {
          this.emailAddress = '';
          this.password = '';
      }
    })
  }
}
