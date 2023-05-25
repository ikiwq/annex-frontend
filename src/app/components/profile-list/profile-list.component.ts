import { Component, Input, OnInit } from '@angular/core';
import { userModel } from 'src/app/models/user.models';

@Component({
  selector: 'app-profile-list',
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.scss']
})
export class ProfileListComponent implements OnInit {
  @Input() public profileList : userModel[];
  
  constructor() { }

  ngOnInit(): void {
  }

}
