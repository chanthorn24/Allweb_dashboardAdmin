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
import { FormControl, NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { SnackbarService } from 'src/app/services/snackbar.service';

export interface Employee {
  id: any,
  firstName: any,
  lastName: any,
  dateOfBirth: any,
  position: any,
  department: any,
  phone: any,
  email: any,
  address: any,
  joinDate: any,

}


@Component({
  selector: 'app-employee-report',
  templateUrl: './employee-report.component.html',
  styleUrls: ['./employee-report.component.css']
})
export class EmployeeReportComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'dateOfBirth.date', 'position', 'department', 'joinDate.date', 'phone', 'email', 'address'];
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
  constructor(
    private dialog: MatDialog,
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
  getAllEmployee() {
    this.api.getUser().subscribe({
      next: (res) => {
        if (res.success) {
          this.length = res.data.length;
          this.dataSource = new MatTableDataSource<Employee>(res.data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          //get the name
          res.data.forEach((e: any) => {
            this.options.push(`${e.id} ${e.firstName} ${e.lastName}`)
          });
        }
        //loading
        this.isLoading = false;
      }
    })
  }
  getOneEmployee() {
    if (this.value) {
      this.id = this.value.split(' ')[0]; //get the id
      //check it the number
      if (Number(this.id)) {
        this.isLoading = true;
        this.api.getOneUser(this.id).subscribe({
          next: (res) => {
            if (res.success) {
              this.length = res.data.length;
              this.dataSource = new MatTableDataSource<Employee>(res.data);
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
            }
            //loading
            this.isLoading = false;
            this.snackBar.openSnackBarSuccess('Search successfully')
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
      this.getAllEmployee(); //get all data back if no input is got
      this.snackBar.openSnackBarWarn('Input to search')
    }
  }
  reset() {
    // this.form.resetForm();
    // Object.keys(this.form.controls).forEach(key => {
    //   this.form.controls[key].setErrors(null)
    // });
    if (this.value) {
      this.value = "";
      this.getAllEmployee();
    } else {
      console.log("txcv2");

      this.snackBar.openSnackBarWarn('Cannot Reset');
    }
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
    this.getAllEmployee();
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

