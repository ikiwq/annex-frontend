export class CursorPostsResponse{
    cursor : number;
    posts : PostModel[];
}

export interface PostDictionary {
    [key : string] : PostModel;
}

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

export class PostRequest{
    message : string;
}