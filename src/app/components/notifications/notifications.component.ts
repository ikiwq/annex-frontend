import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Notification } from 'src/app/models/notification-model';
import { NotificationsService } from 'src/app/services/notifications/notifications.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  newNotifications : boolean = false;
  notificationPage : number = 0;
  openedAt: string = new Date().toUTCString();

  isMenuOpen : boolean = false;

  notificationList = new BehaviorSubject<Notification[]>([]);

  @ViewChild("notificationMenu") notification : ElementRef<HTMLElement>;
  @ViewChild("notificationIcon") notificationIcon : ElementRef<HTMLElement>;

  @HostListener('document:click', ['$event'])
  clickout(event : Event){
    const target = event.target as HTMLElement;

    if(!this.notification.nativeElement.contains(target) && !this.notificationIcon.nativeElement.contains(target) && this.isMenuOpen){
      this.hideList();
    }
  }

  constructor(private notificationsService : NotificationsService) { }

  ngOnInit(): void {
    this.notificationsService.getUserNotification(this.notificationPage, this.openedAt).subscribe({
      next: (notifications) => { this.notificationList.next([...this.notificationList.value, ...notifications])}
    })
  } 

  requestNotificationPage() : void{

  }

  hideList(){
    this.notification.nativeElement.classList.add("hidden");
  }

  toggleList(){
    this.notification.nativeElement.classList.toggle("flex");
    this.notification.nativeElement.classList.toggle("hidden");

    this.isMenuOpen = false ? this.isMenuOpen : true;
  }

}
