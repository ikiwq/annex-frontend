import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LikedUserPostsComponent } from './liked-user-posts.component';

describe('LikedUserPostsComponent', () => {
  let component: LikedUserPostsComponent;
  let fixture: ComponentFixture<LikedUserPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LikedUserPostsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LikedUserPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
