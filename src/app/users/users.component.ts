import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, Params } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material';
import { HttpClient } from "@angular/common/http";
import { ExportToExcelService } from '../services/export-to-excel.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { DataAccessService } from '../services/data-access.service';
import { UsersListService } from '../services/users-list.service';
import { AddAdminComponent } from '../add-admin/add-admin.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(private http: DataAccessService, private usersList : UsersListService, private router:Router, private fb: FormBuilder, public dialog: MatDialog, private httpClient: HttpClient, private excelService:ExportToExcelService) {}
  dialogRef: MatDialogRef<ConfirmationDialogComponent>;
  dialogRef1: MatDialogRef<AddAdminComponent>;
  public dataSource: any = [];
  ngOnInit() {

    this.http.getUserDetails().subscribe( data => {
      this.dataSource = data;
      this.usersList.setData(data);
    });
  }

  displayedColumns: String[] = ['Id', 'Name', 'Email','Action'];


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
    console.log('results',results);
    this.excelService.exportExcel(results, 'users')  
  }

  openAddAdminUser(){
    this.dialogRef1 = this.dialog.open(AddAdminComponent,  
      {
        disableClose: false
      });
      this.dialogRef.afterClosed().subscribe(result => {
        if(result) {

        }
      });
      this.dialogRef = null;
    }
}
