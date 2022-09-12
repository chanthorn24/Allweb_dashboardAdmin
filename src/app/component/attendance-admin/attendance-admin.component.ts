import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { parse } from 'date-fns';
import { ApiService } from 'src/app/services/api.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

export interface UserData {
  id: string;
  firstName: string;
  lastName: string;
}


@Component({
  selector: 'app-attendance-admin',
  templateUrl: './attendance-admin.component.html',
  styleUrls: ['./attendance-admin.component.css'],
})
export class AttendanceAdminComponent implements OnInit {
  displayedColumns: any = ['id', 'name'];
  attendanceColumns: string[] = [];

  days = new Array(); //Declaring array for inserting Saturdays

  //total day in current month
  total_day!: number;
  current_day!: number;
  month!: String;

  //mothly attendance all user
  monthlyAttendanUser: any = [];
  totalUser: any = [];

  //monthly attendance each user
  attendance_user: any = [];
  attendance: any = [];
  attendanceData: any = [];
  attendanceMonthly: any = [];
  show = false;

  dataSource!: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private api: ApiService,
    private snackBar: SnackbarService,
  ) {

    // Assign the data to the data source for the table to render
  }
  //get date time
  getDateTime() {
    // 👇️ Current Month
    this.tranformNumberMonth();
    this.displayedColumns = ['id', 'name'];
    this.attendanceColumns = [];
    this.total_day = this.getDaysInMonth(this.current_year, this.current_month);
    if (this.current_month == this.date.getMonth() + 1) {
      this.current_day = this.date.getDate();
    } else {
      this.current_day = this.total_day;
    }
    for (let i = 1; i <= this.total_day; i++) {

      //looping through days in month
      this.displayedColumns[i + 1] = 'a' + i;
      this.attendanceColumns[i - 1] = 'a' + i;

      let newDate = new Date(this.current_year, this.current_month - 1, i);
      console.log(newDate, "New date");

      if (newDate.getDay() == 0) {
        //if Sunday
        // this.displayedColumns[i + 2].day = 'Sun';
        this.days.push('S');
      }
      if (newDate.getDay() == 1) {
        //if Monday
        // this.displayedColumns[i + 2].day = 'Mon';
        this.days.push('M');
      }
      if (newDate.getDay() == 2) {
        //if Tueday
        // this.displayedColumns[i + 2].day = 'Tue';
        this.days.push('T');
      }
      if (newDate.getDay() == 3) {
        //if Wednesday
        // this.displayedColumns[i + 2].day = 'Wed';
        this.days.push('W');
      }
      if (newDate.getDay() == 4) {
        //if thursday
        // this.displayedColumns[i + 2].day = 'Thu';
        this.days.push('T');
      }
      if (newDate.getDay() == 5) {
        //if friday
        // this.displayedColumns[i + 2].day = 'Fri';
        this.days.push('F');
      }

      if (newDate.getDay() == 6) {
        //if Saturday
        // this.displayedColumns[i + 2].day = 'Sat';
        this.days.push('S');
      }
    }
  }


  checkSameValueSecond = false;   //initialised before constructor
  displayFirstCondition(checkValue: any, elementValue: any, checkNumber: any, numberValue: any, date: any, day: any, type: any) {
    // console.log(new Date(this.formatDate(new Date(this.date.getFullYear(), this.date.getMonth(), day))), " ", day);
    // console.log(new Date(date.slice(0, 10)).getTime(), " ", date.slice(0, 10));
    // let user_time = new Date(this.formatDate(new Date(this.date.getFullYear(), this.date.getMonth(), day))).getTime();
    // let table_time = new Date(date.slice(0, 10)).getTime() - 25200000;

    let table_time = new Date(this.formatDate(new Date(this.current_year, this.current_month - 1, day))).getTime();
    let user_time = new Date(date.slice(0, 10)).getTime() - 25200000;

    if (user_time <= table_time) {
      if (checkValue == elementValue && checkNumber != numberValue && type == 'clock in 1') {
        this.checkSameValueSecond = true;
        return false;
      }
      if (!this.checkSameValueSecond && checkNumber == numberValue) {
        this.checkSameValueSecond = false;
        return true;
      }
      if (checkNumber == numberValue) {
        this.checkSameValueSecond = false;
      }
    }


    return "";
  }

  checkLateTimeAM(time: any) {
    // console.log(new Date(time).getHours());
    if (new Date(time).getHours() > 9) {
      return true;
    } else {
      return false;
    }

  }
  checkLateTimePM(time: any) {
    // console.log(new Date(time).getHours());
    if (new Date(time).getHours() > 14) {
      return true;
    } else {
      return false;
    }

  }

  checkSameValue = false;
  displaySecondCondition(checkValue: any, elementValue: any, checkNumber: any, numberValue: any, date: any, day: any, type: any) {
    // console.log(new Date(this.formatDate(new Date(this.date.getFullYear(), this.date.getMonth(), day))), " ", day);
    // console.log(new Date(date.slice(0, 10)).getTime(), " ", date.slice(0, 10));
    // let user_time = new Date(this.formatDate(new Date(this.date.getFullYear(), this.date.getMonth(), day))).getTime();
    // let table_time = new Date(date.slice(0, 10)).getTime() - 25200000;

    let table_time = new Date(this.formatDate(new Date(this.current_year, this.current_month - 1, day))).getTime();
    let user_time = new Date(date.slice(0, 10)).getTime() - 25200000;
    // console.log(user_time, " ", table_time);

    if (user_time <= table_time) {
      if (checkValue == elementValue && checkNumber != numberValue && type == 'clock in 2') {
        this.checkSameValue = true;
        return false;
      }
      if (!this.checkSameValue && checkNumber == numberValue && checkValue != elementValue) {
        this.checkSameValue = false;
        return true;
      }
      if (checkNumber == numberValue) {
        this.checkSameValue = false;
      }
    }


    return "";
  }

  //format date
  formatDate(date: any) {
    let formatted_date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    return formatted_date;
  }

  //get number of day
  getDaysInMonth(year: any, month: any) {
    return new Date(year, month, 0).getDate();
  }

  //get current month
  date = new Date();
  currentYear = this.date.getFullYear();
  currentMonth = this.date.getMonth() + 1;
  current_year = this.date.getFullYear();
  current_month = this.date.getMonth() + 1;

  tranformMonth() {
    if (this.current_month == 1) {
      this.month = "Jan"
    }
    if (this.current_month == 2) {
      this.month = "Feb"
    }
    if (this.current_month == 3) {
      this.month = "Mar"
    }
    if (this.current_month == 4) {
      this.month = "Apr"
    }
    if (this.current_month == 5) {
      this.month = "May"
    }
    if (this.current_month == 6) {
      this.month = "Jun"
    }
    if (this.current_month == 7) {
      this.month = "Jul"
    }
    if (this.current_month == 8) {
      this.month = "Aug"
    }
    if (this.current_month == 9) {
      this.month = "Sep"
    }
    if (this.current_month == 10) {
      this.month = "Oct"
    }
    if (this.current_month == 11) {
      this.month = "Nov"
    }
    if (this.current_month == 12) {
      this.month = "Dec"
    }
  }

  tranformNumberMonth() {
    if (this.month == "Jan") {
      this.current_month = 1
    }
    if (this.month == "Feb") {
      this.current_month = 2
    }
    if (this.month == "Mar") {
      this.current_month = 3
    }
    if (this.month == "Apr") {
      this.current_month = 4
    }
    if (this.month == "May") {
      this.current_month = 5
    }
    if (this.month == "Jun") {
      this.current_month = 6
    }
    if (this.month == "Jul") {
      this.current_month = 7
    }
    if (this.month == "Aug") {
      this.current_month = 8
    }
    if (this.month == "Sep") {
      this.current_month = 9
    }
    if (this.month == "Oct") {
      this.current_month = 10
    }
    if (this.month == "Nov") {
      this.current_month = 11
    }
    if (this.month == "Dec") {
      this.current_month = 12
    }
  }


  // compare two date
  compareTwoDate(day: any, user_date: any) {

    let table_time = new Date(this.formatDate(new Date(this.current_year, this.current_month - 1, day))).getTime();
    let user_time = new Date(user_date.slice(0, 10)).getTime() - 25200000;

    //check user start when
    if (user_time > table_time) {
      return true;
    } else {
      return false;
    }
  }

  //search button
  searchMonthYear() {
    this.attendance_user = [];
    this.attendance = [];
    this.attendanceData = [];
    this.attendanceMonthly = [];
    this.days = [];
    this.getDateTime();
    this.getAllMonthlyAttendance();
  }
  //get all user monthly attendance
  getAllMonthlyAttendance() {
    //get all monthly user attendance
    this.api.getAllMonthlyAttendance(this.month, this.current_year).subscribe({
      next: (res) => {
        if (res.success) {
          console.log(res.data, "Change month");

          this.monthlyAttendanUser = res.data;
          this.attendance_user = res.data;
          let j = 0;
          let arrayStore = [];
          // let arrayOfObject = [];
          let indexOfArr = 1;
          let first = true;
          this.attendance[0] = [this.attendance_user[0]];
          arrayStore[indexOfArr - 1] = this.attendance_user[0];

          for (let i = 1; i < res.data.length; i++) {
            if (this.attendance_user[i]?.created.date.slice(0, 10) == this.attendance_user[i - 1]?.created.date.slice(0, 10)) {
              if (!first) {
                arrayStore[indexOfArr - 1] = this.attendance_user[i - 1];
                first = true;
              }
              arrayStore[indexOfArr] = this.attendance_user[i];
              this.attendance[j] = arrayStore;
              indexOfArr++;
            } else {
              indexOfArr = 0;
              j++;
              arrayStore = [];
              arrayStore[indexOfArr] = this.attendance_user[i];
              this.attendance[j] = arrayStore;
              indexOfArr++;
              first = false;
            }
          }

          console.log(this.attendance, "attendance");
          // console.log(this.attendance.length, "attendance");

          /***** Find only clock in 1 & 2*/
          for (let index = 0; index < this.attendance.length; index++) {
            arrayStore = [];

            // console.log(this.totalUser.length, "user");

            for (let num = 0; num < this.totalUser.length; num++) {
              for (let i = 0; i < this.attendance[index].length; i++) {
                // console.log(this.attendance[index][i], "attendance");
                if (this.attendance[index][i]?.attendance_type == "clock in 1" || this.attendance[index][i]?.attendance_type == "clock in 2") {
                  arrayStore[i] = this.attendance[index][i];
                }
              }
              this.attendanceData[index] = arrayStore;
            }
          }

          // console.log(this.attendanceData, "data data");


          let index = 0;
          for (let day = 0; day < this.current_day; day++) {
            let increase = 0;
            for (index = increase; index < this.attendanceData.length; index++) {
              if (parse(this.attendance[index][0]?.created.date.slice(0, 19), 'yyyy-M-d HH:mm:ss', new Date()).getDate() == (day + 1)) {
                this.attendanceMonthly[day] = this.attendanceData[index];
                increase++;
                break;
              } else if (index == this.attendanceData.length - 1) {
                this.attendanceMonthly[day] = [{
                  created: {
                    date: this.formatDate(new Date(this.date.getFullYear(), this.date.getMonth(), day + 1)),
                  }
                }]
              }

            }
          }

          console.log(this.attendanceMonthly, "data Monthly");
          // console.log(this.monthlyAttendanUser);
        }
      },
      error: (error) => {
        this.snackBar.openSnackBarFail(error.message);
      }
    })
  }

  ngOnInit(): void {

    this.current_day = this.date.getDate();
    this.tranformMonth();
    this.getDateTime();
    //get all employee
    this.api.getUserName().subscribe({
      next: (res) => {
        if (res.success) {
          this.totalUser = res.data;
          this.getAllMonthlyAttendance();
          this.dataSource = new MatTableDataSource<UserData>(res.data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      },
      error: (error) => {
        this.snackBar.openSnackBarFail(error.message);
      }
    })





    // console.log(this.attendanceColumns);

    // console.log(this.days);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
