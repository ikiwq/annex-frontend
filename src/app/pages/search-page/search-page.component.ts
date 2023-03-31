import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { PostModel } from 'src/app/models/post-model';
import { PostService } from 'src/app/services/post/post.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {

  openedAt : Date = new Date();
  isLoading : Boolean = false;

  postList = new BehaviorSubject<PostModel[]>([]);

  private search : string;

  page : number = 1;

  constructor(private postService : PostService, private activatedRoute : ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params)=>{
      this.openedAt = new Date();
      this.search = params["search"];
      
      this.postService.getLoading().subscribe((bool)=>this.isLoading = bool);
      this.postService.retrievePostByText(this.search, this.openedAt);
      this.postService.getPostList().subscribe((posts)=> this.postList.next(posts));
    })
    
  }

  getPostPage() : void {
    if (this.isLoading) return ;
    this.postService.getPostByTextPage(this.search, this.openedAt.toString());
  }

}
