import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PostDictionary } from 'src/app/models/post.models';
import { SharedService } from 'src/app/services/auth/shared/shared.service';
import { PostService } from 'src/app/services/post/post.service';

@Component({
  selector: 'app-reccomended-posts-view',
  templateUrl: './reccomended-posts-view.component.html',
  styleUrls: ['./reccomended-posts-view.component.scss']
})
export class ReccomendedPostsViewComponent implements OnInit {

  loggedIn : boolean = false;

  posts = new BehaviorSubject<PostDictionary>({});
  postsIds = new BehaviorSubject<number[]>([]);

  constructor(private authService : SharedService, private postService : PostService) { }

  ngOnInit(): void {
    this.postService.getPostsStorage().subscribe((posts)=>{this.posts.next(posts)});
    this.postService.getPostIdsMap().subscribe((ids)=>{this.postsIds.next(ids["reccomended"])});
    this.authService.getCurrentUser().subscribe((user)=>{
      if(user){
        this.loggedIn = true;
        return;
      }
      this.loggedIn = false;
    });
  }

  requestPostPage(){
    this.postService.retrieveReccomendedPosts();
  }

}
