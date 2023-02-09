import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PostModel } from 'src/app/models/post-model';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  @Input() postList : Observable<PostModel[]>;

  constructor() {
  }

  ngOnInit(): void {

  }
}
