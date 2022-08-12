import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AttendanceComponent } from './component/attendance/attendance.component';
import { ChangePasswordComponent } from './component/change-password/change-password.component';
import { EmployeeLeaveComponent } from './component/employee-leave/employee-leave.component';
import { EmployeeComponent } from './component/employee/employee.component';
import { LeaveTypeComponent } from './component/leave-type/leave-type.component';
import { ReportComponent } from './component/report/report.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {path: "", component: DashboardComponent},
  {path: "employee", component: EmployeeComponent},
  {path: "attendance", component: AttendanceComponent},
  {path: "report", component: ReportComponent},
  {path: "leave type", component: LeaveTypeComponent},
  {path: "change password", component: ChangePasswordComponent},
  {path: "employee/leave", component: EmployeeLeaveComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
