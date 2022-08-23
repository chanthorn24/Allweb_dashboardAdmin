import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/services/api.service';

export interface Position {
  id: number;
  name: string;
}
let id: number;
let data: string;
@Component({
  selector: 'app-employee-department',
  templateUrl: './employee-position.component.html',
  styleUrls: ['./employee-position.component.css']
})
export class EmployeePositionComponent implements OnInit {
  spinner = true;
  displayedColumns: string[] = ['id', 'name', 'actions']
  dataSource!: MatTableDataSource<Position>;
  constructor(private dialog: MatDialog, private api: ApiService) { }
  @ViewChild(MatTable) table!: MatTable<Position>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  ngOnInit(): void {
    this.getPosition();

  }
  openDialog() {
    const dialogRef = this.dialog.open(DialogEmployeePosition, {

    });
    dialogRef.afterClosed().subscribe(result => {
      this.getPosition();
    })
  }
  getPosition() {
    this.api.getPosition().subscribe({
      next: (res) => {
        this.spinner = false;
        this.dataSource = new MatTableDataSource<Position>(res.data);
        this.dataSource.paginator = this.paginator;
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
  getPositionById() {
    this.api.getPositionById(id).subscribe({
      next: (res) => {
        data = res.data;
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
  openUpdateDialog(data: any) {
    const dialogRef = this.dialog.open(DialogUpdatePosition, {
    });
    id = data;
    console.log(id);
    dialogRef.afterClosed().subscribe(result => {
      this.getPosition();
    });
  }
  openDeleteDialog(data: any) {
    const dialogRef = this.dialog.open(DialogDeletePosition, {
    });
    id = data;
    dialogRef.afterClosed().subscribe(result => {
      this.getPosition();
    });
  }

}

@Component({
  selector: 'app-employee-position',
  templateUrl: 'dialog-employee-position.html'
})
export class DialogEmployeePosition {
  email = new FormControl('', [Validators.required, Validators.required]);
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  duration = 5;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private api: ApiService, public dialogRef: MatDialogRef<DialogEmployeePosition>, private _snackBar: MatSnackBar) { }
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return;
  }
  public getDepartment: any = {
    name: "",
  }

  addPosition() {
    console.log("output", this.getDepartment);
    if (this.getDepartment.name && !this.email.errors) {
      this.api.addPosition(this.getDepartment).subscribe({
        next: (res) => {
          console.log(res);
          //close
          this.dialogRef.close([]);
        },
        error: (err) => {
          console.log(err);
        }
      })
    }
  }
  openSnackBarSuccess() {
    this._snackBar.open('Department is created successfully', 'Cancel', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.duration * 1000,
      panelClass: ['blue-snackbar']
    });
  }
}


/**
 * 
 * Update Position 
 */


@Component({
  selector: 'app-employee-position',
  templateUrl: 'dialog-update-employee-position.html'
})

export class DialogUpdatePosition implements OnInit {
  email = new FormControl('', [Validators.required, Validators.required]);
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  duration = 5;
  updatePosName!: string;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private api: ApiService, public dialogRef: MatDialogRef<DialogUpdatePosition>, private _snackBar: MatSnackBar) { }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    return;
  }
  public updatePosition: any = {
    id: "",
    name: ""
  }
  editPosition() {
    this.updatePosition.id = id;
    if (this.updatePosition.name && this.updatePosName != this.updatePosition.name) {
      this.api.updatePosition(this.updatePosition).subscribe({
        next: res => {
          this.dialogRef.close();
          this.openSnackBarSuccess();

        },
        error: err => {
          console.log(err);
        }
      });
    } else if (this.updatePosName == this.updatePosition.name) {
      this.openSnackBarError('Duplicated Previous Position Name');
    }
  }
  openSnackBarSuccess() {
    this._snackBar.open('Department is updated successfully', 'Cancel', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.duration * 1000,
      panelClass: ['blue-snackbar']
    });
  }
  openSnackBarError(data: any) {
    this._snackBar.open(data, 'Cancel', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.duration * 1000,
      panelClass: ['warn-snackbar']
    });
  }

  ngOnInit(): void {
    this.api.getPositionById(id).subscribe({
      next: (res) => {
        this.updatePosName = res.data[0].name;
        this.updatePosition.name = res.data[0].name
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}

/**
 * 
 * Delete  Position 
 */
@Component({
  selector: 'app-employee-position',
  templateUrl: 'dialog-delete-employee-position.html'
})

export class DialogDeletePosition {
  email = new FormControl('', [Validators.required, Validators.required]);
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  duration = 5;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private api: ApiService, public dialogRef: MatDialogRef<DialogDeletePosition>, private _snackBar: MatSnackBar) { }
  deletePosition() {
    this.api.deletePosition(id).subscribe({
      next: (res) => {
        console.log(res);
        this.dialogRef.close();
        this.openSnackBarDelete('Deleted Successfully');
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
  openSnackBarDelete(data: any) {
    this._snackBar.open(data, 'Cancel', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.duration * 1000,
      panelClass: ['red-snackbar']
    });
  }
}