import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PostDictionary } from 'src/app/models/post.models';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  @Input() postListObservable : Observable<PostDictionary> = new Observable();
  @Input() postIdsObservable : Observable<number[]> = new Observable();

  postList : PostDictionary = {};

  constructor() {
  }

  ngOnInit(): void {
    this.postListObservable.subscribe((posts)=>this.postList = posts);
  }
}
