import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface UserData {
  id: string;
  name: string;
  progress: string;
  fruit: string;
}

/** Constants used to fill up our data base. */
const FRUITS: string[] = [
  'blueberry',
  'lychee',
  'kiwi',
  'mango',
  'peach',
  'lime',
  'pomegranate',
  'pineapple',
];
const NAMES: string[] = [
  'Maia',
  'Asher',
  'Olivia',
  'Atticus',
  'Amelia',
  'Jack',
  'Charlotte',
  'Theodore',
  'Isla',
  'Oliver',
  'Isabella',
  'Jasper',
  'Cora',
  'Levi',
  'Violet',
  'Arthur',
  'Mia',
  'Thomas',
  'Elizabeth',
];

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

  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    // Create 100 users
    const users = Array.from({ length: 12 }, (_, k) => createNewUser(k + 1));

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(users);
  }

  //get number of day
  getDaysInMonth(year: any, month: any) {
    return new Date(year, month, 0).getDate();
  }

  //get current month
  date = new Date();
  currentYear = this.date.getFullYear();
  currentMonth = this.date.getMonth() + 1;

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    // 👇️ Current Month
    this.total_day = this.getDaysInMonth(this.currentYear, this.currentMonth);

    // for (let i = 1; i <= this.total_day; i++) {
    //   this.displayedColumns[i + 2] = 'a' + i;
    //   this.attendanceColumns[i - 1] = 'a' + i;
    // }

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

/** Builds and returns a new User. */
function createNewUser(id: number): UserData {
  const name =
    NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
    ' ' +
    NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
    '.';

  return {
    id: id.toString(),
    name: name,
    progress: Math.round(Math.random() * 100).toString(),
    fruit: FRUITS[Math.round(Math.random() * (FRUITS.length - 1))],
  };
}
