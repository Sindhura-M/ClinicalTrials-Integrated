import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.scss']
})

export class Step1Component implements OnInit {

  constructor() { }

  ngOnInit() {
  	this.registerView= "regView";
  }

  loginClick() {
  	this.registerView= "regView1";
  }

  createAccountClick() {
  	this.registerView= "regView2";
  }

}