import { Notification } from "./notification-model";

export class CursorNotificationResponse{
    cursor : number;
    notifications : Notification[];
}