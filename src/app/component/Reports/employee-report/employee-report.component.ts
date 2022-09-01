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

  //export file section
  formatted!: string;
  datenow = new Date();
  public employee: any;
  constructor(
    private dialog: MatDialog,
    private authGard: AuthGuard,
    private router: Router,
    private api: ApiService,
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
          this.dataSource = new MatTableDataSource<Employee>(res.data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          console.log("234234");
          //get the name
          res.data.forEach((e: any) => {
            this.options.push(`${e.firstName} ${e.lastName}`)
          });
          console.log(this.options);

        }
      }
    })
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

