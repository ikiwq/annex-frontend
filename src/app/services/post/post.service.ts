import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CursorPostsResponse } from 'src/app/models/cursor-posts-response.model';
import { PostModel } from 'src/app/models/post-model';
import { postRequest } from 'src/app/models/post-request';
import { SearchRequest } from 'src/app/models/search-request.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService{
  postList = new BehaviorSubject<PostModel[]>([]);

  searchList = new BehaviorSubject<PostModel[]>([]);
  reccomendedPosts = new BehaviorSubject<PostModel[]>([]);
  repliesPosts = new BehaviorSubject<PostModel[]>([]);
  profilePosts = new BehaviorSubject<PostModel[]>([]);
  likedPosts = new BehaviorSubject<PostModel[]>([]);
  savedPosts = new BehaviorSubject<PostModel[]>([]);
  tagPosts = new BehaviorSubject<PostModel[]>([]);
  
  cursors = {
    reccomended : -1,
    reply : -1,
    search : -1,
    profile : -1,
    liked : -1,
    saved : -1
  }

  noElementsLeft = {
    reccomended : 0,
    reply : 0,
    search : 0,
    profile : 0,
    liked : 0,
    saved : 0
  }

  repliesPostId : string = "";
  profileUsername : string = "";
  search : string = "";

  isLoading = new BehaviorSubject<Boolean>(true);

  constructor(private httpClient : HttpClient) { 

  }

  getLoading(){
    return this.isLoading;
  }

  resetProfileSaves(username : string) {
    this.profilePosts.next([]);
    this.likedPosts.next([]);
    this.savedPosts.next([]);

    this.cursors["profile"] = -1;
    this.cursors["liked"] = -1;
    this.cursors["saved"] = -1;
    
    this.noElementsLeft["profile"] = 0;
    this.noElementsLeft["liked"] = 0;
    this.noElementsLeft["saved"] = 0;

    this.profileUsername = username;

  }

  resetSearch(text : string){
    if(this.search != text){
      this.searchList.next([]);
      this.search = text;
      this.cursors["search"] = -1;
      this.noElementsLeft["search"] = 0;
    }
  }

  //GET METHODS

  getPost(id : string){
    this.isLoading.next(false);
    return this.httpClient.get(`${environment.apiURL}/api/post/${id}`);
  }

  retrieveReccomendedPosts() {
    if(this.noElementsLeft["reccomended"]) return ;
    this.isLoading.next(true);
    this.httpClient.get<PostModel[]>(`${environment.apiURL}/api/post/cursor/${this.cursors["reccomended"]}?pageSize=20`)
      .subscribe({
        next: (newPosts) => { this.reccomendedPosts.next([...this.reccomendedPosts.value, ...newPosts]);
          this.cursors["reccomended"] = this.reccomendedPosts.value[this.reccomendedPosts.value.length - 1].id - 1;
          if(newPosts.length == 0) this.noElementsLeft["reccomended"] = 1},
        complete: ()=> this.isLoading.next(false)
      });
  }

  getReccomendedPosts(){
    this.postList = this.reccomendedPosts;
    return this.postList;
  }

  retrievePostReplies(id : string){

    if(id != this.repliesPostId){
      this.repliesPosts.next([]);
      this.repliesPostId = id;
      this.cursors["reply"] = -1;
      this.noElementsLeft["reply"] = 0;
    }

    if(this.noElementsLeft["reply"]) return ;

    this.isLoading.next(true);

    this.httpClient.get<PostModel[]>(`${environment.apiURL}/api/post/${id}/reply?cursor=${this.cursors["reply"]}&pageSize=10`)
      .subscribe({
        next: (replies)=>{ this.repliesPosts.next([...this.repliesPosts.value, ...replies]);
          
        if(this.repliesPosts.value.length == 0){
          this.cursors["reply"] = 0;
        }else{
          this.cursors["reply"] = this.repliesPosts.value[this.repliesPosts.value.length - 1].id - 1;
        }

        if(replies.length == 0) this.noElementsLeft["reply"] = 1;},
        complete: ()=> this.isLoading.next(false)
      });
  }

  getPostReplies(){
    this.postList = this.repliesPosts;
    return this.postList;
  }

  retrievePostFromUser(username : string){
    if(this.noElementsLeft["reccomended"]) return ;

    this.isLoading.next(true);

    if(this.profileUsername != username) {
      this.resetProfileSaves(username);
    }

    this.httpClient.get<PostModel[]>(`${environment.apiURL}/api/user/${username}/posts?cursor=${this.cursors["profile"]}&pageSize=10`)
      .subscribe({
        next: (userPosts)=>{ this.profilePosts.next([...this.profilePosts.value, ...userPosts]); 
          this.cursors["profile"] = this.profilePosts.value[this.profilePosts.value.length - 1].id - 1;
          if(userPosts.length == 0) this.noElementsLeft["reccomended"] = 1;},
        complete: ()=> this.isLoading.next(false)
      });  
  }

  getPostFromUser() : Observable<PostModel[]> {
    this.postList = this.profilePosts;
    return this.postList;
  }

  retrieveLikedFromUser(username: string){
    if(this.noElementsLeft["liked"]) return ;
    this.isLoading.next(true);

    if(username != this.profileUsername){
      this.resetProfileSaves(username);
    }

    this.httpClient.get<CursorPostsResponse>(`${environment.apiURL}/api/user/${username}/liked?cursor=${this.cursors["liked"]}&pageSize=10`)
      .subscribe({
        next: (liked)=>{ this.likedPosts.next([...this.likedPosts.value, ...liked.posts]); 
          this.cursors["liked"] = liked.cursor - 1;
          if(liked.posts.length == 0) this.noElementsLeft["liked"] = 1},
        complete: ()=> this.isLoading.next(false)
      });
  }

  getLikedFromUser(){
    this.postList = this.likedPosts;
    return this.postList;
  }

  retrieveSavedFromUser(username: string){
    if(this.noElementsLeft["saved"]) return ;
    
    this.isLoading.next(true);

    if(username != this.profileUsername){
      this.resetProfileSaves(username);
    }


    this.httpClient.get<CursorPostsResponse>(`${environment.apiURL}/api/user/${username}/saved?cursor=${this.cursors["saved"]}&pageSize=10`)
      .subscribe({
        next: (saved)=>{ this.savedPosts.next([...this.savedPosts.value, ...saved.posts]); 
          this.cursors["saved"] = saved.cursor - 1;
          if(saved.posts.length == 0) this.noElementsLeft["saved"] = 1},
        complete: ()=> this.isLoading.next(false)
    });

  }

  getSavedFromuser(){
    this.postList = this.savedPosts;
    return this.postList;
  }

  retrievePostByText(text : string){
    if(text != this.search) this.resetSearch(text);
    if(this.noElementsLeft["search"]) return ;
    
    this.isLoading.next(true);

    let searchRequest = new SearchRequest();
    searchRequest.cursor = this.cursors["search"];
    searchRequest.text = text;
    searchRequest.pageSize = 15;

    this.httpClient.post<PostModel[]>(`${environment.apiURL}/api/search/post/`, searchRequest).subscribe({
      next: (posts) => { this.searchList.next([...this.searchList.value, ...posts]);
        this.cursors["search"] = this.searchList.value[this.searchList.value.length - 1].id - 1;
        if(posts.length == 0) this.noElementsLeft["search"] = 1;},
      complete: ()=> this.isLoading.next(false)
    });
  }

  getPostList(){
    this.postList = this.searchList;
    return this.postList;
  }

  //POST METHODS

  uploadPost(postForm : FormData){
    this.httpClient.post<PostModel>(`${environment.apiURL}/api/post/`, postForm)
    .subscribe((newPost) => this.postList.next([newPost, ...this.postList.getValue()]));
  }

  replyToPost(postForm : FormData, id: string){
    return this.httpClient.post<PostModel>(`${environment.apiURL}/api/post/${id}/reply`, postForm).subscribe(
      (newReply)=> this.postList.next([newReply, ...this.postList.getValue()])
    );
  }

  likePost(id : number) : Observable<any>{
    return this.httpClient.post(`${environment.apiURL}/api/like/post/${id}`, 'like', {responseType: 'text'});
  }

  savePost(id : number) : Observable<any>{
    return this.httpClient.post(`${environment.apiURL}/api/save/${id}`, 'save', {responseType: 'text'});
  }

  // DELETE METHODS

  deletePost(id : number) {
    return this.httpClient.get(`${environment.apiURL}/api/post/${id}/delete`, {responseType: 'text'}).subscribe({
      next: ()=>{
        const newArr = this.postList.getValue();
        newArr.forEach((item, index)=>{
          if (item.id == id) newArr.splice(index, 1)
        })
        this.postList.next(newArr);

        const newArr2 = this.reccomendedPosts.getValue();
        newArr2.forEach((item, index)=>{
          if (item.id == id) newArr2.splice(index, 1)
        })
        this.reccomendedPosts.next(newArr2);
      }
    });
  }
}
