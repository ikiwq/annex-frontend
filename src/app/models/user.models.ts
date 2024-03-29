export class userModel {
    username: string;

    profilePicture: string;
    backgroundPicture: string;
    biography: string;
    
    joinedOn: string;
    birthday: string;
    location: string;

    followed: boolean;
    
    totalPosts: number;
    followers: number;
    following: number;
    liked: number;
    saved: number;
}

export class UserForm{
    username : string = "";
    biography: string = "";
    location : string = "";
    birthday : string = "";
}