import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LateralProfileBarComponent } from './lateral-profile-bar.component';

describe('LateralProfileBarComponent', () => {
  let component: LateralProfileBarComponent;
  let fixture: ComponentFixture<LateralProfileBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LateralProfileBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LateralProfileBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
