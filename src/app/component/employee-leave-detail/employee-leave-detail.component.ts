import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

export interface leave {
  description: any,
  start: any,
  end: any,
  employee: any,
  status: any,
  leave_reason: any,
}

@Component({
  selector: 'app-employee-leave-detail',
  templateUrl: './employee-leave-detail.component.html',
  styleUrls: ['./employee-leave-detail.component.css']
})
export class EmployeeLeaveDetailComponent implements OnInit {
  dataSource!: MatTableDataSource<leave>;


  //leave user
  leave_one: any = [];
  total_leave: number = 0;
  constructor(
    public dialog: MatDialog,
    private actRoute: ActivatedRoute,
    private snackBar: SnackbarService,
    private api: ApiService,
    private el: ElementRef,
  ) { }
  @ViewChild(MatTable) table!: MatTable<leave>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['id', 'leave_reason', 'from', 'to', 'description', 'status', 'actions'];
  leave_id = this.actRoute.snapshot.params['id'];


  //change data
  changeId(id: number) {
    this.leave_id = id;

    //scroll to top
    this.el.nativeElement.querySelector('.container').scrollIntoView({ behavior: 'smooth' });
    this.getLeaveById();
  }
  //get leave by id
  getLeaveById() {
    this.api.getOneLeaveUser(this.leave_id).subscribe({
      next: (res) => {
        if (res.success) {
          this.leave_one = res.data[0];
          this.getAllLeave(this.leave_one.employeeID);

          console.log(this.leave_one);

        }
      },
      error: (error) => {
        this.snackBar.openSnackBarFail(error.message);
      }
    })
  }
  //get all leave user
  getAllLeave(id: number) {
    this.api.getLeaveByUser(id).subscribe({
      next: (res) => {
        if (res.success) {
          this.total_leave = res.data.length;
          this.dataSource = new MatTableDataSource<leave>(res.data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      },
      error: (error) => {
        //set default if no data
        let data: any = [{
          id: 0,
          description: "N/A",
          start: {
            date: "1000-01-01 00:00:00.000000",
          },
          end: {
            date: "1000-01-01 00:00:00.000000",
          },
          employee: "N/A",
          leave_reason: "N/A",
          status: "Pending"
        }]
        console.log(data);

        this.dataSource = new MatTableDataSource<leave>(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit(): void {
    // if (!this.authService.isAdmin()) {
    //   this.router.navigateByUrl("/");
    // }
    this.getLeaveById();

  }
}
