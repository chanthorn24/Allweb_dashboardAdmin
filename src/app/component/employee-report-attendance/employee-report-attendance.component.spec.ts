import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeReportAttendanceComponent } from './employee-report-attendance.component';

describe('EmployeeReportAttendanceComponent', () => {
  let component: EmployeeReportAttendanceComponent;
  let fixture: ComponentFixture<EmployeeReportAttendanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeReportAttendanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeReportAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
