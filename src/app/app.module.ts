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
import { LeaveTypeComponent } from './component/leave-type/leave-type.component';
import { ChangePasswordComponent } from './component/change-password/change-password.component';
import { DialogEmployeeLeave, EmployeeLeaveComponent } from './component/employee-leave/employee-leave.component';
import { EmployeeDetailComponent } from './component/employee-detail/employee-detail.component';
import { LoginComponent } from './component/login/login.component';
import { NavigationUserComponent } from './navigation-user/navigation-user.component';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { DashboardUserComponent } from './dashboard-user/dashboard-user.component';
import { LeaveUserComponent } from './component/leave-user/leave-user.component';
import { DialogElementsExampleDialog } from './component/leave-user/leave-user.component';
import { EmployeeReportComponent } from './component/employee-report/employee-report.component';
import { AttendanceReportComponent } from './component/attendance-report/attendance-report.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { AttendanceAdminComponent } from './component/attendance-admin/attendance-admin.component';
import { ProfileUserComponent } from './component/profile-user/profile-user.component';
import { ProjectUserComponent } from './component/project-user/project-user.component';
import { ResetPasswordComponent } from './component/reset-password/reset-password.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    DashboardComponent,
    EmployeeComponent,
    AttendanceComponent,
    ReportComponent,
    LeaveTypeComponent,
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
    ProjectUserComponent,
    DialogEmployeeLeave,
    ResetPasswordComponent
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
    HttpClientModule
  ],
  providers: [AuthGuard, AuthService, { provide: JWT_OPTIONS, useValue: JWT_OPTIONS }, JwtHelperService],
  bootstrap: [AppComponent]
})
export class AppModule { }
