import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { userModel } from 'src/app/models/user-model';
import { SharedService } from 'src/app/services/auth/shared/shared.service';

@Component({
  selector: 'app-mobile-menu',
  templateUrl: './mobile-menu.component.html',
  styleUrls: ['./mobile-menu.component.scss']
})
export class MobileMenuComponent implements OnInit {
  public user : userModel;

  constructor(private sharedService : SharedService, private router : Router) {
    sharedService.getCurrentUser().subscribe((user)=>{
      this.user = user;
    });
  }

  ngOnInit(): void {
  }

  goToProfile() : void {
    if(this.user == null){
      this.router.navigate(["/login"]);
      return ;
    }
    this.router.navigate(["profile/", this.user.username]);
  }

}
