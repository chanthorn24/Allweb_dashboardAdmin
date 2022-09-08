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
  displayedColumns: any = ['id', 'name', 'total'];
  attendanceColumns: string[] = [];

  days = new Array(); //Declaring array for inserting Saturdays

  //total day in current month
  total_day!: number;
  current_day!: number;


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
  checkSameValue!: boolean;   //initialised before constructor
  displayCondition(checkValue: any, elementValue: any, checkNumber: any, numberValue: any) {
    console.log(checkNumber, this.checkSameValue, numberValue)

    if (checkValue == elementValue && checkNumber != numberValue) {
      this.checkSameValue = true;
      // alert("hello")
      return false;
    }
    if (!this.checkSameValue && checkNumber == numberValue && checkValue != elementValue) {
      this.checkSameValue = false;
      return true;
    }
    if (checkNumber == numberValue) {
      this.checkSameValue = false;
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

  //get all user monthly attendance
  getAllMonthlyAttendance() {
    //get all monthly user attendance
    this.api.getAllMonthlyAttendance().subscribe({
      next: (res) => {
        if (res.success) {
          this.monthlyAttendanUser = res.data;
          this.attendance_user = res.data;
          let j = 0;
          let arrayStore = [];
          // let arrayOfObject = [];
          let indexOfArr = 0;
          let first = true;
          this.attendance[0] = [this.attendance_user[0]];
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

          // console.log(this.attendance, "attendance");
          // console.log(this.attendance.length, "attendance");


          for (let index = 0; index < this.attendance.length; index++) {
            arrayStore = [];

            // console.log(this.totalUser.length, "user");

            for (let num = 0; num < this.totalUser.length; num++) {
              for (let i = 0; i < this.attendance[index].length; i++) {
                console.log(this.attendance[0][0], "attendance");
                if (this.attendance[index][i].employee_id == num + 1) {
                  arrayStore[i] = this.attendance[index][i];
                  break;
                }
              }
              this.attendanceData[index] = arrayStore;
            }
          }

          let index = 0;
          for (let day = 0; day < this.current_day; day++) {
            let increase = 0;
            for (index = increase; index < this.attendanceData.length; index++) {
              if (parse(this.attendance[index][0].created.date.slice(0, 19), 'yyyy-M-d HH:mm:ss', new Date()).getDate() == (day + 1)) {
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

          // console.log(this.attendanceMonthly, "data Monthly");
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




    // 👇️ Current Month
    this.total_day = this.getDaysInMonth(this.currentYear, this.currentMonth);

    for (let i = 1; i <= this.total_day; i++) {

      //looping through days in month
      this.displayedColumns[i + 2] = 'a' + i;
      this.attendanceColumns[i - 1] = 'a' + i;

      let newDate = new Date(this.date.getFullYear(), this.date.getMonth(), i);

      if (newDate.getDay() == 0) {
        //if Sunday
        // this.displayedColumns[i + 2].day = 'Sun';
        this.days.push('Sun');
      }
      if (newDate.getDay() == 1) {
        //if Monday
        // this.displayedColumns[i + 2].day = 'Mon';
        this.days.push('Mon');
      }
      if (newDate.getDay() == 2) {
        //if Tueday
        // this.displayedColumns[i + 2].day = 'Tue';
        this.days.push('Tue');
      }
      if (newDate.getDay() == 3) {
        //if Wednesday
        // this.displayedColumns[i + 2].day = 'Wed';
        this.days.push('Web');
      }
      if (newDate.getDay() == 4) {
        //if thursday
        // this.displayedColumns[i + 2].day = 'Thu';
        this.days.push('Thu');
      }
      if (newDate.getDay() == 5) {
        //if friday
        // this.displayedColumns[i + 2].day = 'Fri';
        this.days.push('Fri');
      }

      if (newDate.getDay() == 6) {
        //if Saturday
        // this.displayedColumns[i + 2].day = 'Sat';
        this.days.push('Sat');
      }
    }
    console.log(this.attendanceColumns);

    console.log(this.days);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
