import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedUserPostsComponent } from './saved-user-posts.component';

describe('SavedUserPostsComponent', () => {
  let component: SavedUserPostsComponent;
  let fixture: ComponentFixture<SavedUserPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavedUserPostsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SavedUserPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
