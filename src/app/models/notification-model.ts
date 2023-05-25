export class Notification{
    text: string;
    imageUrl: string;
    toUrl: string;
    seen : boolean;
    createdAt : string;
}

export class CursorNotificationsResponse{
    cursor : number;
    notifications : Notification[];
}