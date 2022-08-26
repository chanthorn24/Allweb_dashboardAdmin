import { Component, OnInit } from '@angular/core';
import { AuthService } from './../services/auth.service';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-dashboard-user',
  templateUrl: './dashboard-user.component.html',
  styleUrls: ['./dashboard-user.component.css']
})
export class DashboardUserComponent implements OnInit {


  //attendance
  public option = {
    time!: "",
    emp_attendance_type_id!: "",
    employee_id: "",
    click: 0,
  }
  //disable button
  disable: boolean = false;

  constructor
  (private auth:  AuthService,
  private router: Router,
  private api: ApiService,
  private snackBar: SnackbarService,
  ) {}

  time!: any;
  checkTime!: any;
  checkName: string = "Clock in";
  checkType: string = "in";

  reloadCurrentRoute() {
    console.log("Work");

    const currentRoute = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentRoute]);
    })
  }

  checkIn() {
    this.api.takeAttendance(this.option).subscribe({
      next: (res) => {
        if(res.success) {
          this.disable = true;
          this.option.click -= 1;
          this.checkName = "Clock in";
          this.checkTime = new Date();

          this.snackBar.openSnackBarSuccess(this.checkName + " successfully!")
        }
      }
    })
  }
  checkOut() {
    this.api.takeAttendance(this.option).subscribe({
      next: (res) => {
        if(res.success) {
          this.disable = true;
          this.option.click -= 1;
          this.checkName = "Clock out";
          this.checkTime = new Date();

          this.snackBar.openSnackBarSuccess(this.checkName + " successfully!")
        }
      }
    })
  }

  //format date
  formatDate(date: any) {
    let formatted_date = ('0' + date.getHours()).slice(-2) + ":" + ('0' + date.getMinutes()).slice(-2) + ":" + ('0' + date.getSeconds()).slice(-2);
    return formatted_date;
  }

  ngOnInit(): void {
    let email = this.auth.getEmail();
    this.api.getOneUserByEmail(email).subscribe({
      next: (res) => {
        if(res.success) {
          this.option.employee_id = res.data[0].id;
          this.api.getTypeAttendance(this.option.employee_id).subscribe({
            next: (res) => {
              if(res.success) {
                this.option.emp_attendance_type_id = res.data.attendance_type;
                this.option.time = res.data.date_time;
                this.option.click = res.data.click;
                this.checkTime = res.data.data[0].created.date;
                if(this.option.click == 0) {
                  this.disable = true;
                }
              }
            }
          })
        }
      }
    })


    if (this.auth.isAdmin()) {
      this.router.navigateByUrl("/");
    }
    setInterval(() => {
      this.time = new Date(); //set time variable with current date

      let current_time = this.formatDate(this.time);

      if(current_time == "17:30:00") {
        this.option.emp_attendance_type_id = "4";
        this.disable = false;
      }
      if(current_time == "13:30:00") {
        this.option.emp_attendance_type_id = "3";
        this.disable = false;
      }
      if(current_time == "12:00:00") {
        this.option.emp_attendance_type_id = "2";
        this.disable = false;
      }
      if(current_time == "06:30:00") {
        this.option.emp_attendance_type_id = "1";
        this.disable = false;
      }

      }, 1000); // set it every one seconds
    }

}
