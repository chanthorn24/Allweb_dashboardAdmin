import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableExporterModule } from 'mat-table-exporter';

import { AuthGuard } from './services/auth.guard';
import { AuthService } from './services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { NavigationComponent } from './navigation/navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import {
  EmployeeComponent,
  DialogElementsDialog,
} from './component/employee/employee.component';
import { ReportUserComponent } from './component/report-user/report-user.component';
import {
  DialogAddLeaveType,
  DialogDeleteLeaveType,
  DialogUpdateLeaveType,
  LeaveTypeComponent,
} from './component/Settings/leave-type/leave-type.component';
import {
  DialogEmployeeLeave,
  EmployeeLeaveComponent,
  DialogDeleteLeave,
  DialogEditEmployeeLeave,
  DialogAcceptLeave,
  DialogDeclineLeave,
} from './component/employee-leave/employee-leave.component';
import {
  DialogPersonalInfo,
  EmployeeDetailComponent,
} from './component/employee-detail/employee-detail.component';
import { NavigationUserComponent } from './navigation-user/navigation-user.component';
import { DashboardUserComponent } from './dashboard-user/dashboard-user.component';
import {
  DialogDeleteUserLeave,
  DialogEditUserLeave,
  LeaveUserComponent,
} from './component/leave-user/leave-user.component';
import { DialogElementsExampleDialog } from './component/leave-user/leave-user.component';
import { EmployeeLeaveReport } from './component/Reports/eamployee-leave-report/employee-leave-report.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { AttendanceAdminComponent } from './component/attendance-admin/attendance-admin.component';
import {
  DialogAddFamilyInfo,
  DialogBankInformation,
  DialogEducationInformation,
  DialogFamiliyInformation,
  DialogPersonalInformation,
  ProfileUserComponent,
} from './component/profile-user/profile-user.component';
import { ProjectUserComponent } from './component/project-user/project-user.component';
import {
  EmployeeDepartmentComponent,
  DialogEmployeeDepartment,
  DialogUpdateDepartment,
  DialogDeleteDepartment,
} from './component/Settings/employee-department/employee-department.component';
import {
  DialogDeletePosition,
  DialogEmployeePosition,
  DialogUpdatePosition,
  EmployeePositionComponent,
} from './component/Settings/employee-position/employee-position.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  DialogDeleterole,
  DialogEmployeerole,
  DialogUpdaterole,
  EmployeeRoleComponent,
} from './component/Settings/employee-role/employee-role.component';
import {
  DialogDeleteBank,
  DialogEmployeeBank,
  DialogUpdateBank,
  EmployeeBankComponent,
} from './component/Settings/employee-bank/employee-bank.component';
import {
  DialogDeletedegree,
  DialogEmployeedegree,
  DialogUpdatedegree,
  EmployeeDegreeComponent,
} from './component/Settings/employee-degree/employee-degree.component';
import {
  DialogDeletefamily,
  DialogEmployeefamily,
  DialogUpdatefamily,
  EmployeeFamilyComponent,
} from './component/Settings/employee-family/employee-family.component';
import {
  DialogDeleteAttendanceType,
  DialogEmployeeAttendanceType,
  DialogUpdateAttendanceType,
  EmployeeAttendanceTypeComponent,
} from './component/Settings/employee-attendance-type/employee-attendance-type.component';
import { EmployeeReportAttendanceComponent } from './component/Reports/employee-report-attendance/employee-report-attendance.component';
import { ResetPasswordComponent } from './component/Auth/reset-password/reset-password.component';
import { LoginComponent } from './component/Auth/login/login.component';
import { ChangePasswordComponent, DialogChangePassword } from './component/Auth/change-password/change-password.component';
import { ForgotPasswordComponent } from './component/Auth/forgot-password/forgot-password.component';
import { AttendanceComponent } from './component/attendance/attendance.component';
import { EmployeeReportComponent } from './component/Reports/employee-report/employee-report.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    DashboardComponent,
    EmployeeComponent,
    AttendanceComponent,
    ReportUserComponent,
    LeaveTypeComponent,
    DialogAddLeaveType,
    DialogUpdateLeaveType,
    DialogDeleteLeaveType,
    ChangePasswordComponent,
    ForgotPasswordComponent,
    LoginComponent,
    ResetPasswordComponent,
    EmployeeLeaveComponent,
    DialogElementsDialog,
    EmployeeDetailComponent,
    NavigationUserComponent,
    DashboardUserComponent,
    LeaveUserComponent,
    DialogElementsExampleDialog,
    EmployeeReportComponent,
    EmployeeLeaveReport,
    AttendanceAdminComponent,
    ProfileUserComponent,
    DialogPersonalInformation,
    DialogEducationInformation,
    DialogBankInformation,
    DialogFamiliyInformation,
    ProjectUserComponent,
    DialogEmployeeLeave,
    EmployeeDepartmentComponent,
    DialogEmployeeDepartment,
    EmployeePositionComponent,
    DialogDeletePosition,
    DialogUpdatePosition,
    DialogEmployeePosition,
    DialogUpdateDepartment,
    DialogDeleteDepartment,
    DialogDeleteLeave,
    DialogEditEmployeeLeave,
    DialogDeleteUserLeave,
    DialogEditUserLeave,
    EmployeeRoleComponent,
    EmployeeBankComponent,
    EmployeeDegreeComponent,
    EmployeeFamilyComponent,
    EmployeeAttendanceTypeComponent,
    DialogEmployeeAttendanceType,
    DialogDeleteAttendanceType,
    DialogUpdateAttendanceType,
    DialogPersonalInfo,
    DialogDeleterole,
    DialogEmployeerole,
    DialogUpdaterole,
    DialogDeleteBank,
    DialogEmployeeBank,
    DialogUpdateBank,
    DialogDeletedegree,
    DialogEmployeedegree,
    DialogUpdatedegree,
    DialogDeletefamily,
    DialogEmployeefamily,
    DialogUpdatefamily,
    DialogAddFamilyInfo,
    EmployeeReportAttendanceComponent,
    DialogAcceptLeave,
    DialogDeclineLeave,
    DialogChangePassword,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    NgApexchartsModule,
    HttpClientModule,
    FlexLayoutModule,
    MatTableExporterModule,
  ],
  providers: [
    AuthGuard,
    AuthService,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
