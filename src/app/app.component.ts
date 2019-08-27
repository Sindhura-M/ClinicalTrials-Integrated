import { Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'clinical-trials-connect-angular';
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      email: ['', Validators.required],
      password: ['',Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      postcode: ['', Validators.required],
      dob: ['', Validators.required],
      gender: ['', Validators.required]
    });
  }
}
