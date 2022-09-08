import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

import { MatTableDataSource } from '@angular/material/table';
import { parse } from 'date-fns';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { leave } from './../leave-user/leave-user.component';
import { AttendanceType } from './../Settings/employee-attendance-type/employee-attendance-type.component';

export interface attendanceUser {
  date: any,
  attendance_type: any,
}

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {
  today: Date = new Date();
  pipe = new DatePipe('en-US');
  todayWithPipe!: any;
  dateTime!: any;
  time = new Date();

  //clock time
  clockTime: any = [];
  checkType!: any;
  workTimeHour!: any;

  //monthly attendance each user
  attendance_user: any = [];
  attendance: any = [];
  attendanceData: any = [];
  tempArray: any = [];
  no = 1;

  //number of day
  days = new Array();

  //total day in current month
  total_day!: number;
  //get current month
  date = new Date();
  currentYear = this.date.getFullYear();
  currentMonth = this.date.getMonth() + 1;
  currentDay = this.date.getDate();

  constructor(
    private api: ApiService,
    private auth: AuthService,
  ) { }


  displayedColumns: string[] = ['date', 'clock in 1', 'clock out 1', 'clock in 2', 'clock out 2', 'total hours'];
  dataSource !: MatTableDataSource<attendanceUser>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;



  //calculate work time
  getWorkTime(start: any, end: any) {
    let RELAX_TIME = 1.5;
    if (start.getTime() >= 48600000) {
      RELAX_TIME = 0;
    }

    let duration = (end.getTime() - start.getTime()) / 3600000;
    return duration - RELAX_TIME;
  }
  //get number of day
  getDaysInMonth(year: any, month: any) {
    return new Date(year, month, 0).getDate();
  }

  //format date
  formatDate(date: any) {
    let formatted_date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    return formatted_date;
  }


  ngOnInit(): void {
    // 👇️ Current Month
    this.total_day = this.getDaysInMonth(this.currentYear, this.currentMonth);
    for (let i = 1; i <= this.currentDay; i++) {
      //looping through days in month

      let newDate = new Date(this.date.getFullYear(), this.date.getMonth(), i);

      if (newDate.getDay() == 0) {
        //if Sunday
        // this.displayedColumns[i + 2].day = 'Sun';
        this.days.push({ day: 'Sun', color: '#d14a43' });
      }
      if (newDate.getDay() == 1) {
        //if Monday
        // this.displayedColumns[i + 2].day = 'Mon';
        this.days.push({ day: 'Mon', color: 'rgb(240, 179, 24)' });
      }
      if (newDate.getDay() == 2) {
        //if Tueday
        // this.displayedColumns[i + 2].day = 'Tue';
        this.days.push({ day: 'Tue', color: '#d6569b' });
      }
      if (newDate.getDay() == 3) {
        //if Wednesday
        // this.displayedColumns[i + 2].day = 'Wed';
        this.days.push({ day: 'Wed', color: '#52ab62' });
      }
      if (newDate.getDay() == 4) {
        //if thursday
        // this.displayedColumns[i + 2].day = 'Thu';
        this.days.push({ day: 'Thu', color: '#e08b44' });
      }
      if (newDate.getDay() == 5) {
        //if friday
        // this.displayedColumns[i + 2].day = 'Fri';
        this.days.push({ day: 'Fri', color: '#3eb4f0' });
      }

      if (newDate.getDay() == 6) {
        //if Saturday
        // this.displayedColumns[i + 2].day = 'Sat';
        this.days.push({ day: 'Sat', color: '#80589e' });
      }
    }
    this.days = this.days.reverse();
    console.log(this.days);

    let attendanceType = [
      {
        name: "clock in 1"
      },
      {
        name: "clock out 1"
      },
      {
        name: "clock in 2"
      },
      {
        name: "clock out 2"
      },
    ]


    let email = this.auth.getEmail();
    this.api.getOneUserByEmail(email).subscribe({
      next: (res) => {
        if (res.success) {
          this.api.getMonthlyAttendanceUser(res.data[0].id).subscribe({
            next: (res) => {
              if (res.success) {
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

                console.log(this.attendance);

                // for (let i = 1; i < res.data.length; i++) {
                //   if (this.attendance_user[i].created.date.slice(0, 10) == this.attendance_user[i - 1].created.date.slice(0, 10)) {
                //     if (!first) {
                //       this.attendance[j] = this.attendance_user[i - 1];
                //       first = true;
                //     }
                //     arrayStore[i] = this.attendance_user[i];
                //     this.attendance[j] = [this.attendance[j], arrayStore[i]];
                //   } else {
                //     j++;
                //     arrayStore[i] = this.attendance_user[i];
                //     this.attendance[j] = [arrayStore[i]];
                //     first = false;
                //   }
                // }

                // console.log(this.attendance);


                var now_date = new Date();
                // var first_date = new Date(now_date.getFullYear(), now_date.getMonth(), 1);
                let index = 0;
                for (let i = 0; i < this.days.length; i++) {
                  for (let j = index; j < this.attendance.length; j++) {
                    // console.log(this.attendance[j][0].created.date);

                    if (parse(this.attendance[j][0].created.date.slice(0, 19), 'yyyy-M-d HH:mm:ss', new Date()).getDate() == (i + 1)) {
                      let num = 0;


                      for (let p = 0; p < attendanceType.length; p++) {
                        if (num > this.attendance[j].length - 1) {
                          this.attendance[j][p] = {
                            attendance_type: attendanceType[p],
                            created: {
                              date: this.formatDate(new Date(now_date.getFullYear(), now_date.getMonth(), i + 1)),
                            }
                          }
                        }
                        for (let k = num; k < this.attendance[j].length; k++) {
                          // console.log(this.attendance[j].length);
                          // console.log(this.attendance[j][k], 'k', k);


                          if (!this.attendance[j][k]) {
                            if (attendanceType[p].name == this.attendance[j][k].attendance_type) {
                              num++;
                              break;
                            }
                          }
                        }

                      }
                      this.attendanceData[i] = this.attendance[j];
                      index++;

                      break;
                    }
                    // else {
                    //   console.log("hello ", j);

                    // }

                  }
                  if (j == this.attendance.length - 1) {
                    console.log("hello", i, " ", j, this.attendanceData[i]);
                    if (this.attendanceData[i]) {
                      this.tempArray = [];
                      let indexArray = [];

                      for (let num = 0; num < this.attendanceData[i].length; num++) {
                        this.tempArray[num] = this.attendanceData[i][num];
                        if (this.attendanceData[i][num].attendance_type == "clock in 1") {
                          indexArray[num] = 0;
                        } else if (this.attendanceData[i][num].attendance_type == "clock out 1") {
                          indexArray[num] = 1;
                        } else if (this.attendanceData[i][num].attendance_type == "clock in 2") {
                          indexArray[num] = 2;
                        } else if (this.attendanceData[i][num].attendance_type == "clock out 2") {
                          indexArray[num] = 3;
                        }
                      }

                      let type = 0;
                      for (let index = this.attendanceData[i].length; index < attendanceType.length; index++) {
                        for (let t = 0; t < indexArray.length; t++) {
                          if (type == indexArray[t]) {
                            type++;
                          }
                        }
                        console.log(type);

                        this.tempArray[index] = {
                          attendance_type: attendanceType[type],
                          created: {
                            date: this.formatDate(new Date(now_date.getFullYear(), now_date.getMonth(), i + 1)),
                          }
                        }
                        type++;
                      }
                      this.attendanceData[i] = this.tempArray;

                    } else {
                      this.attendanceData[i] = {
                        attendance_type: attendanceType[0],
                        created: {
                          date: this.formatDate(new Date(now_date.getFullYear(), now_date.getMonth(), i + 1)),
                        }
                      }
                      this.tempArray = [];
                      for (let att = 0; att < attendanceType.length; att++) {
                        this.tempArray[att] = {
                          attendance_type: attendanceType[att],
                          created: {
                            date: this.formatDate(new Date(now_date.getFullYear(), now_date.getMonth(), i + 1)),
                          }
                        }
                      }
                      this.attendanceData[i] = this.tempArray;
                    }
                  }
                }

                this.dataSource = new MatTableDataSource<attendanceUser>(this.attendanceData.reverse());
                this.dataSource.paginator = this.paginator;
                console.log(this.attendanceData);

              }
            }
          })
          this.api.getTypeAttendance(res.data[0].id).subscribe({
            next: (res) => {
              if (res.success) {
                let length = res.data.data.length;

                // if(length == 1) {
                //   this.clockTime[this.checkType-1] = res.data.data[0].created.date;
                //   this.clockTime[5] = this.clockTime[this.checkType-1].slice(0,19);
                // }else {
                //   for(let i=0; i<length; i++) {
                //     this.clockTime[i] = res.data.data[i].created.date;
                //   }
                //   this.clockTime[5] = this.clockTime[0].slice(0,19);
                // }

                for (let i = 0; i < length; i++) {
                  this.checkType = res.data.data[i].attendance_type;
                  this.clockTime[this.checkType - 1] = res.data.data[i].created.date;
                  if (i == 0) {
                    this.clockTime[5] = this.clockTime[this.checkType - 1].slice(0, 19);
                  }
                }
                // this.clockTime[5] = this.clockTime[0].slice(0,19);


                let dateT = parse(this.clockTime[5], 'yyyy-M-d HH:mm:ss', new Date());

                this.workTimeHour = this.getWorkTime(dateT, this.today);
              }
            }
          })
        }
      }
    })


    setInterval(() => {
      this.time = new Date(); //set time variable with current date
    }, 1000); // set it every one seconds

    this.dateTime = this.pipe.transform(Date.now(), 'EEEE, dd MMM yyyy');
  }

}



