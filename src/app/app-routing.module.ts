import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { AttendanceAdminComponent } from './component/attendance-admin/attendance-admin.component';
import { EmployeeLeaveReport } from './component/Reports/eamployee-leave-report/employee-leave-report.component';
import { AttendanceComponent } from './component/attendance/attendance.component';
import { EmployeeAttendanceTypeComponent } from './component/Settings/employee-attendance-type/employee-attendance-type.component';
import { EmployeeBankComponent } from './component/Settings/employee-bank/employee-bank.component';
import { EmployeeDegreeComponent } from './component/Settings/employee-degree/employee-degree.component';
import { EmployeeDepartmentComponent } from './component/Settings/employee-department/employee-department.component';
import { EmployeeDetailComponent } from './component/employee-detail/employee-detail.component';
import { EmployeeFamilyComponent } from './component/Settings/employee-family/employee-family.component';
import { EmployeeLeaveComponent } from './component/employee-leave/employee-leave.component';
import { EmployeePositionComponent } from './component/Settings/employee-position/employee-position.component';
import { EmployeeReportAttendanceComponent } from './component/Reports/employee-report-attendance/employee-report-attendance.component';
import { EmployeeReportComponent } from './component/Reports/employee-report/employee-report.component';
import { EmployeeRoleComponent } from './component/Settings/employee-role/employee-role.component';
import { EmployeeComponent } from './component/employee/employee.component';
import { LeaveTypeComponent } from './component/Settings/leave-type/leave-type.component';
import { LeaveUserComponent } from './component/leave-user/leave-user.component';
import { DashboardUserComponent } from './dashboard-user/dashboard-user.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './services/auth.guard';
import { ChangePasswordComponent } from './component/Auth/change-password/change-password.component';
import { ForgotPasswordComponent } from './component/Auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './component/Auth/reset-password/reset-password.component';
import { LoginComponent } from './component/Auth/login/login.component';
import { ReportUserComponent } from './component/report-user/report-user.component';
import { EmployeeLeaveDetailComponent } from './component/employee-leave-detail/employee-leave-detail.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'password/forget', component: ForgotPasswordComponent },
  { path: 'password/reset', component: ResetPasswordComponent },
  { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
  {
    path: 'account/dashboard',
    component: DashboardUserComponent,
    canActivate: [AuthGuard],
  },
  { path: 'employee', component: EmployeeComponent, canActivate: [AuthGuard] },
  {
    path: 'employee/detail/:id',
    component: EmployeeDetailComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'attendance',
    component: AttendanceAdminComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'account/attendance',
    component: AttendanceComponent,
    canActivate: [AuthGuard],
  },
  { path: 'report', component: ReportUserComponent, canActivate: [AuthGuard] },
  {
    path: 'employee/type',
    component: LeaveTypeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'employee/attendance',
    component: EmployeeAttendanceTypeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'employee/bank',
    component: EmployeeBankComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'employee/degree',
    component: EmployeeDegreeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'employee/family',
    component: EmployeeFamilyComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'employee/role',
    component: EmployeeRoleComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'change password',
    component: ChangePasswordComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'employee/leave',
    component: EmployeeLeaveComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'employee/leave/:id',
    component: EmployeeLeaveDetailComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'employee/department',
    component: EmployeeDepartmentComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'employee/position',
    component: EmployeePositionComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'employee/leave/apply',
    component: LeaveUserComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'report/employee',
    component: EmployeeReportComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'report/attendance',
    component: EmployeeReportAttendanceComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'report/leave',
    component: EmployeeLeaveReport,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
