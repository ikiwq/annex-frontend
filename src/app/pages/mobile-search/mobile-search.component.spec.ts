import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileSearchComponent } from './mobile-search.component';

describe('MobileSearchComponent', () => {
  let component: MobileSearchComponent;
  let fixture: ComponentFixture<MobileSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobileSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobileSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
