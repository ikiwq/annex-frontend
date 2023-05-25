import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { userModel } from 'src/app/models/user.models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  suggestedProfileList = new BehaviorSubject<userModel[]>([]);

  constructor(private httpClient : HttpClient) { }

  retrieveSuggestedProfiles() {
    return this.httpClient.get<userModel[]>(`${environment.apiURL}/api/user/`).subscribe({
      next: (profiles) => { this.suggestedProfileList.next(profiles) }
    });
  }

  getSuggestedProfiles() : Observable<userModel[]>{
    return this.suggestedProfileList;
  }

  getUserProfile(username : string) : Observable<userModel> {
    return this.httpClient.get<userModel>(`${environment.apiURL}/api/user/${username}`);
  }
  
  editUserProfile(username : string, userForm : FormData) : Observable<userModel> {
    return this.httpClient.post<userModel>(`${environment.apiURL}/api/user/${username}/edit`, userForm);
  }
}
