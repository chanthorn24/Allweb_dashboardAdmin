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
  user_id: any,
  firstName: any,
  lastName: any,
  email: any,
  start: any,
  end: any,
  // totalLeave: any,
  status: any,
  leave_reason: any,

}

@Component({
  selector: 'app-employee-report-attendance',
  templateUrl: './employee-report-attendance.component.html',
  styleUrls: ['./employee-report-attendance.component.css']
})
export class EmployeeReportAttendanceComponent implements OnInit {
  displayedColumns: string[] = ['user_id', 'name', 'email', 'leaveType', 'start.date', 'end.date', 'totalLeave', 'status'];
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

  //get the employees
  getAllLeave() {
    this.api.getLeaveApproved().subscribe({
      next: (res) => {
        if (res.success) {
          this.length = res.data.length;

          // get the name
          res.data.forEach((e: any, i: any) => {
            this.totalLeave[res.data[i].user_id] = this.getNumOfDay(parse(res.data[i].start.date.slice(0, 19), 'yyyy-M-d HH:mm:ss', new Date()), parse(res.data[i].end.date.slice(0, 19), 'yyyy-M-d HH:mm:ss', new Date())) + 1;
            this.options.push(`${e.user_id} ${e.firstName} ${e.lastName}`)
          });
          this.dataSource = new MatTableDataSource<Employee>(res.data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;

        }
        //loading
        this.isLoading = false;
      }
    })
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
      this.getAllLeave(); //get all data back if no input is got
      this.snackBar.openSnackBarWarn('Input to search')
    }
  }
  getNumOfDay(start: any, end: any) {
    let numofDay = (end.getTime() - start.getTime()) / (1000 * 3600 * 24);;

    return numofDay;
  }
  reset() {
    this.value = "";
    this.getAllLeave();
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
    this.getAllLeave();
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

