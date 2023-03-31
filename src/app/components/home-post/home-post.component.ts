import { Component, ElementRef, EventEmitter, HostListener, OnInit, Output, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { PostModel } from 'src/app/models/post-model';
import { SharedService } from 'src/app/services/auth/shared/shared.service';
import { PostService } from 'src/app/services/post/post.service';

@Component({
  selector: 'app-home-post',
  templateUrl: './home-post.component.html',
  styleUrls: ['./home-post.component.scss']
})
export class HomePostComponent implements OnInit {

  public postList : Observable<PostModel[]>;
  isLoading : Boolean;
  currentUser: Boolean;

  constructor(private postService : PostService, private sharedService:SharedService) { 
    
  }

  ngOnInit(): void {
    this.postService.getLoading().subscribe((bool)=> this.isLoading = bool);
    this.postList = this.postService.getReccomendedPosts();
    this.sharedService.getCurrentUser().subscribe((resUser)=>{ if(resUser){this.currentUser = true} });
  }

  requestPostPage(){
    if(this.isLoading) return ;
    this.postService.retrieveReccomendedPosts();
  }

}
