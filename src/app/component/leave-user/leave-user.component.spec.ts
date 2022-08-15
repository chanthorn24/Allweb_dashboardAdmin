import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveUserComponent } from './leave-user.component';

describe('LeaveUserComponent', () => {
  let component: LeaveUserComponent;
  let fixture: ComponentFixture<LeaveUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaveUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaveUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
