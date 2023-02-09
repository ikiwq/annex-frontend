import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TagModel } from 'src/app/models/tag-model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(private httpClient : HttpClient) { }

  getPopular(){
    return this.httpClient.get<TagModel[]>(`${environment.apiURL}/api/tags/popular`);
  }
}
