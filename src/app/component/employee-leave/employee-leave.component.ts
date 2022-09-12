import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { parse } from 'date-fns';
import { map, Observable, startWith } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { AuthGuard } from 'src/app/services/auth.guard';
import { AuthService } from './../../services/auth.service';
import { SnackbarService } from './../../services/snackbar.service';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

export interface leave {
  description: any,
  start: any,
  end: any,
  user_id: any,
  employee: any,
  status: any,
  email: any,
  leave_reason: any,
}
let leave_id: number;

@Component({
  selector: 'app-employee-leave',
  templateUrl: './employee-leave.component.html',
  styleUrls: ['./employee-leave.component.css']
})
export class EmployeeLeaveComponent implements OnInit {
  displayedColumns: string[] = ['id', 'employee', 'email', 'leave_reason', 'start.date', 'end.date', 'description', 'status', 'actions'];
  dataSource!: MatTableDataSource<leave>;

  //dashboard
  total_leave: number = 0;
  total_pendding: number = 0;
  total_type: number = 0;

  //disable button
  disable = false;

  //pending leave
  pending_leaves: any = [];
  total_leave_day: any = [];

  constructor(
    private dialog: MatDialog,
    private authGard: AuthGuard,
    private route: Router,
    private api: ApiService,
    private snackBar: SnackbarService,
  ) { }
  @ViewChild(MatTable) table!: MatTable<leave>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  //calculate day leave
  getNumOfDay(start: any, end: any) {
    let numofDay = (end.getTime() - start.getTime()) / (1000 * 3600 * 24);;

    return numofDay;
  }

  //getAllLeav
  getAllLeave() {
    this.api.getAllLeave().subscribe({
      next: (res) => {
        if (res.success) {
          this.total_leave = res.data.length;
          this.dataSource = new MatTableDataSource<leave>(res.data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      },
      error: (error) => {
        this.snackBar.openSnackBarFail(error.message);
      }
    })
  }

  //get all pending leave
  getPendingLeave() {
    this.api.getLeavePending().subscribe({
      next: (res) => {
        if (res.success) {
          this.pending_leaves = res.data;
          this.total_pendding = res.data.length;
          for (let i = 0; i < res.data.length; i++) {
            this.total_leave_day[i] = this.getNumOfDay(parse(res.data[i].start.date.slice(0, 19), 'yyyy-M-d HH:mm:ss', new Date()), parse(res.data[i].end.date.slice(0, 19), 'yyyy-M-d HH:mm:ss', new Date())) + 1;
          }
        }
      },
      error: (error) => {
        this.snackBar.openSnackBarFail(error.message);
      }
    })
  }

  //open Dialog
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogEmployeeLeave, {
      autoFocus: false,
    });
    //after close
    dialogRef.afterClosed().subscribe(result => {
      this.disable = !this.disable;
      this.getAllLeave();
      this.getPendingLeave();
    });
  }

  //open edit Dialog
  openEditDialog(id: any, $event: MouseEvent): void {
    ($event.target as HTMLButtonElement).style.visibility = "hidden";
    const dialogRef = this.dialog.open(DialogEditEmployeeLeave, {
      autoFocus: false,
    });
    leave_id = id;
    //after close
    dialogRef.afterClosed().subscribe(result => {
      this.getAllLeave();
      this.getPendingLeave();

      ($event.target as HTMLButtonElement).style.visibility = "";
    });
  }

  //open delete Dialog
  openDeleteDialog(id: any, $event: MouseEvent): void {
    ($event.target as HTMLButtonElement).style.visibility = "hidden";
    const dialogRef = this.dialog.open(DialogDeleteLeave, {
      autoFocus: false,
    });

    leave_id = id;
    //after close
    dialogRef.afterClosed().subscribe(result => {
      this.getAllLeave();
      this.getPendingLeave();

      ($event.target as HTMLButtonElement).style.visibility = "";
    });
  }
  // actionMethod($event: MouseEvent) {
  //   ($event.target as HTMLButtonElement).disabled = true;
  //   // Do actions.
  // }
  //open delete Dialog
  openAcceptDialog(id: any, $event: MouseEvent): void {
    ($event.target as HTMLButtonElement).style.visibility = "hidden";
    const dialogRef = this.dialog.open(DialogAcceptLeave, {
      autoFocus: false,
    });

    leave_id = id;
    //after close
    dialogRef.afterClosed().subscribe(result => {
      this.getAllLeave();
      this.getPendingLeave();

      ($event.target as HTMLButtonElement).style.display = "";
    });
  }

  //open delete Dialog
  openDeclineDialog(id: any, $event: MouseEvent): void {
    ($event.target as HTMLButtonElement).style.visibility = "hidden"
    const dialogRef = this.dialog.open(DialogDeclineLeave, {
      autoFocus: false,
    });

    leave_id = id;
    //after close
    dialogRef.afterClosed().subscribe(result => {
      this.getAllLeave();
      this.getPendingLeave();

      ($event.target as HTMLButtonElement).style.display = ""
    });
  }

  ngOnInit(): void {
    //call all leave
    this.getAllLeave();
    //get all pending
    this.getPendingLeave();

    this.api.getLeaveReason().subscribe({
      next: (res) => {
        if (res.success) {
          this.total_type = res.data.length;
        }
      },
      error: (error) => {
        this.snackBar.openSnackBarFail(error.message);
      }
    })

    if (!this.authGard.isAdmin()) {
      this.route.navigate(['/']);
    }
  }
}


@Component({
  selector: 'dialog-employee-leave',
  templateUrl: './dialog-employee-leave.html',
})

export class DialogEmployeeLeave {
  myControl = new FormControl('');
  options: string[] = ['allweb.rms.symfony@gmail.com', 'lychanthorn2002@gmail.com', 'lychanthorn2003@gmail.com'];
  filteredOptions!: Observable<string[]>;

