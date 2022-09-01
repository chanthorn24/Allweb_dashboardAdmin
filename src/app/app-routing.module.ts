import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { AttendanceAdminComponent } from './component/attendance-admin/attendance-admin.component';
import { AttendanceReportComponent } from './component/attendance-report/attendance-report.component';
import { AttendanceComponent } from './component/attendance/attendance.component';
import { ChangePasswordComponent } from './component/change-password/change-password.component';
import { EmployeeAttendanceTypeComponent } from './component/employee-attendance-type/employee-attendance-type.component';
import { EmployeeBankComponent } from './component/employee-bank/employee-bank.component';
import { EmployeeDegreeComponent } from './component/employee-degree/employee-degree.component';
import { EmployeeDepartmentComponent } from './component/employee-department/employee-department.component';
import { EmployeeDetailComponent } from './component/employee-detail/employee-detail.component';
import { EmployeeFamilyComponent } from './component/employee-family/employee-family.component';
import { EmployeeLeaveComponent } from './component/employee-leave/employee-leave.component';
import { EmployeePositionComponent } from './component/employee-position/employee-position.component';
import { EmployeeReportAttendanceComponent } from './component/employee-report-attendance/employee-report-attendance.component';
import { EmployeeReportComponent } from './component/employee-report/employee-report.component';
import { EmployeeRoleComponent } from './component/employee-role/employee-role.component';
import { EmployeeComponent } from './component/employee/employee.component';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { LeaveTypeComponent } from './component/leave-type/leave-type.component';
import { LeaveUserComponent } from './component/leave-user/leave-user.component';
import { LoginComponent } from './component/login/login.component';
import { ReportComponent } from './component/report/report.component';
import { ResetPasswordComponent } from './component/reset-password/reset-password.component';
import { DashboardUserComponent } from './dashboard-user/dashboard-user.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "password/forget", component: ForgotPasswordComponent },
  { path: "password/reset", component: ResetPasswordComponent },
  { path: "", component: DashboardComponent, canActivate: [AuthGuard] },
  { path: "account/dashboard", component: DashboardUserComponent, canActivate: [AuthGuard] },
  { path: "employee", component: EmployeeComponent, canActivate: [AuthGuard] },
  { path: "employee/detail/:id", component: EmployeeDetailComponent, canActivate: [AuthGuard] },
  { path: "attendance", component: AttendanceAdminComponent, canActivate: [AuthGuard] },
  { path: "account/attendance", component: AttendanceComponent, canActivate: [AuthGuard] },
  { path: "report", component: ReportComponent, canActivate: [AuthGuard] },
  { path: "employee/type", component: LeaveTypeComponent, canActivate: [AuthGuard] },
  { path: "employee/attendance", component: EmployeeAttendanceTypeComponent, canActivate: [AuthGuard] },
  { path: "employee/bank", component: EmployeeBankComponent, canActivate: [AuthGuard] },
  { path: "employee/degree", component: EmployeeDegreeComponent, canActivate: [AuthGuard] },
  { path: "employee/family", component: EmployeeFamilyComponent, canActivate: [AuthGuard] },
  { path: "employee/role", component: EmployeeRoleComponent, canActivate: [AuthGuard] },
  { path: "change password", component: ChangePasswordComponent, canActivate: [AuthGuard] },
  { path: "employee/leave", component: EmployeeLeaveComponent, canActivate: [AuthGuard] },
  { path: "employee/department", component: EmployeeDepartmentComponent, canActivate: [AuthGuard] },
  { path: "employee/position", component: EmployeePositionComponent, canActivate: [AuthGuard] },
  { path: "employee/leave/apply", component: LeaveUserComponent, canActivate: [AuthGuard] },
  { path: "report/employee", component: EmployeeReportComponent, canActivate: [AuthGuard] },
  { path: "report/attendance", component: EmployeeReportAttendanceComponent, canActivate: [AuthGuard] },
  { path: "report/leave", component: AttendanceReportComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
