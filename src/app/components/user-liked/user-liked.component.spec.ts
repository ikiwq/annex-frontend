import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLikedComponent } from './user-liked.component';

describe('UserLikedComponent', () => {
  let component: UserLikedComponent;
  let fixture: ComponentFixture<UserLikedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserLikedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserLikedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
