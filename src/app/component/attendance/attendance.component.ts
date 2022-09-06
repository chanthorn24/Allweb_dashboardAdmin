import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

import { MatTableDataSource } from '@angular/material/table';
import { parse } from 'date-fns';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { leave } from './../leave-user/leave-user.component';

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
                this.attendance[j] = this.attendance_user[0];
                for (let i = 1; i < res.data.length; i++) {
                  if (this.attendance_user[i].created.date.slice(0, 10) == this.attendance_user[i - 1].created.date.slice(0, 10)) {
                    arrayStore[i] = this.attendance_user[i];
                    this.attendance[j] = [this.attendance[j], arrayStore[i]];
                  } else {
                    j++;
                    arrayStore[i] = this.attendance_user[i];
                    this.attendance[j] = arrayStore[i];
                  }
                }

                var now_date = new Date();
                // var first_date = new Date(now_date.getFullYear(), now_date.getMonth(), 1);

                for (let i = 0; i < this.days.length; i++) {
                  let index = 0;
                  for (let j = index; j < this.attendance.length; j++) {
                    console.log(this.attendance[j][0].created.date);

                    if (parse(this.attendance[j][0].created.date.slice(0, 19), 'yyyy-M-d HH:mm:ss', new Date()).getDate() == (i + 1)) {
                      let num = 0;


                      for (let p = 0; p < attendanceType.length; p++) {
                        if (num == this.attendance[j].length - 1) {
                          this.attendance[j][p] = {
                            attendance_type: attendanceType[p],
                            created: {
                              date: this.formatDate(new Date(now_date.getFullYear(), now_date.getMonth(), i + 1)),
                            }
                          }
                        }
                        for (let k = num; k < this.attendance[j].length; k++) {
                          console.log(num);

                          if (attendanceType[p].name == this.attendance[j][k].attendance_type) {
                            num++;
                            break;
                          } else if (k == this.attendance[j].length - 1) {
                            this.attendance[j][p] = {
                              attendance_type: attendanceType[p],
                              created: {
                                date: this.formatDate(new Date(now_date.getFullYear(), now_date.getMonth(), i + 1)),
                              }
                            }
                          }
                        }

                      }
                      this.attendanceData[i] = this.attendance[j];
                      index++;

                      break;
                    } else if (j == this.attendance.length - 1) {
                      // for (let p = 0; p < attendanceType.length; p++) {
                      //   this.attendance[j][p] = {
                      //     attendance_type: attendanceType[p],
                      //     created: {
                      //       date: this.formatDate(new Date(now_date.getFullYear(), now_date.getMonth(), i + 1)),
                      //     }
                      //   }
                      // }
                      // this.attendanceData[i] = this.attendance[j]
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

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  { position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na' },
  { position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg' },
  { position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al' },
  { position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si' },
  { position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P' },
  { position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S' },
  { position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl' },
  { position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar' },
  { position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K' },
  { position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca' }
];




