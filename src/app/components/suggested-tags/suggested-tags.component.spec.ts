import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestedTagsComponent } from './suggested-tags.component';

describe('SuggestedTagsComponent', () => {
  let component: SuggestedTagsComponent;
  let fixture: ComponentFixture<SuggestedTagsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuggestedTagsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuggestedTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
