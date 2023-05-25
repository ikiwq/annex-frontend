import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { PostDictionary } from 'src/app/models/post.models'; 
import { PostService } from 'src/app/services/post/post.service';
import { SearchService } from 'src/app/services/search/search.service'

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {

  public isLoading : Boolean = false;
  public postList = new BehaviorSubject<PostDictionary>({});
  public postIdsList = new BehaviorSubject<number[]>([]);

  private search : string;

  constructor(private postService : PostService, private searchService: SearchService, private activatedRoute : ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params)=>{
      this.search = params["search"];
      let query = this.search + "-SEARCH";

      this.postService.getLoading().subscribe((bool)=>this.isLoading = bool);
      this.postService.retrievePostByText(this.search);

      this.postService.getPostsStorage().subscribe((posts)=>{
        this.postList.next(posts);
      });

      this.postService.getPostIdsMap().subscribe((ids)=>{
        if(ids[query]){
          this.postIdsList.next(ids[query]);
          return ;
        }
        this.postIdsList.next([]);
      });
      
      this.searchService.setCurrentSearch(this.search);
    })
  }

  getPostPage() : void {
    if (this.isLoading) return ;
    this.postService.retrievePostByText(this.search);
  }

}
