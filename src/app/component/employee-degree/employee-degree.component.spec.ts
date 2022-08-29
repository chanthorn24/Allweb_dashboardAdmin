import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeDegreeComponent } from './employee-degree.component';

describe('EmployeeDegreeComponent', () => {
  let component: EmployeeDegreeComponent;
  let fixture: ComponentFixture<EmployeeDegreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeDegreeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeDegreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
