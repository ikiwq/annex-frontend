import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { SharedService } from './services/auth/shared/shared.service';
import { DarkModeServiceService } from './services/darkModeService/dark-mode-service.service';
import { PostService } from './services/post/post.service';
import { UserService } from './services/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit{
  title = 'frontend';

  darkMode : Boolean;

  constructor(private darkModeService : DarkModeServiceService, private authService : SharedService, 
    private postService : PostService, private userService : UserService){

  }

  ngOnInit(): void {
    this.darkModeService.initDarkMode();
    this.darkModeService.getDarkMode().subscribe((bool)=> this.darkMode = bool); 
    this.authService.retrieveUser();
    this.postService.retrieveReccomendedPosts();
    this.userService.retrieveSuggestedProfiles();
  }

}
