import { Component, OnInit } from '@angular/core';
import { DataAccessService } from '../services/data-access.service';
import { FormBuilder, FormGroup, ControlContainer, FormControl } from '@angular/forms';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {

  	constructor(private dataAccess: DataAccessService, private formBuilder: FormBuilder) { }

  	myAccForm: FormGroup;
	public accountProfile: any = [];

	ngOnInit() {

		/*this.dataAccess.getAccountProfile().subscribe( data => {
			this.accountProfile = data[0];
			this.myAccForm.patchValue({firstName: this.accountProfile.firstName});
		});*/
  	}
}
