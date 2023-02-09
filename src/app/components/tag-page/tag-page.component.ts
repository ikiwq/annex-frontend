import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { PostModel } from 'src/app/models/post-model';
import { PostService } from 'src/app/services/post/post.service';

@Component({
  selector: 'app-tag-page',
  templateUrl: './tag-page.component.html',
  styleUrls: ['./tag-page.component.scss']
})
export class TagPageComponent implements OnInit {

  openedAt = new Date().toUTCString();
  postList = new BehaviorSubject<PostModel[]>([]);
  isLoading : Boolean = false;

  tag : string;

  constructor(private postService : PostService, private activatedRoute : ActivatedRoute) { }

  ngOnInit(): void {

    this.postService.getLoading().subscribe({
      next: (bool) => this.isLoading = bool
    })
    
    this.activatedRoute.params.subscribe((params)=>{
      this.tag = params["tag"];
      this.tag = this.tag.toLowerCase();

      this.postService.retrieveTagPage(this.tag, this.openedAt);

      this.postService.getTagPage().subscribe({
        next: (posts) =>{this.postList.next(posts);}
      })
    })

    this.postService.getLoading().subscribe((bool)=> this.isLoading = bool);
    
  }

}
