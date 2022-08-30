import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';


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
import { EmployeeComponent, DialogElementsDialog } from './component/employee/employee.component';
import { AttendanceComponent } from './component/attendance/attendance.component';
import { ReportComponent } from './component/report/report.component';
import { DialogAddLeaveType, DialogDeleteLeaveType, DialogUpdateLeaveType, LeaveTypeComponent } from './component/leave-type/leave-type.component';
import { ChangePasswordComponent } from './component/change-password/change-password.component';
import { DialogEmployeeLeave, EmployeeLeaveComponent, DialogDeleteLeave, DialogEditEmployeeLeave } from './component/employee-leave/employee-leave.component';
import { DialogPersonalInfo, EmployeeDetailComponent } from './component/employee-detail/employee-detail.component';
import { LoginComponent } from './component/login/login.component';
import { NavigationUserComponent } from './navigation-user/navigation-user.component';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { DashboardUserComponent } from './dashboard-user/dashboard-user.component';
import { DialogDeleteUserLeave, DialogEditUserLeave, LeaveUserComponent } from './component/leave-user/leave-user.component';
import { DialogElementsExampleDialog } from './component/leave-user/leave-user.component';
import { EmployeeReportComponent } from './component/employee-report/employee-report.component';
import { AttendanceReportComponent } from './component/attendance-report/attendance-report.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { AttendanceAdminComponent } from './component/attendance-admin/attendance-admin.component';
import { DialogBankInformation, DialogEducationInformation, DialogFamiliyInformation, DialogPersonalInformation, ProfileUserComponent } from './component/profile-user/profile-user.component';
import { ProjectUserComponent } from './component/project-user/project-user.component';
import { ResetPasswordComponent } from './component/reset-password/reset-password.component';
import { EmployeeDepartmentComponent, DialogEmployeeDepartment, DialogUpdateDepartment, DialogDeleteDepartment } from './component/employee-department/employee-department.component';
import { DialogDeletePosition, DialogEmployeePosition, DialogUpdatePosition, EmployeePositionComponent } from './component/employee-position/employee-position.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DialogDeleterole, DialogEmployeerole, DialogUpdaterole, EmployeeRoleComponent } from './component/employee-role/employee-role.component';
import { DialogDeleteBank, DialogEmployeeBank, DialogUpdateBank, EmployeeBankComponent } from './component/employee-bank/employee-bank.component';
import { DialogDeletedegree, DialogEmployeedegree, DialogUpdatedegree, EmployeeDegreeComponent } from './component/employee-degree/employee-degree.component';
import { DialogDeletefamily, DialogEmployeefamily, DialogUpdatefamily, EmployeeFamilyComponent } from './component/employee-family/employee-family.component';
import { DialogDeleteAttendanceType, DialogEmployeeAttendanceType, DialogUpdateAttendanceType, EmployeeAttendanceTypeComponent } from './component/employee-attendance-type/employee-attendance-type.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    DashboardComponent,
    EmployeeComponent,
    AttendanceComponent,
    ReportComponent,
    LeaveTypeComponent,
    DialogAddLeaveType,
    DialogUpdateLeaveType,
    DialogDeleteLeaveType,
    ChangePasswordComponent,
    EmployeeLeaveComponent,
    DialogElementsDialog,
    EmployeeDetailComponent,
    LoginComponent,
    NavigationUserComponent,
    ForgotPasswordComponent,
    DashboardUserComponent,
    LeaveUserComponent,
    DialogElementsExampleDialog,
    EmployeeReportComponent,
    AttendanceReportComponent,
    AttendanceAdminComponent,
    ProfileUserComponent,
    DialogPersonalInformation,
    DialogEducationInformation,
    DialogBankInformation,
    DialogFamiliyInformation,
    ProjectUserComponent,
    DialogEmployeeLeave,
    ResetPasswordComponent,
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
  ],
  providers: [AuthGuard, AuthService, { provide: JWT_OPTIONS, useValue: JWT_OPTIONS }, JwtHelperService],
  bootstrap: [AppComponent]
})
export class AppModule { }
