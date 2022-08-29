import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogRef } from '@angular/cdk/dialog';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { FormControl, Validators } from '@angular/forms';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

export interface AttendanceType {
  id: number;
  name: string;
}

let id: any;

@Component({
  selector: 'app-employee-attendance-type',
  templateUrl: './employee-attendance-type.component.html',
  styleUrls: ['./employee-attendance-type.component.css']
})
export class EmployeeAttendanceTypeComponent implements OnInit {

  //table column
  displayedColumns: string[] = ['id', 'name', 'actions'];

  dataSource!: MatTableDataSource<AttendanceType>;
  constructor(
    private api: ApiService,
    private dialog: MatDialog,
  ) { }

  @ViewChild(MatTable) table!: MatTable<AttendanceType>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  //get attendance type
  getAttendanceTypes() {
    this.api.getAllAttendanceTypes().subscribe({
      next: (res) => {
        if (res.success) {
          this.dataSource = new MatTableDataSource<AttendanceType>(res.data);
        this.dataSource.paginator = this.paginator;
        }
      }
    })
  }

  ///create dialog
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogEmployeeAttendanceType, {
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAttendanceTypes();
    });
  }

  ///create dialog
  openUpdateDialog(data: any): void {
    const dialogRef = this.dialog.open(DialogUpdateAttendanceType, {
    });
    id = data;
    dialogRef.afterClosed().subscribe(result => {
      this.getAttendanceTypes();
    });
  }

  //delete dialog
  openDeleteDialog(data: any): void {
    const dialogRef = this.dialog.open(DialogDeleteAttendanceType, {
    });
    id = data;
    dialogRef.afterClosed().subscribe(result => {
      this.getAttendanceTypes();
    });
  }

  ngOnInit(): void {
    this.getAttendanceTypes();
  }

}

//create diaglog
@Component({
  selector: 'dialog-employee-attendance-type',
  templateUrl: 'dialog-employee-attendance-type.html'
})
export class DialogEmployeeAttendanceType {

  //attendance type info
  public attendanceType: any = {
    name: "",
  }

  name = new FormControl('', [Validators.required]);

  constructor(
    private api: ApiService,
    private snackBar: SnackbarService,
    private dialogRef: DialogRef
  ) { }


getErrorMessage() {
    if (this.name.hasError('required')) {
      return 'You must enter a value';
    }
    return '';
  }

  //create attendance
  createAttendanceType() {
    if (this.attendanceType.name) {
      this.api.addAttendanceType(this.attendanceType).subscribe({
        next: (res) => {
          if (res.success) {
            //snackbar
          this.snackBar.openSnackBarSuccess("Create successfully!");
          //close the dialog
          this.dialogRef.close();
          }
        },
        error: (err) => {
          this.snackBar.openSnackBarFail(err.message);
        }
      })
    }
  }
}

//update diaglog
@Component({
  selector: 'dialog-edit-employee-attendance-type',
  templateUrl: 'dialog-edit-employee-attendance-type.html'
})
export class DialogUpdateAttendanceType implements OnInit {

  //attendance type info
  public attendanceType: any = {
    name: "",
    id: ""
  }

  name = new FormControl('', [Validators.required]);

  constructor(
    private api: ApiService,
    private snackBar: SnackbarService,
    private dialogRef: DialogRef
  ) { }


getErrorMessage() {
    if (this.name.hasError('required')) {
      return 'You must enter a value';
    }
    return '';
  }

  //create attendance
  updateAttendanceType() {
    if (this.attendanceType.name) {
      this.attendanceType.id = id;
      console.log(id);
      this.api.updateAttendanceType(this.attendanceType).subscribe({
        next: (res) => {
          if (res.success) {
            //snackbar
            this.snackBar.openSnackBarSuccess("Update successfully!");
            //close the dialog
            this.dialogRef.close();
          }
        },
        error: (err) => {
          this.snackBar.openSnackBarFail(err.message);
        }
      })
    }
  }

  ngOnInit(): void {
    this.api.getAttendanceTypeById(id).subscribe({
      next: (res) => {
        if (res.success) {
          this.attendanceType = res.data[0];
        }
      }
    })
  }
}


//**Delete Dialog */
@Component({
  selector: 'dialog-delete-employee-attendance-type',
  templateUrl: 'dialog-delete-employee-attendance-type.html'
})
export class DialogDeleteAttendanceType {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private api: ApiService,
    public dialogRef: MatDialogRef<EmployeeAttendanceTypeComponent>,
    private snackBar: SnackbarService,
  ) { }

  //delete attendance type
  deleteAttendanceType() {
    this.api.deleteAttendanceType(id).subscribe({
      next: (res) => {
        if (res.success) {
          //open snackbar
          this.snackBar.openSnackBarSuccess('Deleted Successfully');
          this.dialogRef.close();
        }
      },
      error: (err) => {
        this.snackBar.openSnackBarFail(err.message);
      }
    })
  }
}
