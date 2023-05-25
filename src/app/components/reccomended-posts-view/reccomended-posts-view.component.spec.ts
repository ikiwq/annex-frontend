import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReccomendedPostsViewComponent } from './reccomended-posts-view.component';

describe('ReccomendedPostsViewComponent', () => {
  let component: ReccomendedPostsViewComponent;
  let fixture: ComponentFixture<ReccomendedPostsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReccomendedPostsViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReccomendedPostsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
