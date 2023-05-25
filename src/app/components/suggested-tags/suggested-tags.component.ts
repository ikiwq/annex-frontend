import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TagModel } from 'src/app/models/tag.models';
import { TagService } from 'src/app/services/tag/tag.service';

@Component({
  selector: 'app-suggested-tags',
  templateUrl: './suggested-tags.component.html',
  styleUrls: ['./suggested-tags.component.scss']
})
export class SuggestedTagsComponent implements OnInit {

  public tagList = new BehaviorSubject<TagModel[]>([]);

  constructor(private tagService : TagService) { }
  
  ngOnInit(): void {
    this.tagService.getPopular().subscribe((tags)=> this.tagList.next(tags));
  }

}
