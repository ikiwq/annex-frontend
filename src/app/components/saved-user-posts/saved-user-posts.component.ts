import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { PostDictionary } from 'src/app/models/post.models';
import { PostService } from 'src/app/services/post/post.service';

@Component({
  selector: 'app-saved-user-posts',
  templateUrl: './saved-user-posts.component.html',
  styleUrls: ['./saved-user-posts.component.scss']
})
export class SavedUserPostsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private postService: PostService) { }

  public postList = new BehaviorSubject<PostDictionary>({});
  public postIdsList = new BehaviorSubject<number[]>([]);

  public loading : Boolean = true;

  private username: string;

  ngOnInit(): void {
    this.route.parent.params.subscribe((params) => {
      this.username = params["username"];
      this.postService.retrievePostByUserInteraction(this.username, "SAVED");

      this.postService.getPostsStorage().subscribe((posts) => this.postList.next(posts));
      this.postService.getPostIdsMap().subscribe((ids) => {
        if (ids[this.username + "-" + "SAVED"]) {
          this.postIdsList.next(ids[this.username + "-" + "SAVED"]);
          return;
        }
        this.postIdsList.next([]);
      })
    })

    this.postService.getLoading().subscribe((bool)=>this.loading = bool);
  }

  requestPage() {
    if (!this.username) return;
    this.postService.retrievePostByUserInteraction(this.username, "SAVED");
  }

}
