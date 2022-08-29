import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeAttendanceTypeComponent } from './employee-attendance-type.component';

describe('EmployeeAttendanceTypeComponent', () => {
  let component: EmployeeAttendanceTypeComponent;
  let fixture: ComponentFixture<EmployeeAttendanceTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeAttendanceTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeAttendanceTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
