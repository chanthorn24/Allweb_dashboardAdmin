import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceDailyComponent } from './attendance-daily.component';

describe('AttendanceDailyComponent', () => {
  let component: AttendanceDailyComponent;
  let fixture: ComponentFixture<AttendanceDailyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttendanceDailyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttendanceDailyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
