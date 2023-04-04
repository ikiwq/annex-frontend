import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { userModel } from 'src/app/models/user-model';
import { LoginRequestPayload } from 'src/app/models/login-request.payload';
import { LoginResponse } from 'src/app/models/login-response.payload';
import { RegisterRequestPayload } from 'src/app/models/register-request.payload';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SharedService{

  private user = new BehaviorSubject<userModel>(null);

  constructor(private httpClient : HttpClient) { 
  }

  retrieveUser(): void {
    if(this.getMail() != undefined){
      this.httpClient.get<userModel>(`${environment.apiURL}/api/auth/getCurrentUser`).subscribe((resUser)=> {this.user.next(resUser)});
    }
  }

  getCurrentUser() {
    return this.user;
  }

  doesUserExist(username : String): Observable<any>{
    return this.httpClient.get(`${environment.apiURL}/api/user/${username}/exists`);
  }

  register(registerRequestPayload: RegisterRequestPayload) : Observable<any> {
    return this.httpClient.post(`${environment.apiURL}/api/auth/register`, registerRequestPayload, {responseType: 'text'});
  }

  login(loginRequestPayload : LoginRequestPayload): Observable<boolean>{
    return this.httpClient.post<LoginResponse>(`${environment.apiURL}/api/auth/login`, loginRequestPayload).pipe(
      map(data => {
        localStorage.setItem('email', data.mail);
        localStorage.setItem('expiresAt', data.expiresAt.toString());
        return true;
      })
    )
  }

  getMail() : string{
    return localStorage.getItem("email");
  }

  logout(){
    this.httpClient.get<string>(`${environment.apiURL}/api/auth/logout`, {responseType: 'text' as 'json'}).subscribe({
      next: ()=>{
        localStorage.removeItem('expiresAt');
        localStorage.removeItem('email');
        this.user.next(null);
        window.location.reload();
      },
    });

  }
  
}
