import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, Params } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material';
import { HttpClient } from "@angular/common/http";
import { ExportToExcelService } from '../services/export-to-excel.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(private router:Router, private fb: FormBuilder, public dialog: MatDialog, private httpClient: HttpClient, private excelService:ExportToExcelService) {}
  dialogRef: MatDialogRef<ConfirmationDialogComponent>;
  // userDataForm: FormGroup;
  public dataSource: any = [];
  // public dataSource1: any = [];
  ngOnInit() {
    // this._formValidate();
  	// this.dataSource = [	{id: "0", name:"Mary Alice", email: "mary.alice@xmail.com", role:"user", action:"[Edit, Delete]"},
  	// 					{id: "1", name:"Brenda Cooper", email: "brendacooper@hmail.com", role:"admin", action:"[Edit, Delete]"},
  	// 					{id: "2", name:"June Scavo", email: "junescavo@abc.com", role:"user", action:"[Edit, Delete]"}
    // 				  ];
    this.httpClient.get("assets/users.json").subscribe(data =>{
      console.log(data);
      this.dataSource = data;
      })
    // this.httpClient.get("assets/hospitals.json").subscribe(data =>{
    //     console.log(data);
    //     this.dataSource1 = data;
    //   })
  }


  // _formValidate() {
  //   this.userDataForm = this.fb.group(
  //     {
  //       name: ['', Validators.required],
  //       age: ['', Validators.required],
  //       sex: ['', Validators.required]
  //     }
  //   );
  // }

  displayedColumns: String[] = ['Id', 'Name', 'Email', 'Role', 'Action'];
  // displayedColumns1: String[] = ['Key', 'Hospital', 'Post Code','Action'];
  // next(e) {
  // 	this.router.navigate(['/userdetails/:new']);
  // }

  openConfirmationDialog(e) {
    this.dialogRef = this.dialog.open(ConfirmationDialogComponent,  
    {
      disableClose: false
    });
    this.dialogRef.componentInstance.confirmMessage = "Are you sure you want to delete?"
    this.dialogRef.afterClosed().subscribe(result => {
      if(result) {
        // do confirmation actions
      }
      this.dialogRef = null;
    });
  }
  exportAllUsers():void {
    this.excelService.exportExcel(this.dataSource, 'users');
  }
  // exportHospitalsAsXLSX():void {
  //   this.excelService.exportExcel(this.dataSource1, 'hospitals');
  // }
  // addHospital(e) {
  // 	this.router.navigate(['/hospitaldetails']);
  // }
}
