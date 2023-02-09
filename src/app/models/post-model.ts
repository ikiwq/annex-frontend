export class PostModel{
    id: number;

    creator : string;
    creatorImage: string;
    
    message: string;

    imageUrls : string[];
    
    reply: boolean;
    replyingToUser: string;
    replyingToPost: string;
    
    likeCount : number;
    repliesCount : number;
    saveCount: number;

    liked : boolean;
    saved : boolean;

    createdAt : string;
}