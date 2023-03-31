import { Component, OnInit} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { userModel } from 'src/app/models/user-model';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  public suggestedList = new BehaviorSubject<userModel[]>([]);

  constructor(private userService : UserService) { }

  ngOnInit(): void {
    this.userService.getSuggestedProfiles().subscribe((profiles)=> this.suggestedList.next(profiles));
  }

}
