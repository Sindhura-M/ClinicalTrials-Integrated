import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, Params } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material';
import { HttpClient } from "@angular/common/http";
import { ExportToExcelService } from '../services/export-to-excel.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { DataAccessService } from '../services/data-access.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(private http: DataAccessService, private router:Router, private fb: FormBuilder, public dialog: MatDialog, private httpClient: HttpClient, private excelService:ExportToExcelService) {}
  dialogRef: MatDialogRef<ConfirmationDialogComponent>;
  public dataSource: any = [];
  ngOnInit() {

    this.http.getUserDetails().subscribe( data => {
      this.dataSource = data;
    });
  }

  displayedColumns: String[] = ['Id', 'Name', 'Email','Action'];


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
}
