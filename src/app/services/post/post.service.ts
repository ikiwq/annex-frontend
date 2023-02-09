import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PostModel } from 'src/app/models/post-model';
import { postRequest } from 'src/app/models/post-request';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  startingAt : string = new Date().toUTCString();

  postList = new BehaviorSubject<PostModel[]>([]);

  searchList = new BehaviorSubject<PostModel[]>([]);
  reccomendedPosts = new BehaviorSubject<PostModel[]>([]);
  repliesPosts = new BehaviorSubject<PostModel[]>([]);
  profilePosts = new BehaviorSubject<PostModel[]>([]);
  likedPosts = new BehaviorSubject<PostModel[]>([]);
  savedPosts = new BehaviorSubject<PostModel[]>([]);
  tagPosts = new BehaviorSubject<PostModel[]>([]);
  
  reccomendedPostsPage : number = 0;
  searchListPage : number = 0;
  profilePostsPage : number = 0;
  likedPostsPage : number = 0;
  savedPostsPage : number = 0;
  repliesPage : number = 0;
  tagPage : number = 0;

  savedUser : string = "";
  likedUser : string = "";
  repliesPostId : string = "";

  isLoading = new BehaviorSubject<Boolean>(true);

  constructor(private httpClient : HttpClient) { }

  getLoading(){
    return this.isLoading;
  }

  //GET METHODS

  getPost(id : string){
    this.isLoading.next(false);
    return this.httpClient.get(`${environment.apiURL}/api/post/${id}`);
  }

  retrieveReccomendedPosts(startingDate : string = this.startingAt) {
    this.isLoading.next(true);
    console.log(this.startingAt)
    this.httpClient.get<PostModel[]>(`${environment.apiURL}/api/post/page/${this.reccomendedPostsPage}?startingDate=${startingDate}`)
      .subscribe({
        next: (newPosts) => { this.reccomendedPosts.next([...this.reccomendedPosts.value, ...newPosts]), this.reccomendedPostsPage += 1 },
        complete: ()=> this.isLoading.next(false)
      });

  }

  getReccomendedPosts(){
    this.postList = this.reccomendedPosts;
    return this.postList;
  }

  retrievePostReplies(id : string, date : string){
    this.isLoading.next(true);

    if(id != this.repliesPostId){
      this.repliesPosts.next([]);
      this.repliesPostId = id;
      this.repliesPage = 0;
    }
    this.httpClient.get<PostModel[]>(`${environment.apiURL}/api/post/${id}/replies?page=${this.repliesPage}&startingDate=${date}`)
      .subscribe({
        next: (replies)=>{ this.repliesPosts.next([...this.repliesPosts.value, ...replies]) ; this.repliesPage += 1},
        complete: ()=> this.isLoading.next(false)
      });
  }

  requestRepliesPage(id : string, date : string){
    this.isLoading.next(true);
    
    this.httpClient.get<PostModel[]>(`${environment.apiURL}/api/post/${id}/replies?page=${this.repliesPage}&startingDate=${date}`)
      .subscribe({
        next: (replies)=>{ this.repliesPosts.next([...this.repliesPosts.value, ...replies]) ; this.repliesPage += 1},
        complete: ()=> this.isLoading.next(false)
      });

  }

  getPostReplies(){
    this.postList = this.repliesPosts;
    return this.postList;
  }

  retrievePostFromUser(username : string, date : string){
    this.isLoading.next(true);

    if(this.profilePosts.value.length > 0 && this.profilePosts.value[this.profilePosts.value.length - 1].creator != username) {
      this.profilePosts.next([]);
      this.profilePostsPage = 0;
    }

    this.httpClient.get<PostModel[]>(`${environment.apiURL}/api/user/${username}/posts?page=${this.profilePostsPage}&startingDate=${date}`)
      .subscribe({
        next: (userPosts)=>{ this.profilePosts.next([...this.profilePosts.value, ...userPosts]); this.profilePostsPage += 1},
        complete: ()=> this.isLoading.next(false)
      });
      
  }

  getPostFromUser() : Observable<PostModel[]> {
    this.postList = this.profilePosts;
    return this.postList;
  }

  retrieveLikedFromUser(username: string, date : string){
    this.isLoading.next(true);

    this.likedPosts.next([]);
    this.likedPostsPage = 0;

    this.httpClient.get<PostModel[]>(`${environment.apiURL}/api/user/${username}/liked?page=${this.likedPostsPage}&startingDate=${date}`)
      .subscribe({
        next: (liked)=>{ this.likedPosts.next([...this.likedPosts.value, ...liked]); this.likedPostsPage += 1},
        complete: ()=> this.isLoading.next(false)
      });
  }

  requestLikedPage(username : string, date : string){
    this.isLoading.next(true);
    
    this.httpClient.get<PostModel[]>(`${environment.apiURL}/api/user/${username}/liked?page=${this.likedPostsPage}&startingDate=${date}`)
      .subscribe({
        next: (liked)=>{ this.likedPosts.next([...this.likedPosts.value, ...liked]); this.likedPostsPage += 1},
        complete: ()=> this.isLoading.next(false)
      });
  }

  getLikedFromUser(){
    this.postList = this.likedPosts;
    return this.postList;
  }

  retrieveSavedFromUser(username: string, date : string){
    this.isLoading.next(true);

    this.savedPosts.next([]);
    this.savedPostsPage = 0;

    this.httpClient.get<PostModel[]>(`${environment.apiURL}/api/user/${username}/saved?page=${this.savedPostsPage}&startingDate=${date}`)
      .subscribe({
        next: (saved)=>{ this.savedPosts.next([...this.savedPosts.value, ...saved]); this.savedPostsPage += 1},
        complete: ()=> this.isLoading.next(false)
    });

  }

  requestSavedPage(username : string, date : string){
    this.isLoading.next(true);

    this.httpClient.get<PostModel[]>(`${environment.apiURL}/api/user/${username}/saved?page=${this.savedPostsPage}&startingDate=${date}`)
      .subscribe({
        next: (saved)=>{ this.savedPosts.next([...this.savedPosts.value, ...saved]); this.savedPostsPage += 1},
        complete: ()=> this.isLoading.next(false)
    });
  }

  getSavedFromuser(){
    this.postList = this.savedPosts;
    return this.postList;
  }

  retrieveTagPage(tag : string, startingDate : string){
    this.isLoading.next(true);

    this.tagPosts.next([]);
    this.tagPage = 0;

    this.httpClient.get<PostModel[]>(`${environment.apiURL}/api/post/page/${this.tagPage}?startingDate=${startingDate}&tag=${tag}`)
      .subscribe({
        next: (tagged) => { this.tagPosts.next([...this.tagPosts.value, ...tagged]); this.tagPage += 1; },
        complete: () => this.isLoading.next(false)
      })
  }

  getTagPage(){
    this.postList = this.tagPosts;
    return this.postList;
  }

  retrievePostByText(text : string, startDate : string){
    this.searchListPage = 0;
    this.searchList.next([]);
    this.httpClient.get<PostModel[]>(`${environment.apiURL}/api/search/post/${text}?startDate=${startDate}&page=${this.searchListPage}`).subscribe({
      next: (posts) => { this.searchList.next([...posts]) }
    });
  }

  getPostByTextPage(text : string, startDate : string){
    this.searchListPage += 1;
    this.httpClient.get<PostModel[]>(`${environment.apiURL}/api/search/post/${text}?startDate=${startDate}&page=${this.searchListPage}`).subscribe({
      next: (posts) => { this.searchList.next([...this.searchList.value, ...posts]) }
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

  replyToPost(postReq : postRequest, id: string){
    return this.httpClient.post<PostModel>(`${environment.apiURL}/api/post/${id}/reply`, postReq).subscribe(
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
