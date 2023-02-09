import { Component, ElementRef, EventEmitter, HostListener, OnInit, Output, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { PostModel } from 'src/app/models/post-model';
import { PostService } from 'src/app/services/post/post.service';

@Component({
  selector: 'app-home-post',
  templateUrl: './home-post.component.html',
  styleUrls: ['./home-post.component.scss']
})
export class HomePostComponent implements OnInit {

  public postList : Observable<PostModel[]>;
  isLoading : Boolean;

  constructor(private postService : PostService) { 
    
  }

  ngOnInit(): void {
    this.postService.getLoading().subscribe((bool)=> this.isLoading = bool);
    this.postList = this.postService.getReccomendedPosts();
  }

  requestPostPage(){
    if(this.isLoading) return ;
    this.postService.retrieveReccomendedPosts();
  }

}
