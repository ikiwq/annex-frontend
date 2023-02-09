import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { PostModel } from 'src/app/models/post-model';
import { PostService } from 'src/app/services/post/post.service';

@Component({
  selector: 'app-user-saved',
  templateUrl: './user-saved.component.html',
  styleUrls: ['./user-saved.component.scss']
})
export class UserSavedComponent implements OnInit {
  username : string;

  openedAt : string = new Date().toUTCString();
  savedList = new BehaviorSubject<PostModel[]>([]);

  isLoading : Boolean = true;

  constructor(private activatedRoute : ActivatedRoute, private postService : PostService) {
  }

  ngOnInit(): void {

    this.postService.getLoading().subscribe({
      next: (bool) => this.isLoading = bool
    })

    this.activatedRoute.parent.params.subscribe((params)=>{
      this.username = params["username"];

      this.postService.retrieveSavedFromUser(this.username, this.openedAt);

      this.postService.getSavedFromuser().subscribe({
        next: (posts) =>{this.savedList.next(posts);}
      })

    })
  }

  requestPostPage() : void {
    if(this.isLoading) return ;
    this.postService.requestSavedPage(this.username, this.openedAt);
  }

}
