import { Component, Input, OnInit } from '@angular/core';
import { userModel } from 'src/app/models/user.models';

@Component({
  selector: 'app-lateral-profile-bar',
  templateUrl: './lateral-profile-bar.component.html',
  styleUrls: ['./lateral-profile-bar.component.scss']
})
export class LateralProfileBarComponent implements OnInit {

  @Input() profile : userModel;

  constructor() { }

  ngOnInit(): void {
  }

}
