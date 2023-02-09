import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { userModel } from 'src/app/models/user-model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

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

  retrieveUsersByNick(username : string, startDate : string){
    this.isLoadingUsers.next(true);
    return this.httpClient.get<userModel[]>(`${environment.apiURL}/api/search/user/${username}?startDate=${startDate}`).subscribe({
      next: (profiles) => this.profileList.next(profiles),
      complete: ()=> this.isLoadingUsers.next(false)
    });
  }

  getUsersByNick(){
    return this.profileList;
  }


}
