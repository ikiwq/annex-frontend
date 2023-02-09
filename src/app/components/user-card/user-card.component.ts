import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/auth/shared/shared.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {

  public currentProfile : any;

  constructor(private sharedService : SharedService) { 
    this.sharedService.getCurrentUser().subscribe((profile)=>{this.currentProfile = profile;});
  }

  ngOnInit(): void {
  }

}
