import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { PostDictionary } from 'src/app/models/post.models';
import { PostService } from 'src/app/services/post/post.service';

@Component({
  selector: 'app-liked-user-posts',
  templateUrl: './liked-user-posts.component.html',
  styleUrls: ['./liked-user-posts.component.scss']
})
export class LikedUserPostsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private postService: PostService) { }

  public postList = new BehaviorSubject<PostDictionary>({});
  public postIdsList = new BehaviorSubject<number[]>([]);

  public loading : Boolean = false;

  private username: string;

  ngOnInit(): void {
    this.route.parent.params.subscribe((params) => {
      this.username = params["username"];
      this.postService.retrievePostByUserInteraction(this.username, "LIKED");

      this.postService.getPostsStorage().subscribe((posts) => this.postList.next(posts));
      this.postService.getPostIdsMap().subscribe((ids) => {
        if (ids[this.username + "-" + "LIKED"]) {
          this.postIdsList.next(ids[this.username + "-" + "LIKED"]);
          return;
        }
        this.postIdsList.next([]);
      })
    })

    this.postService.getLoading().subscribe((bool)=>this.loading = bool);
  }

  requestPage() {
    if (!this.username) return;
    this.postService.retrievePostByUserInteraction(this.username, "LIKED");
  }

}
