import { PostModel } from "./post-model";

export class CursorPostsResponse{
    cursor : number;
    posts : PostModel[];
}