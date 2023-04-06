import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { userModel } from 'src/app/models/user-model';
import { SharedService } from 'src/app/services/auth/shared/shared.service';
import { FollowService } from 'src/app/services/follow/follow.service';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss']
})
export class ProfileCardComponent implements OnInit {
  @Input() profile : userModel;
  
  constructor(private followService : FollowService, private authService : SharedService, private router : Router) { }

  ngOnInit(): void {
  }

  followUser(profile : userModel, event : Event){
    if(this.authService.getMail() == null){
      this.router.navigate(['/login']);
      return ;
    }
    this.followService.followUser(profile.username).subscribe();
    profile.followed = !profile.followed;
    event.stopPropagation();
  }

}
