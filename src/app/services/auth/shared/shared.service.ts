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
    if(this.getRefreshToken() != undefined){
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
        localStorage.setItem('authenticationToken', data.authToken);
        localStorage.setItem('email', data.mail);
        localStorage.setItem('refreshToken', data.refreshToken);
        localStorage.setItem('expiretAt', data.expiresAt.toString());
        return true;
      })
    )
  }

  getJwtToken(){
    return localStorage.getItem('authenticationToken');
  }

  getRefreshToken(){
    return localStorage.getItem('refreshToken');
  }

  getCurrentMail(){
    return localStorage.getItem('email');
  }

  refreshToken(){
    const refreshTokenPayload = {
      refreshToken: this.getRefreshToken(),
      mail: this.getCurrentMail()
    }

    return this.httpClient.post<LoginResponse>(`${environment.apiURL}/api/auth/refresh/token`, refreshTokenPayload)
    .pipe(tap(response => {
      localStorage.setItem('authenticationToken', response.authToken);
      localStorage.setItem('expiresAt', response.expiresAt.toString());
    }))
  }

  logout(){
    localStorage.removeItem('authenticationToken');
    localStorage.removeItem('email');
    localStorage.removeItem('expiresAt');
    localStorage.removeItem('refreshToken');
    this.user.next(null);

    this.httpClient.get(`${environment.apiURL}/api/auth/logout`);
    window.location.reload();
  }
  
}
