import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { MatTooltipModule } from '@angular/material';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

  constructor( public auth: AuthService ) { }

  ngOnInit() { }

  doSignOut() : void {
  	this.auth.doSignOut();
  }
}