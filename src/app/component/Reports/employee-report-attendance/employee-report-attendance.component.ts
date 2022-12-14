import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { AuthGuard } from 'src/app/services/auth.guard';
import { MatSort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { parse } from 'date-fns';

export interface Employee {
  employeeId: any,
  firstName: any,
  lastName: any,
  email: any,
  date: any,

  attendance_type: any,
  totalhours: any,
}

@Component({
  selector: 'app-employee-report-attendance',
  templateUrl: './employee-report-attendance.component.html',
  styleUrls: ['./employee-report-attendance.component.css']
})
export class EmployeeReportAttendanceComponent implements OnInit {
  displayedColumns: string[] = ['employeeId', 'date', 'name', 'clock in 1', 'clock out 1', 'clock in 2', 'clock out 2', 'totalhours'];
  dataSource!: MatTableDataSource<Employee>;
  //auto complete
  myControl = new FormControl('');
  options: string[] = [];
  filteredOptions!: Observable<string[]>;

  //clear input search
  value = "";
  length = 0;

  isLoading = true;
  //export file section
  formatted!: string;
  datenow = new Date();

  public employee: any;
  id: any;

  totalLeave: any = [];


  constructor(
    private authGard: AuthGuard,
    private router: Router,
    private api: ApiService,
    private snackBar: SnackbarService,
  ) {
    this.formatted = formatDate(this.datenow, 'dd-MM-yyyy', 'en-US')
  }
  @ViewChild(MatTable) table!: MatTable<Employee>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  notClockIn = "Not Clock In";
  notClockOut = "Not Clock Out";
  //check if exist
  checkTrue = true;
  checkCondition(valueAtten: any, atten: any, checkNumber: any, numberValue: any): any {
    if (valueAtten == atten) {
      this.checkTrue = false;
    }
    if (valueAtten != atten && checkNumber == numberValue && this.checkTrue) {
      return true;
    }
    if (checkNumber == numberValue) {
      this.checkTrue = true;
    }

    // return "";
  }
  getDaysInMonth(year: any, month: any) {
    return new Date(year, month, 0).getDate();
  }
  formatDate(date: any) {
    let formatted_date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    return formatted_date;
  }
  dayCollection: any = [];
  date = new Date();
  getUser: any;
  getAttendanceMonthly() {
    this.api.getAllMonthlyAttendance("Sep", 2022).subscribe({
      next: (res) => {
        if (res.success) {
          console.log("Hello", res.data);
          let n = this.getDaysInMonth(2022, '09');

          for (let j = 1; j <= n; j++) {
            let OneDays = [
              {
                created: this.formatDate(new Date(this.date.getFullYear(), this.date.getMonth(), j))
              }
            ];
            let index = 0;
            for (let i = 0; i < res.data.length; i++) {
              // let day = this.convertStringtoDate(res.data[i].created.date);
              let day = parse(res.data[i].created.date.slice(0, 19), 'yyyy-M-d HH:mm:ss', new Date())
              if (j == day.getDate()) {
                OneDays[index] = res.data[i];
                index++;
              }
            }

            this.dayCollection.push(OneDays);
          }
          console.log(this.dayCollection);
          //render
          this.length = this.dayCollection.length;
          this.dataSource = new MatTableDataSource<Employee>(this.dayCollection);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          //loading
          this.isLoading = false;
        }
      },
      error: (err) => {
        console.log(err);
      }
    })
  }



  getAttendanceDaily() {
    var date = new Date();
    console.log(this.getDaysInMonth(2022, 9));
    var formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)}-${date.getDate()}`;
    // console.log(formattedDate);


    this.api.getAllAttendanceEmpDaily(formattedDate).subscribe({
      next: (res) => {
        if (res.success) {
          let arr: any = [];
          let empId: any = [];
          //get all emp id
          res.data.forEach((e: any, i: any) => {
            empId[i] = e.employeeId;
          })
          // remove duplicate id;
          empId = empId.filter(function (value: any, index: any, array: any) {
            return array.indexOf(value) === index;
          });
          console.log(res.data);
          let newArr = [];
          for (let i = 0; i < empId.length; i++) {
            for (let j = 0; j < res.data.length; j++) {
              if (empId[i] == res.data[j].employeeId) {
                newArr[j] = res.data[j];
              }
            }
            arr[i] = newArr; //append to arr
            newArr = []; //reset
          }
          // remove empty aray from arr;
          arr.forEach((e: any, i: any) => {
            arr[i] = e.filter(Boolean);

          })

          // get all username
          let saveId: any = [];
          let getDate: any;
          this.api.getUserName().subscribe({
            next: (res) => {
              console.log(res);
              if (res.success) {
                res.data.forEach((e: any, index: any) => {
                  for (let i = 0; i < arr.length; i++) {
                    console.log(e.id, arr[i].employeeId);
                    if (e.id == arr[i][0].employeeId) {
                      saveId[i] = e.id;
                      getDate = arr[i][0].created.date //copy date
                    }
                  };

                })
              }
              let obj: any = [];
              let newArr: any = res.data;
              console.log(newArr);
              for (let i = 0; i < saveId.length; i++) {
                for (let j = 0; j < newArr.length; j++) {
                  if (newArr[j].id == saveId[i]) {
                    newArr.splice(j, 1, { id: 0 })
                  }
                }

              }
              //add the rest of employee to arr
              for (let j = 0; j < newArr.length; j++) {
                if (newArr[j].id != 0) {
                  obj[0] = {
                    attendance_type: 0,
                    firstName: newArr[j].firstName,
                    lastName: newArr[j].lastName,
                    employeeId: newArr[j].id,
                    email: newArr[j].email,
                    created: {
                      date: getDate
                    }
                  };
                  console.log(obj);
                  arr.push(obj);
                  obj = [];
                }
              }

              console.log(arr);
              //render
              this.length = arr.length;
              this.dataSource = new MatTableDataSource<Employee>(arr);
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
              //loading
              this.isLoading = false;
            }
          })

        }

      }
    })
  }

  convertStringtoDate(getDate: any) {
    return getDate.slice(0, 19), 'yyyy-M-d HH:mm:ss', new Date()
  }
  getOneEmployee() {
    if (this.value) {
      this.id = this.value.split(' ')[0]; //get the id
      console.log("id", this.id);
      //check it the number
      if (Number(this.id)) {
        this.isLoading = true;
        this.api.getLeaveByUser(this.id).subscribe({
          next: (res) => {
            if (res.success) {
              this.length = res.data.length;
              res.data.forEach((e: any) => {
                if (e.status === 'Approved') {
                  this.dataSource = new MatTableDataSource<Employee>([e]);
                  this.dataSource.paginator = this.paginator;
                  this.dataSource.sort = this.sort;
                  //loading
                  this.isLoading = false;
                  this.snackBar.openSnackBarSuccess('Search successfully')
                }
              })
            }
          },
          error: (error) => {
            this.isLoading = false;
            this.snackBar.openSnackBarFail("Invalid input");
          }
        })
      } else {
        this.snackBar.openSnackBarFail('Employee not exist')
      }
    } else {
      this.getAttendanceDaily(); //get all data back if no input is got
      this.snackBar.openSnackBarWarn('Input to search')
    }
  }
  getNumOfDay(start: any, end: any) {
    let numofDay = (end.getTime() - start.getTime()) / (1000 * 3600 * 24);;

    return numofDay;
  }
  reset() {
    this.value = "";
    this.getAttendanceDaily();
  }

  download() {
    this.snackBar.openSnackBarSuccess('Data is being downloaded');
  }
  getAllDepartment() {
    this.api.getDepartment().subscribe({
      next: (res) => {
        if (res.success) {
          console.log(res);

        }
      }
    })
  }

  //search filter
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log("Here", this.dataSource);
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  //search autocomplete
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
  ngOnInit(): void {
    // this.getAttendanceDaily();
    //
    this.api.getUserName().subscribe({
      next: (res) => {
        if (res.success) {
          this.getUser = res.data;
          console.log(res);
        }
      },
      error: (err) => {
        console.log(err);
      }
    })

    this.getAttendanceMonthly();
    //auto complete
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );

    //date format for exporter
    this.formatted = formatDate(this.datenow, 'dd-MM-yyyy', 'en-US');

    //security not allow admin route to this URL
    if (!this.authGard.isAdmin()) {
      this.router.navigateByUrl("/account/dashboard");
    }
  }

}

