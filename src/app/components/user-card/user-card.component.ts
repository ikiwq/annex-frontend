import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/auth/shared/shared.service';
import { DarkModeService } from 'src/app/services/dark-mode-service/dark-mode.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {

  public currentProfile : any;
  public isDarkMode : Boolean;

  constructor(private sharedService : SharedService, private DMService : DarkModeService) { 
    this.sharedService.getCurrentUser().subscribe((profile)=>{this.currentProfile = profile;});
  }

  ngOnInit(): void {
    this.DMService.getDarkMode().subscribe((bool)=>{this.isDarkMode = bool});
  }

}
