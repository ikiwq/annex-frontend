import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { PostModel } from 'src/app/models/post-model';
import { PostService } from 'src/app/services/post/post.service';

@Component({
  selector: 'app-user-liked',
  templateUrl: './user-liked.component.html',
  styleUrls: ['./user-liked.component.scss']
})
export class UserLikedComponent implements OnInit {
  username : string;

  likedList = new BehaviorSubject<PostModel[]>([]);

  isLoading : Boolean = false;

  constructor(private activatedRoute : ActivatedRoute, private postService : PostService) {
  }

  ngOnInit(): void {
    this.postService.getLoading().subscribe({
      next: (bool) => this.isLoading = bool
    })
    
    this.activatedRoute.parent.params.subscribe((params)=>{
      this.username = params["username"];
      this.postService.retrieveLikedFromUser(this.username);

      this.postService.getLikedFromUser().subscribe({
        next: (posts) =>{this.likedList.next(posts);}
      })
    })
  }

  requestPostPage() : void {
    if(this.isLoading) return ;
    this.postService.retrieveLikedFromUser(this.username);
  }

}
