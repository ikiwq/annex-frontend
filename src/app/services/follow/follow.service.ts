import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FollowService {

  constructor(private httpClient : HttpClient) { }

  followUser(username : string){
    return this.httpClient.get(`${environment.apiURL}/api/follow/${username}`, {responseType: "text"});
  }

}
