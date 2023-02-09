import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { PostService } from 'src/app/services/post/post.service';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {  
  openedAt : string = new Date().toUTCString();

  mainPost : any;
  id: string;

  replies = new BehaviorSubject<any>(null);
  isLoading : Boolean;

  constructor(private postService : PostService, private activatedRoute : ActivatedRoute, private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    }
  }

  ngOnInit(): void {
    this.postService.getLoading().subscribe((bool)=> this.isLoading = bool);
    
    this.activatedRoute.params.subscribe((params)=>{
      console.log(this.id)
      console.log(params["id"])
      if(this.id == params["id"]){
        console.log("returned")
        return ;
      } 

      this.id = params["id"];
      this.postService.getPost(this.id).subscribe((postRes) =>{this.mainPost = postRes});
      this.postService.retrievePostReplies(this.id, this.openedAt);
      this.postService.getPostReplies().subscribe((postRes) =>{this.replies.next(postRes);});
    })

  }

  requestReplyPage(){
    if(this.isLoading) return ;
    this.postService.requestRepliesPage(this.id, this.openedAt);
  }

}
