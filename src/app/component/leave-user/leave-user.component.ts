
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { MatSort } from '@angular/material/sort';

export interface leave {
  description: any,
  start: any,
  end: any,
  employee: any,
  leave_reason: any,
}

@Component({
  selector: 'app-leave-user',
  templateUrl: './leave-user.component.html',
  styleUrls: ['./leave-user.component.css']
})
export class LeaveUserComponent implements AfterViewInit {
  date = new FormControl(new Date());
  serializedDate = new FormControl(new Date().toISOString());
  dataSource!: MatTableDataSource<leave>;

  constructor(
    public dialog: MatDialog,
    private authService: AuthService,
    private router: Router,
    private api: ApiService,
  ) { }
  @ViewChild(MatTable) table!: MatTable<leave>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  //open Dialog
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogElementsExampleDialog, {
    });

    //after close
    dialogRef.afterClosed().subscribe(result => {
      //call again when create
      this.getAllLeave();
    });
  }

  displayedColumns: string[] = ['id', 'leave_reason', 'from', 'to', 'description', 'status', 'actions'];


  //get all leave user
  getAllLeave() {
    this.api.getAllLeave().subscribe({
      next: (res) => {
        if(res.success) {
          this.dataSource = new MatTableDataSource<leave>(res.data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      },
      error: (error) => {

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

  ngAfterViewInit(): void {
    if (this.authService.isAdmin()) {
      this.router.navigateByUrl("/");
    }
    this.getAllLeave();
  }

}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}



@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: 'dialog-elements-leave.html',
})
export class DialogElementsExampleDialog {
  public constructor(
    private api: ApiService,
    private auth: AuthService,
    public dialogRef: MatDialogRef<LeaveUserComponent>,
  ) {
  }

  public empLeave: any = {
    email: "",
    emp_leave_reason_id: "",
    start: "",
    end: "",
    description: "",
  }

  user_email!: any;

  //format date
  formatDate(date: any) {
    let formatted_date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    return formatted_date;
  }

  //create leave user
  createLeave() {
    this.user_email = this.auth.getEmail();
    this.empLeave.email = this.user_email;
    this.empLeave.start = this.formatDate(this.empLeave.start);
    this.empLeave.end = this.formatDate(this.empLeave.end);

    console.log(this.empLeave);


    this.api.createLeave(this.empLeave).subscribe({
      next: (res) => {
        if(res.success) {
          //close the dialog
          this.dialogRef.close();
        }
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
}
