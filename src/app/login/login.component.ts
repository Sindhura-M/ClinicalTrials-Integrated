import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, ControlContainer, FormControl } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	public form: FormGroup;
  public control : FormControl;
  @Input() email : any;
  @Input() password : any;

  constructor(private controlContainer: ControlContainer) { }

  ngOnInit() {
  	this.form = <FormGroup>this.controlContainer.control;
    this.email = <FormControl>this.form.get(this.email);
    this.password = <FormControl>this.form.get(this.password);
  }

 

}
