import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

import { MatTableDataSource } from '@angular/material/table';
import { parse } from 'date-fns';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';



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


  constructor(
    private api: ApiService,
    private auth: AuthService,
  ) { }


  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  //calculate work time
  getWorkTime(start: any, end: any) {
    let RELAX_TIME = 1.5;

    if(start.getTime() >= 48600000) {
      RELAX_TIME = 0;
    }


    let duration = (end.getTime() - start.getTime())/3600000;

    return duration - RELAX_TIME;
  }


  ngOnInit(): void {
    let email = this.auth.getEmail();
    this.api.getOneUserByEmail(email).subscribe({
      next: (res) => {
        if(res.success) {
          this.api.getTypeAttendance(res.data[0].id).subscribe({
            next: (res) => {
              if(res.success) {
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

                  for(let i=0; i<length; i++) {
                    this.checkType = res.data.data[i].attendance_type;
                    this.clockTime[this.checkType-1] = res.data.data[i].created.date;
                    if(i == 0) {
                      this.clockTime[5] = this.clockTime[this.checkType-1].slice(0,19);
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




