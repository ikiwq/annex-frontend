import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LateralHomebarComponent } from './lateral-homebar.component';

describe('LateralHomebarComponent', () => {
  let component: LateralHomebarComponent;
  let fixture: ComponentFixture<LateralHomebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LateralHomebarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LateralHomebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
