import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TagModel } from 'src/app/models/tag-model';
import { userModel } from 'src/app/models/user-model';
import { UserService } from 'src/app/services/user/user.service';
import { TagService } from 'src/app/services/tag/tag.service';

@Component({
  selector: 'app-lateral-homebar',
  templateUrl: './lateral-homebar.component.html',
  styleUrls: ['./lateral-homebar.component.scss']
})
export class LateralHomebarComponent implements OnInit {

  public suggestedList = new BehaviorSubject<userModel[]>([]);
  public tagList = new BehaviorSubject<TagModel[]>([]);

  constructor(private userService : UserService, private tagService : TagService) { }
  
  ngOnInit(): void {
    this.userService.getSuggestedProfiles().subscribe((profiles)=> this.suggestedList.next(profiles));
    this.tagService.getPopular().subscribe((tags)=> this.tagList.next(tags));
  }

}
