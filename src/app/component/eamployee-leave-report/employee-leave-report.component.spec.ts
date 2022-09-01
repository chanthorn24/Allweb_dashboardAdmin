import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeLeaveReport } from './employee-leave-report.component';

describe('EmployeeLeaveReport', () => {
  let component: EmployeeLeaveReport;
  let fixture: ComponentFixture<EmployeeLeaveReport>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeeLeaveReport],
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeLeaveReport);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
