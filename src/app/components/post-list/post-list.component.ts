import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PostModel } from 'src/app/models/post-model';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  @Input() postList : Observable<PostModel[]>;

  constructor() {
  }

  ngOnInit(): void {

  }
}
