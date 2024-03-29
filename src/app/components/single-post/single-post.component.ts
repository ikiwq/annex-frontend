import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { Router} from '@angular/router';
import { PostModel } from 'src/app/models/post.models';
import { SharedService } from 'src/app/services/auth/shared/shared.service';
import { PostService } from 'src/app/services/post/post.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss']
})
export class SinglePostComponent implements OnInit {

  public isPostLiked : boolean;
  public isPostSaved: boolean;
  public isPostMenuShown : boolean = false;
  public isAuthor : boolean;


  @Input() post : PostModel;
  @Input() highlighted : Boolean;
  
  @ViewChild("postMenu") private postMenu: ElementRef<HTMLElement>;
  @ViewChild("messageContainer", {static: true}) private messageContainer : ElementRef<HTMLElement>;

  @HostListener('document:click', ['$event'])
  clickout(event : Event){
    const target = event.target as HTMLElement;
    if(!this.postMenu.nativeElement.contains(target) && this.isPostMenuShown){
      this.disableMenu();
    }
  }

  constructor(private postService : PostService, private router : Router, private authService : SharedService) {
  }

  ngOnInit(): void {  
    if(this.authService.getCurrentUser().value == null){
      this.isAuthor = false;
      return ;
    }

    if(this.post.creator == this.authService.getCurrentUser().value.username){
      this.isAuthor = true;
    }else{
      this.isAuthor = false;
    }
  }

  like(event : Event): void {
    if(this.authService.getCurrentUser().value == null){
      this.router.navigate(["/login"]);
      return ; 
    }

    this.postService.likePost(this.post.id);
    
    event.stopPropagation();
  }

  save(event : Event): void{
    if(this.authService.getCurrentUser().value == null){
      this.router.navigate(["/login"]);
      return ; 
    }
    
    this.postService.savePost(this.post.id);
    
    event.stopPropagation();
  }

  goToPost() : void{
    this.router.navigate([`/post/${this.post.id}`]);
  }

  goToReplying(event : Event) : void{
    event.stopPropagation();
    this.router.navigate([`/post/${this.post.replyingToPost}`]);
  }

  goToTag(event : Event, tag: string){
    event.stopPropagation();
    this.router.navigate([`/tag/${tag}}`]);
  }

  goToMention(event : Event, user : string){
    event.stopPropagation();
    this.router.navigate([`/profile/${user}`]);
  }

  deletePost(event : Event) : void{
    event.stopPropagation();
    if(this.post.replyingToPost){
      this.postService.deletePost(this.post.id, parseInt(this.post.replyingToPost));
      return ;
    }
    this.postService.deletePost(this.post.id); 
  }

  goToCreator(event : Event) : void{
    this.router.navigate([`/profile/${this.post.creator}`]);
    event.stopPropagation();
  }

  share(event : Event) : void {
    if(navigator.share){
      navigator.share({
        text: "Share this post!",
        url: environment.frontendUrl + "/post/" + this.post.id
      });
    }else{
      navigator.clipboard.writeText(environment.frontendUrl + "/post/" + this.post.id);
    }
    event.stopPropagation();
  }

  togglePostMenu(event : Event){
    event.stopPropagation();

    if(this.isPostMenuShown){
      this.postMenu.nativeElement.style.display = "none";
      this.isPostMenuShown = false;
      return ;
    }

    this.postMenu.nativeElement.style.display = "flex";

    if(window.innerHeight - this.postMenu.nativeElement.getBoundingClientRect().top < 400){
      this.postMenu.nativeElement.style.top = "-100px";
    }else{
      this.postMenu.nativeElement.style.top = "8px";
    }

    this.isPostMenuShown = true;
    
  }

  disableMenu(){
    this.postMenu.nativeElement.style.display = "none";
    this.isPostMenuShown = false;
  }

  processLinks(event : Event){
    const element : any = event.target;
    if(element.nodeName === 'A'){
      event.preventDefault();
      const link = element.getAttribute('href');
      this.router.navigate([link]);
      event.stopPropagation();
    }
  }
  
}
