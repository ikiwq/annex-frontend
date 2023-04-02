import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { userModel } from 'src/app/models/user-model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  
  private currentSearch : BehaviorSubject<string> = new BehaviorSubject<string>("");

  private isLoadingPosts = new BehaviorSubject<Boolean>(false);
  private isLoadingUsers = new BehaviorSubject<Boolean>(false);

  private profileList = new BehaviorSubject<userModel[]>([]);
  
  constructor(private httpClient : HttpClient) { }

  getLoadingUsers(){
    return this.isLoadingUsers;
  }

  getLoadingPosts(){
    return this.isLoadingPosts;
  }

  retrieveUsersByNick(username : string){
    this.isLoadingUsers.next(true);
    return this.httpClient.get<userModel[]>(`${environment.apiURL}/api/search/user/${username}?pageSize=5`).subscribe({
      next: (profiles) => this.profileList.next(profiles),
      complete: ()=> this.isLoadingUsers.next(false)
    });
  }

  getUsersByNick(){
    return this.profileList;
  }

  setCurrentSearch(text : string){
    this.currentSearch.next(text);
  }

  getCurrentSearch(){
    return this.currentSearch;
  }

}
