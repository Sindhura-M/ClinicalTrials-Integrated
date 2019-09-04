import { Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AuthService } from '.././auth.service';
import { Router, Params } from '@angular/router';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css']
})
export class StepperComponent {
  title = 'clinical-trials-connect-angular';
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  user: any;

  constructor(private _formBuilder: FormBuilder, public authService: AuthService, private router: Router) {}

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

   onGoogleLogin(stepper: MatStepper){
    this.authService.doGoogleLogin()
      .then(res => {
        stepper.next();
        this.router.navigate(['/login']);
        this.user = res.user.displayName;
      })
   }
}
