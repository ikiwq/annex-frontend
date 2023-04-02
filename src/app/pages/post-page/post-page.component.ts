import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { SharedService } from 'src/app/services/auth/shared/shared.service';
import { PostService } from 'src/app/services/post/post.service';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {
  mainPost : any;
  id: string;

  replies = new BehaviorSubject<any>(null);
  isLoading : Boolean;
  isLogged : Boolean;

  constructor(private postService : PostService, private activatedRoute : ActivatedRoute, private router: Router, private sharedService: SharedService) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    }
  }

  ngOnInit(): void {
    this.postService.getLoading().subscribe((bool)=> this.isLoading = bool);

    this.sharedService.getCurrentUser().subscribe((resUser)=>{ if(resUser){this.isLogged = true} });

    this.activatedRoute.params.subscribe((params)=>{
      if(this.id == params["id"]){
        return ;
      } 

      this.id = params["id"];
      this.postService.getPost(this.id).subscribe((postRes) =>{this.mainPost = postRes});
      this.postService.retrievePostReplies(this.id);
      this.postService.getPostReplies().subscribe((postRes) =>{this.replies.next(postRes);});
    })

  }

  requestReplyPage(){
    if(this.isLoading) return ;
    this.postService.retrievePostReplies(this.id);
  }

}
