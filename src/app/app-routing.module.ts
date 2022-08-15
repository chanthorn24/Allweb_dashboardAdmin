import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { AttendanceComponent } from './component/attendance/attendance.component';
import { ChangePasswordComponent } from './component/change-password/change-password.component';
import { EmployeeDetailComponent } from './component/employee-detail/employee-detail.component';
import { EmployeeLeaveComponent } from './component/employee-leave/employee-leave.component';
import { EmployeeComponent } from './component/employee/employee.component';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { LeaveTypeComponent } from './component/leave-type/leave-type.component';
import { LoginComponent } from './component/login/login.component';
import { ReportComponent } from './component/report/report.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {path: "login", component: LoginComponent},
  {path: "forgot password", component: ForgotPasswordComponent},
  {path: "", component: DashboardComponent, canActivate: [AuthGuard]},
  {path: "employee", component: EmployeeComponent, canActivate: [AuthGuard]},
  {path: "employee/detail/:id", component: EmployeeDetailComponent},
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