  currentYear = new Date().getFullYear();
  minDate = new Date(this.currentYear - 20, 0, 1);
  maxDate = new Date(this.currentYear + 1, 11, 31);

  public constructor(
    private api: ApiService,
    private snackBar: SnackbarService,
    public dialogRef: MatDialogRef<EmployeeLeaveComponent>,
  ) { }


  //set defualt select admin
  user_email = "allweb.rms.symfony@gmail.com";

  //employee leave
  public empLeave: any = {
    email: "",
    emp_leave_reason_id: "",
    start: "",
    end: "",
    status: "Approved",
    description: "",
  }

  //employee leave type
  public leaveTypes: any = {
    name: "",
  }

  //format date
  formatDate(date: any) {
    let formatted_date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    return formatted_date;
  }

  //create leave user
  createLeave() {
    this.empLeave.email = this.user_email;
    this.empLeave.start = this.formatDate(this.empLeave.start);
    this.empLeave.end = this.formatDate(this.empLeave.end);

    this.api.createLeave(this.empLeave).subscribe({
      next: (res) => {
        if (res.success) {
          //success snackbar
          this.snackBar.openSnackBarSuccess("Create successfully");

          //close the dialog
          this.dialogRef.close();
        } else {
          this.snackBar.openSnackBarFail(res.message);
        }
      },
      error: (error) => {
        this.snackBar.openSnackBarFail("Create failed");
      }
    })
  }

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
    this.api.getLeaveReason().subscribe({
      next: (res) => {
        if (res.success) {
          this.leaveTypes = res.data;
        }
      },
      error: (error) => {
        this.snackBar.openSnackBarFail(error.message);
      }
    })

  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

}

//update leave
@Component({
  selector: 'dialog-edit-employee-leave',
  templateUrl: './dialog-edit-employee-leave.html',
})

export class DialogEditEmployeeLeave {
  myControl = new FormControl('');
  public constructor(
    private api: ApiService,
    private snackBar: SnackbarService,
    public dialogRef: MatDialogRef<EmployeeLeaveComponent>,
  ) { }
  email = new FormControl('', [Validators.required, Validators.required]);

  //employee leave info
  public empLeave: any = {
    email: "",
    emp_leave_reason_id: "",
    start: "",
    end: "",
    description: "",
    status: "",
  }

  //employee leave type
  public leaveTypes: any = {
    name: "",
  }

  //format date
  formatDate(date: any) {
    let formatted_date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    return formatted_date;
  }

  //update leave user
  updateLeave() {
    this.empLeave.start = this.formatDate(this.empLeave.start);
    this.empLeave.end = this.formatDate(this.empLeave.end);

    this.api.updateLeave(this.empLeave, leave_id).subscribe({
      next: (res) => {
        if (res.success) {
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
        this.empLeave.status = res.data[0].status;
        this.empLeave.emp_leave_reason_id = res.data[0].emp_leave_reason_id;
        this.empLeave.description = res.data[0].description;
        this.empLeave.start = parse(res.data[0].start.date.slice(0, 19), 'yyyy-M-d HH:mm:ss', new Date());
        this.empLeave.end = parse(res.data[0].end.date.slice(0, 19), 'yyyy-M-d HH:mm:ss', new Date());
      },
    })

    this.api.getLeaveReason().subscribe({
      next: (res) => {
        if (res.success) {
          this.leaveTypes = res.data;
        }
      },
      error: (error) => {
        this.snackBar.openSnackBarFail(error.message);
      }
    })
  }
}


//**Delete Dialog */
@Component({
  selector: 'app-employee-department',
  templateUrl: 'dialog-delete-employee-leave.html'
})
export class DialogDeleteLeave {


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private api: ApiService,
    public dialogRef: MatDialogRef<EmployeeLeaveComponent>,
    private snackBar: SnackbarService,
  ) { }


  deleteDepartment() {
    this.api.deleteLeave(leave_id).subscribe({
      next: (res) => {
        if (res.success) {
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


//**Accept Dialog */
@Component({
  selector: 'app-accept-employee-department',
  templateUrl: 'dialog-accept-employee-leave.html'
})
export class DialogAcceptLeave {
  //accept or decline
  employee_leave: any = {
    status: ""
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private api: ApiService,
    public dialogRef: MatDialogRef<EmployeeLeaveComponent>,
    private snackBar: SnackbarService,
  ) { }


  //accept leave
  acceptLeave() {
    this.employee_leave.status = "Approved";
    this.api.updateLeave(this.employee_leave, leave_id).subscribe({
      next: (res) => {
        if (res.success) {
          this.dialogRef.close();
          this.snackBar.openSnackBarSuccess("Approved successfully");
        }
      },
      error: (error) => {
        this.snackBar.openSnackBarFail(error.message);
      }
    })
  }


}
//**Decline Dialog */
@Component({
  selector: 'app-decline-employee-department',
  templateUrl: 'dialog-decline-employee-leave.html'
})
export class DialogDeclineLeave {

  //accept or decline
  employee_leave: any = {
    status: ""
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private api: ApiService,
    public dialogRef: MatDialogRef<EmployeeLeaveComponent>,
    private snackBar: SnackbarService,
  ) { }


  //accept leave
  declineLeave() {
    this.employee_leave.status = "Declined";
    this.api.updateLeave(this.employee_leave, leave_id).subscribe({
      next: (res) => {
        if (res.success) {
          this.dialogRef.close();
          this.snackBar.openSnackBarSuccess("Decline successfully");
        }
      },
      error: (error) => {
        this.snackBar.openSnackBarFail(error.message);
      }
    })
  }
}
