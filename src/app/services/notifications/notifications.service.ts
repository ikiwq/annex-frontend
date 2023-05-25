import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CursorNotificationsResponse } from 'src/app/models/notification-model';
import { Notification } from 'src/app/models/notification-model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  notifications : BehaviorSubject<Notification[]> = new BehaviorSubject<Notification[]>([]);
  cursor : number = -1;
  pageSize : number = 15;

  constructor(private httpClient : HttpClient) { }

  retrieveUserNotification(){
    return this.httpClient.get<CursorNotificationsResponse>(`${environment.apiURL}/api/notification/?cursor=${this.cursor}&pageSize=${this.pageSize}`).subscribe({
      next: (cursorNotification) => {
        this.notifications.next([...this.notifications.value, ...cursorNotification.notifications])
        this.cursor = cursorNotification.cursor;
      }
    });
  }

  getUserNotification(){
    return this.notifications;
  }

}
