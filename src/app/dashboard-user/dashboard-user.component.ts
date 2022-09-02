import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from './../services/auth.service';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { ChartComponent } from 'ng-apexcharts';

//column chart
export type ColumnChartOptions = {
  series: any;
  chart: any;
  dataLabels: any;
  plotOptions: any;
  yaxis: any;
  xaxis: any;
  fill: any;
  tooltip: any;
  stroke: any;
  legend: any;
};

@Component({
  selector: 'app-dashboard-user',
  templateUrl: './dashboard-user.component.html',
  styleUrls: ['./dashboard-user.component.css'],
})
export class DashboardUserComponent implements OnInit {
  @ViewChild("chart") chart!: ChartComponent;
  public columnchartOption!: Partial<ColumnChartOptions>;

  //user name
  user_name: any = '';
  imageURL!: string;
  department!: string;

  //attendance
  public option = {
    time: '',
    emp_attendance_type_id: '',
    employee_id: '',
    click: 0,
  };
  //disable button
  disable: boolean = false;

  constructor(
    private auth: AuthService,
    private router: Router,
    private api: ApiService,
    private snackBar: SnackbarService,

  ) {
    //column chart
    this.columnchartOption = {
      series: [
        {
          name: "Attendance",
          data: [20, 22, 21, 19, 18, 22, 22, 21, 20],
          color: 'rgb(2, 83, 204)',
        },
        {
          name: "Absent",
          data: [2, 3, 1, 0, 6, 3, 2, 5, 0],
          color: '#00c5fb',
        },
      ],
      chart: {
        type: "bar",
        height: 250
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "65%",
          endingShape: "rounded"
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"]
      },
      xaxis: {
        categories: [
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct"
        ]
      },
      yaxis: {
        title: {
          text: "$ (thousands)"
        }
      },
      fill: {
        opacity: 1,
        colors: ['rgb(2, 83, 204)', '']
      },
      tooltip: {
        y: {
          formatter: function (val: string) {
            return "$ " + val + " thousands";
          }
        }
      }
    };
  }

  time!: any;
  checkTime!: any;
  checkName: string = 'Clock in';
  checkType: string = 'in';

  reloadCurrentRoute() {
    console.log('Work');

    const currentRoute = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentRoute]);
    });
  }

  checkIn() {
    this.api.takeAttendance(this.option).subscribe({
      next: (res) => {
        if (res.success) {
          this.disable = true;
          this.option.click -= 1;
          this.checkName = 'Clock in';
          this.checkTime = new Date();

          this.snackBar.openSnackBarSuccess(this.checkName + ' successfully!');
        }
      },
    });
  }
  checkOut() {
    this.api.takeAttendance(this.option).subscribe({
      next: (res) => {
        if (res.success) {
          this.disable = true;
          this.option.click -= 1;
          this.checkName = 'Clock out';
          this.checkTime = new Date();

          this.snackBar.openSnackBarSuccess(this.checkName + ' successfully!');
        }
      },
    });
  }

  //format date
  formatDate(date: any) {
    let formatted_date =
      ('0' + date.getHours()).slice(-2) +
      ':' +
      ('0' + date.getMinutes()).slice(-2) +
      ':' +
      ('0' + date.getSeconds()).slice(-2);
    return formatted_date;
  }

  //chart column

  ngOnInit(): void {
    let email = this.auth.getEmail();
    this.api.getOneUserByEmail(email).subscribe({
      next: (res) => {
        if (res.success) {
          //user name
          this.user_name = res.data[0].firstName + ' ' + res.data[0].lastName;
          this.imageURL = res.data[0].imageURL;
          this.department = res.data[0].department;

          this.option.employee_id = res.data[0].id;
          this.api.getTypeAttendance(this.option.employee_id).subscribe({
            next: (res) => {
              if (res.success) {
                this.option.emp_attendance_type_id = res.data.attendance_type;
                this.option.time = res.data.date_time;
                this.option.click = res.data.click;

                let length = res.data.data.length;
                // console.log(length);

                if (length > 1) {
                  this.checkTime = res.data.data[length - 1].created.date;
                }
                if (this.option.click == 0) {
                  this.disable = true;
                }
              }
            },
          });
        }
      },
    });

    if (this.auth.isAdmin()) {
      this.router.navigateByUrl('/');
    }
    setInterval(() => {
      this.time = new Date(); //set time variable with current date

      let current_time = this.formatDate(this.time);

      if (current_time == '18:00:00') {
        this.option.emp_attendance_type_id = '4';
        this.disable = false;
      }
      if (current_time == '13:30:00') {
        this.option.emp_attendance_type_id = '3';
        this.disable = false;
      }
      if (current_time == '12:00:00') {
        this.option.emp_attendance_type_id = '2';
        this.disable = false;
      }
      if (current_time == '06:30:00') {
        this.option.emp_attendance_type_id = '1';
        this.disable = false;
      }
    }, 1000); // set it every one seconds
  }
}
