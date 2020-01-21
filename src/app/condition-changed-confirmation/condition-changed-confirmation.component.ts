import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
@Component({
  selector: 'app-condition-changed-confirmation',
  templateUrl: './condition-changed-confirmation.component.html',
  styleUrls: ['./condition-changed-confirmation.component.css']
})
export class ConditionChangedConfirmationComponent implements OnInit {
  public confirmMessage:string;
  constructor(public dialogRef: MatDialogRef<ConditionChangedConfirmationComponent>) { }

  ngOnInit() {
  }

}
