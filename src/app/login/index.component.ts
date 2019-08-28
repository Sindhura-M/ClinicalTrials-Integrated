import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html'
})

export class IndexComponent implements OnInit {

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