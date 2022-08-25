import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
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

  constructor(
    private dialog: MatDialog,
    private authGard: AuthGuard,
    private route: Router,
    private api: ApiService,
    ) { }
    @ViewChild(MatTable) table!: MatTable<leave>;
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

  //getAllLeav
  getAllLeave() {
    this.api.getAllLeave().subscribe({
      next: (res) => {
        if(res.success) {
          this.total_leave = res.data.length;
          this.dataSource = new MatTableDataSource<leave>(res.data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  ngOnInit(): void {
    //call all leave
    this.getAllLeave();
    if(!this.authGard.isAdmin()) {
      this.route.navigate(['/']);
    }
  }

  //open Dialog
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogEmployeeLeave, {
      autoFocus: false,
    });
    //after close
    dialogRef.afterClosed().subscribe(result => {
      this.getAllLeave();
    });
  }

  //open edit Dialog
  openEditDialog(id: any): void {
    const dialogRef = this.dialog.open(DialogEditEmployeeLeave, {
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
    const dialogRef = this.dialog.open(DialogDeleteLeave, {
      autoFocus: false,
    });

    leave_id = id;
    //after close
    dialogRef.afterClosed().subscribe(result => {
      this.getAllLeave();
    });
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

  public constructor(
    private api: ApiService,
    private auth: AuthService,
    private snackBar: SnackbarService,
    public dialogRef: MatDialogRef<EmployeeLeaveComponent>,
  ){}


  //set defualt select admin
  user_email = "allweb.rms.symfony@gmail.com";

  public empLeave: any = {
    email: "",
    emp_leave_reason_id: "",
    start: "",
    end: "",
    description: "",
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
        if(res.success) {
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
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

}


@Component({
  selector: 'dialog-edit-employee-leave',
  templateUrl: './dialog-edit-employee-leave.html',
})

export class DialogEditEmployeeLeave {
  myControl = new FormControl('');
  public constructor(
    private api: ApiService,
    private auth: AuthService,
    private snackBar: SnackbarService,
    public dialogRef: MatDialogRef<EmployeeLeaveComponent>,
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
