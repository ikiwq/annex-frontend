import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { KeywordToIdsDictionary } from 'src/app/models/models.uni';
import { CursorPostsResponse, PostDictionary, PostModel } from 'src/app/models/post.models';
import { SearchRequest } from 'src/app/models/search-request.model';
import { environment } from 'src/environments/environment';
import { SharedService } from '../auth/shared/shared.service';
import { userModel } from 'src/app/models/user.models';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  postStorage = new BehaviorSubject<PostDictionary>({});
  postMap = new BehaviorSubject<KeywordToIdsDictionary>({});

  currentUser: userModel;

  cursors: { [key: string]: number } = {
    reccomended: -1,
    reply: -1,
    search: -1,
    profile: -1,
    liked: -1,
    saved: -1
  }

  noElementsLeft: { [key: string]: number } = {
    reccomended: 0,
    reply: 0,
    search: 0,
    liked: 0,
    saved: 0
  }

  page_size = 10;

  repliesPostId: string = "";
  profileUsername: string = "";
  search: string = "";

  isLoading = new BehaviorSubject<Boolean>(false);

  constructor(private httpClient: HttpClient, private authService: SharedService) {
    this.authService.getCurrentUser().subscribe((user) => {
      this.currentUser = user;
    })
  }

  //private methods

  //adds an item to the storage. The function takes in an post array, a category and a position.
  addItemsToStorage(posts: PostModel[], category: string = "reccomended", position: string = "TOP") {
    //First, we will take the values from the Behaviour Subject containing all the posts
    let newStorage = this.postStorage.value;
    let posts_id: number[] = []; //array to save all the new post id.

    posts.forEach((post) => {
      newStorage[post.id] = post;
      posts_id.push(post.id);
    })

    //if an argument for the category and a position is provided, we can proceed to
    //add the ids to our postMap
    if (category !== "-1" && position !== "-1") this.addIndexesToStorage(posts_id, category, position);

    this.postStorage.next(newStorage);
  }

  addIndexesToStorage(posts_ids: number[], category: string, position: string) {
    //take the values from the postMap
    let newStorage = this.postMap.value;
    //if there isn't yet an array for a specific category, create it.
    if (!newStorage[category]) {
      newStorage[category] = [];
    }

    //Push the values depending on the given position
    if (position == "TOP") {
      newStorage[category] = [...posts_ids, ...newStorage[category]]
    } else if (position == "BOTTOM") {
      newStorage[category] = [...newStorage[category], ...posts_ids]
    }

    this.postMap.next(newStorage);
  }

  deleteFromMap(id: number, query : string){
    
    let newVals = this.postMap.value;
    console.log(newVals);
    if(!newVals[query]) return;

    let index = newVals[query].indexOf(id);

    if (index < 0) return ;

    newVals[query].splice(index, 1);

    this.postMap.next(newVals);
  }

  //GET METHODS

  getLoading() {
    return this.isLoading;
  }

  getPost(id: string) {
    this.isLoading.next(false);
    return this.httpClient.get(`${environment.apiURL}/api/post/${id}`);
  }

  getPostsStorage() {
    return this.postStorage;
  }

  getPostIdsMap() {
    return this.postMap;
  }

  retrieveReccomendedPosts() {
    //if there are no elements left or are we still loading, then just return.
    if (this.noElementsLeft["reccomended"] == 1 || this.isLoading.value) return;

    this.isLoading.next(true); //Set loading to true to prevent multiple simultaneous requests
    this.httpClient.get<PostModel[]>(`${environment.apiURL}/api/post/all?cursor=${this.cursors["reccomended"]}&page_size=${this.page_size}`)
      .subscribe({
        next: (newPosts) => {
          if (newPosts.length == 0) {
            this.noElementsLeft["reccomended"] = 1; //if the request has returned no new posts, this means there are no more elements to retrieve.
            return;
          }
          this.cursors["reccomended"] = newPosts[newPosts.length - 1].id; //save the cursor with the last item in the list.
          this.addItemsToStorage(newPosts, "reccomended", "BOTTOM"); //add the items to the storage.
        },
        complete: () => this.isLoading.next(false) // once completed, the loading is complete.
      });
  }

  retrievePostReplies(id: string) {
    let query: string = id + "-REPLIES";

    if (!this.noElementsLeft[query]) this.noElementsLeft[query] = 0;
    if (this.noElementsLeft[query]) return;

    this.isLoading.next(true);

    if (!this.cursors[query]) this.cursors[query] = -1;

    this.httpClient.get<PostModel[]>(`${environment.apiURL}/api/post/${id}/reply?cursor=${this.cursors[query]}&pageSize=10`)
      .subscribe({
        next: (replies) => {

          if (replies.length == 0) {
            this.noElementsLeft[query] = 1;
            return;
          }
          this.cursors[query] = replies[replies.length - 1].id;
          this.addItemsToStorage(replies, query, "BOTTOM");
        },
        complete: () => this.isLoading.next(false)
      });
  }

  retrievePostFromUser(username: string) {
    let queryParam = "PUBLISHED";
    let query: string = username + "-" + queryParam;

    if (!this.noElementsLeft[query]) this.noElementsLeft[query] = 0;
    if (this.noElementsLeft[query]) return;

    if (!this.cursors[query]) this.cursors[query] = -1;

    this.isLoading.next(true);

    this.httpClient.get<PostModel[]>(`${environment.apiURL}/api/user/${username}/posts?cursor=${this.cursors[query]}&page_size=${this.page_size}`)
      .subscribe({
        next: (userPosts) => {
          if (userPosts.length == 0) {
            this.noElementsLeft[query] = 1;
            return;
          }
          this.cursors[query] = userPosts[userPosts.length - 1].id;
          console.log()
          this.addItemsToStorage(userPosts, query, "BOTTOM");
        },
        complete: () => this.isLoading.next(false)
      });
  }

  //To retrieve users interaction (likes, saves), we have to follow a different approach. This time we can't use the last
  //retrieved element id as a cursor, because the post are sort by the interation date of creation.
  //This time, the API will send us an object with the posts and a cursor corrisponding to the last
  //retrieved interaction id.
  retrievePostByUserInteraction(username: string, queryParam: string) {
    let query: string = username + "-" + queryParam;

    if (!this.noElementsLeft[query]) this.noElementsLeft[query] = 0;
    if (this.noElementsLeft[query]) return;

    if (!this.cursors[query]) this.cursors[query] = -1;

    this.isLoading.next(true);

    this.httpClient.get<CursorPostsResponse>(`${environment.apiURL}/api/user/${username}/${queryParam.toLowerCase()}?cursor=${this.cursors[query]}&page_size=${this.page_size}`)
      .subscribe({
        next: (userPosts) => {
          if (userPosts.posts.length == 0) {
            this.noElementsLeft[query] = 1;
            return;
          }
          this.cursors[query] = userPosts.cursor;
          console.log()
          this.addItemsToStorage(userPosts.posts, query, "BOTTOM");
        },
        complete: () => this.isLoading.next(false)
      });
  }

  retrievePostByText(text: string) {
    let query: string = text + "-SEARCH";

    if (!this.noElementsLeft[query]) this.noElementsLeft[query] = 0;
    if (this.noElementsLeft[query] == 1) return;

    if (!this.cursors[query]) this.cursors[query] = -1;
    this.isLoading.next(true);

    let searchRequest = new SearchRequest();
    searchRequest.cursor = this.cursors[query];
    searchRequest.text = text;
    searchRequest.pageSize = this.page_size;

    this.httpClient.post<PostModel[]>(`${environment.apiURL}/api/search/post/`, searchRequest)
      .subscribe({
        next: (searches) => {

          if (searches.length == 0) {
            this.noElementsLeft[query] = 1;
            return;
          }

          this.cursors[query] = searches[searches.length - 1].id;
          this.addItemsToStorage(searches, query, "BOTTOM");
        },
        complete: () => this.isLoading.next(false)
      });
  }

  //POST METHODS

  uploadPost(postForm: FormData) {
    this.httpClient.post<PostModel>(`${environment.apiURL}/api/post/`, postForm)
      .subscribe({
        next: (post) => {
          this.addItemsToStorage([post], "reccomended", "TOP");
        },
      });
  }

  replyToPost(postForm: FormData, id: string) {
    let query = id + "-REPLIES"
    return this.httpClient.post<PostModel>(`${environment.apiURL}/api/post/${id}/reply`, postForm).subscribe({
      next: (post) => {
        this.addItemsToStorage([post], query, "TOP");
      },
    });
  }

  likePost(id: number): void {
    this.httpClient.post(`${environment.apiURL}/api/like/post/${id}`, 'like', { responseType: 'text' }).subscribe({
      next: (res) => {
        let newStorage = this.postStorage.value;
        if (newStorage[id].liked) {
          newStorage[id].liked = false;
          newStorage[id].likeCount -= 1;
        } else {
          newStorage[id].liked = true;
          newStorage[id].likeCount += 1;
        }
        this.postStorage.next(newStorage);
      }
    });
  }

  savePost(id: number): void {
    this.httpClient.post(`${environment.apiURL}/api/save/${id}`, 'save', { responseType: 'text' }).subscribe({
      next: (res) => {
        let newStorage = this.postStorage.value;
        if (newStorage[id].saved) {
          newStorage[id].saved = false;
          newStorage[id].saveCount -= 1;
        } else {
          newStorage[id].saved = true;
          newStorage[id].saveCount += 1;
        }
        this.postStorage.next(newStorage);
      }
    });
  }

  // DELETE METHODS

  deletePost(id: number, replyingTo : number = -1) {
    return this.httpClient.get(`${environment.apiURL}/api/post/${id}/delete`, { responseType: 'text' }).subscribe({
      next: () => {
        this.deleteFromMap(id, "reccomended");
        this.deleteFromMap(id, this.currentUser.username + "-PUBLISHED");
        this.deleteFromMap(id, this.currentUser.username + "-LIKED");
        this.deleteFromMap(id, this.currentUser.username + "-SAVED");
        if(replyingTo >= 0){
          this.deleteFromMap(id, replyingTo + "-REPLIES");
        }
      }
    });
  }
}
