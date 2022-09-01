import { DialogRef } from '@angular/cdk/dialog';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/services/api.service';


export interface LeaveType {
  id: number;
  name: string;
}
let getId: any;
@Component({
  selector: 'app-leave-type',
  templateUrl: './leave-type.component.html',
  styleUrls: ['./leave-type.component.css']
})

export class LeaveTypeComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'actions'];

  dataSource!: MatTableDataSource<LeaveType>;
  spinner = true;

  constructor(private dialog: MatDialog, private api: ApiService,) { }
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddLeaveType, {
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getLeaveType();
    });
  }
  getLeaveType() {
    this.api.getLeaveReason().subscribe({
      next: res => {
        this.dataSource = new MatTableDataSource<LeaveType>(res.data);
        this.dataSource.paginator = this.paginator;
        this.spinner = false;
        console.log(res);
      },
      error: err => {
        console.log(err);
      }
    })
  }

  ngOnInit() {
    this.getLeaveType();
  }
  openUpdateLeaveType(data: any) {
    getId = data;
    const dialogRef = this.dialog.open(DialogUpdateLeaveType, {});
    dialogRef.afterClosed().subscribe(result => {
      this.getLeaveType();
    });
  }
  openDeleteLeaveType(data: any) {
    getId = data;
    const dialogRef = this.dialog.open(DialogDeleteLeaveType, {});
    dialogRef.afterClosed().subscribe(result => {
      this.getLeaveType();
    });
  }


}

/*
add new type
*/

@Component({
  selector: 'app-leave-type',
  templateUrl: 'dialog-add-leave-type.html'
})
export class DialogAddLeaveType implements OnInit {
  email = new FormControl('', [Validators.required, Validators.required]);
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  duration = 5;
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return;
  }
  constructor(private _snackBar: MatSnackBar, private dialogRef: MatDialogRef<DialogAddLeaveType>, private api: ApiService) { }
  public getLeaveType = {
    name: ""
  }
  addLeaveType() {
    if (this.getLeaveType.name) {
      this.api.addLeaveReason(this.getLeaveType).subscribe({
        next: res => {
          this.openSnackBarSuccess('Created Successfully');
          this.dialogRef.close();
        },
        error: err => {
          console.log(err);
        }
      })
    }

  }
  openSnackBarSuccess(data: any) {
    this._snackBar.open(data, 'Cancel', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.duration * 1000,
      panelClass: ['blue-snackbar']
    });
  }
  ngOnInit() {

  }

}



/*
update new type
*/

@Component({
  selector: 'app-leave-type',
  templateUrl: 'dialog-update-leave-type.html'
})
export class DialogUpdateLeaveType implements OnInit {
  email = new FormControl('', [Validators.required, Validators.required]);
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  duration = 5;
  getName!: string;
  constructor(private _snackBar: MatSnackBar, private dialogRef: MatDialogRef<DialogUpdateLeaveType>, private api: ApiService) { }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return
  }
  public updateLeaveType = {
    id: "",
    name: ""
  }
  editLeaveType() {

    if (this.updateLeaveType.name && this.updateLeaveType.name != this.getName) {
      this.updateLeaveType.id = getId;
      this.api.updateLeaveReason(this.updateLeaveType).subscribe({
        next: res => {
          this.openSnackBarSuccess('Updated Successfully', 'warn-snackbar');
          this.dialogRef.close();
        },
        error: err => {
          console.log(err);
        }
      })
    } else if (this.updateLeaveType.name == this.getName) {
      this.openSnackBarSuccess('Duplicated Previus Leave Type ', 'warn-snackbar');
    }
  }
  openSnackBarSuccess(data: any, className: string) {
    this._snackBar.open(data, 'Cancel', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.duration * 1000,
      panelClass: [className]
    });
  }

  ngOnInit() {
    console.log("here we go");
    this.api.getOneLeaveReason(getId).subscribe({
      next: res => {
        this.updateLeaveType.name = res.data[0].name;
        this.getName = res.data[0].name;
      },
      error: err => {
        console.log(err);
      }
    })
  }

}

/*
delete new type
*/

@Component({
  selector: 'app-leave-type',
  templateUrl: 'dialog-delete-leave-type.html'
})
export class DialogDeleteLeaveType implements OnInit {
  email = new FormControl('', [Validators.required, Validators.required]);
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  duration = 5;
  constructor(
    private api: ApiService,
    private _snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<DialogDeleteLeaveType>,
  ) { }

  deleteLeaveType() {
    this.api.deleteLeaveReason(getId).subscribe({
      next: res => {
        this.openSnackBarSuccess('Deleted Successfully');
        this.dialogRef.close();
      },
      error: err => {

      }
    })
  }
  openSnackBarSuccess(data: any) {
    this._snackBar.open(data, 'Cancel', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.duration * 1000,
      panelClass: ['red-snackbar']
    });
  }
  ngOnInit() {

  }

}


