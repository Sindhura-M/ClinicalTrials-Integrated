import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ControlContainer, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from '../user.model';
import { Router, Params } from '@angular/router';
import { dayKey, monthKey, yearKey } from '.././datemodel';
import { DataAccessService } from '../services/data-access.service';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})

export class WelcomeComponent implements OnInit {
	  user: User = new User();
	  public myGroup: FormGroup;
	  public control : FormControl;
	  //@Input() postcode : any;
	  postcode;
	  public accountProfile: any = [];

	  constructor(private controlContainer: ControlContainer, private route: ActivatedRoute, private dataAccess: DataAccessService) { }

	  ngOnInit() {
	    this.route.data.subscribe(routeData => {
	      let data = routeData['data'];
	      if (data) {
	        this.user = data;
	        console.log(this.user);
	        //this.createForm(this.user.name);
	      }
	    })

	    this.dataAccess.getAccountProfile().subscribe( data =>
         this.accountProfile=data[0]);
         
	    

	    this.myGroup = <FormGroup>this.controlContainer.control;
	    this.postcode = <FormControl>this.myGroup.get(this.postcode);
 
	  }

	  	day: String[] = [ "0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31"];
	    month: String[] = [ "Jan", "Feb", "March", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
	    year: String[] = [ "1990", "1991", "1992", "1993", "1994", "1995", "1996", "1997", "1998", "1999", 
	    					"2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009",
	    					"2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019" ];
}