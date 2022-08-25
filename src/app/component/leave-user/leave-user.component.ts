
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { MatSort } from '@angular/material/sort';
import { SnackbarService } from 'src/app/services/snackbar.service';

export interface leave {
  description: any,
  start: any,
  end: any,
  employee: any,
  leave_reason: any,
}

let leave_id: number;



@Component({
  selector: 'app-leave-user',
  templateUrl: './leave-user.component.html',
  styleUrls: ['./leave-user.component.css']
})
export class LeaveUserComponent implements AfterViewInit {
  date = new FormControl(new Date());
  serializedDate = new FormControl(new Date().toISOString());
  dataSource!: MatTableDataSource<leave>;

  //dashboard
  total_leave: number = 0;

  constructor(
    public dialog: MatDialog,
    private authService: AuthService,
    private router: Router,
    private api: ApiService,
    private auth: AuthService,
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
  //open edit Dialog
  openEditDialog(id: any): void {
    const dialogRef = this.dialog.open(DialogEditUserLeave, {
      autoFocus: false,
    });
    leave_id = id;
    //after close
    dialogRef.afterClosed().subscribe(result => {
      this.getAllLeave();
    });
  }
  //open delete Dialog
  openDeleteDialog(id: any): void {
    const dialogRef = this.dialog.open(DialogDeleteUserLeave, {
      autoFocus: false,
    });

    leave_id = id;
    //after close
    dialogRef.afterClosed().subscribe(result => {
      this.getAllLeave();
    });
  }

  displayedColumns: string[] = ['id', 'leave_reason', 'from', 'to', 'description', 'status', 'actions'];

  showFail: boolean = true;
  //get all leave user
  getAllLeave() {
    let user_email= this.auth.getEmail();
    this.api.getOneUserByEmail(user_email).subscribe({
      next: (res) => {
        if(res.success) {
          this.api.getLeaveByUser(res.data[0].id).subscribe({
            next: (res) => {
              if(res.success) {
                console.log(res);

                this.showFail = true;
                this.total_leave = res.data.length;
                this.dataSource = new MatTableDataSource<leave>(res.data);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
              }
            },
            error: (error) => {
              //set default if no data
              this.showFail = false;
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
                status: "N/A"
              }]
              console.log(data);

              this.dataSource = new MatTableDataSource<leave>(data);
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
            }
          })
        }
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

//** Update diaglog **//
@Component({
  selector: 'dialog-edit-user-leave',
  templateUrl: './dialog-edit-user-leave.html',
})

export class DialogEditUserLeave {
  myControl = new FormControl('');
  public constructor(
    private api: ApiService,
    private auth: AuthService,
    private snackBar: SnackbarService,
    public dialogRef: MatDialogRef<LeaveUserComponent>,
  ){}
  email = new FormControl('', [Validators.required, Validators.required]);

  public empLeave: any = {
    email: "",
    emp_leave_reason_id: "",
    start: "",
    end: "",
    description: "",
    status: "",
  }

  //format date
  formatDate(date: any) {
    let formatted_date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    return formatted_date;
  }

  //create leave user
  updateLeave() {
    this.empLeave.start = this.formatDate(this.empLeave.start);
    this.empLeave.end = this.formatDate(this.empLeave.end);

    this.api.updateLeave(this.empLeave, leave_id).subscribe({
      next: (res) => {
        if(res.success) {
          //call snackbar
          this.snackBar.openSnackBarSuccess("Update successfully");

          //close the dialog
          this.dialogRef.close();
        }
      },
      error: (error) => {
        this.snackBar.openSnackBarFail("Update failed");
      }
    })
  }

  //get leave

  ngOnInit(): void {
    this.api.getOneLeaveUser(leave_id).subscribe({
      next: (res) => {
        this.empLeave.description = res.data[0].description;
        this.empLeave.start = res.data[0].start.date;
        this.empLeave.end = res.data[0].end.date;
        this.empLeave.emp_leave_reason_id = res.data[0].emp_leave_reason_id;
      },
    })
  }
}

//**Delete Dialog */
@Component({
  selector: 'app-user-department',
  templateUrl: 'dialog-delete-user-leave.html'
})
export class DialogDeleteUserLeave {


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private api: ApiService,
    public dialogRef: MatDialogRef<LeaveUserComponent>,
    private snackBar: SnackbarService,
    ) { }


  deleteDepartment() {
    this.api.deleteLeave(leave_id).subscribe({
      next: (res) => {
        if(res.success) {
          //snack bar service
          this.snackBar.openSnackBarSuccess("Deleted successfully");
          this.dialogRef.close();
        }
      },
      error: (err) => {
        this.snackBar.openSnackBarFail("Deleted fail");
        console.log(err);
      }
    })
  }
}
