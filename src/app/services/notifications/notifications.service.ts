import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Notification } from 'src/app/models/notification-model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(private httpClient : HttpClient) { }

  getUserNotification(page : number, openedAt : string){
      return this.httpClient.get<Notification[]>(`${environment.apiURL}/api/notification/?page=${page}&openedAt=${openedAt}`);
  }

}
