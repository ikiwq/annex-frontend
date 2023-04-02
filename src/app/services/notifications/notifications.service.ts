import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CursorNotificationResponse } from 'src/app/models/cursor-notifications-response.model';
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
    return this.httpClient.get<CursorNotificationResponse>(`${environment.apiURL}/api/notification/?cursor=${this.cursor}&pageSize=${this.pageSize}`).subscribe({
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
