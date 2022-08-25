import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/services/api.service';

export interface Department {
  id: number;
  name: string;
}
let id: number;

@Component({
  selector: 'app-employee-department',
  templateUrl: './employee-department.component.html',
  styleUrls: ['./employee-department.component.css']
})
export class EmployeeDepartmentComponent implements AfterViewInit {

  displayedColumns: string[] = ['id', 'name', 'actions'];

  dataSource!: MatTableDataSource<Department>;
  spinner = true;
  constructor(private dialog: MatDialog, private api: ApiService) { }
  @ViewChild(MatTable) table!: MatTable<Department>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngOnInit(): void {

  }
  ngAfterViewInit() {
    this.getDepartment();
  }


  ///create dialog
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogEmployeeDepartment, {
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getDepartment();
    });
  }
  //update dialog
  openUpdateDialog(data: any): void {
    const dialogRef = this.dialog.open(DialogUpdateDepartment, {
    });
    console.log(data);
    id = data;
    console.log(id);

    dialogRef.afterClosed().subscribe(result => {
      this.getDepartment();
    });
  }
  //delete diaglog
  openDeleteDialog(data: any): void {
    const dialogRef = this.dialog.open(DialogDeleteDepartment, {
    });
    id = data;
    dialogRef.afterClosed().subscribe(result => {
      this.getDepartment();
    });
  }

  //get all department
  getDepartment() {

    this.api.getDepartment().subscribe({
      next: (res) => {
        this.spinner = false;
        this.dataSource = new MatTableDataSource<Department>(res.data);
        this.dataSource.paginator = this.paginator;
        // console.log(this.paginator);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }


}

@Component({
  selector: 'app-employee-department',
  templateUrl: 'dialog-employee-department.html'
})
export class DialogEmployeeDepartment {
  email = new FormControl('', [Validators.required, Validators.required]);
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  duration = 5;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private api: ApiService, public dialogRef: MatDialogRef<DialogEmployeeDepartment>, private _snackBar: MatSnackBar) { }
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return;
  }
  public getDepartment: any = {
    name: "",
  }


  addDepartment() {
    console.log("output", this.getDepartment);
    if (this.getDepartment.name && !this.email.errors) {
      this.api.addDepartment(this.getDepartment).subscribe({
        next: (res) => {
          //snackbar
          this.openSnackBarSuccess();
          //close the dialog
          this.dialogRef.close();
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
 * Update Dialog
 */

@Component({
  selector: 'app-employee-department',
  templateUrl: 'dialog-update-employee-department.html'
})
export class DialogUpdateDepartment implements OnInit {
  email = new FormControl('', [Validators.required, Validators.required]);
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  duration = 5;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private api: ApiService, public dialogRef: MatDialogRef<DialogEmployeeDepartment>, private _snackBar: MatSnackBar) { }
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    return;
  }
  public updateDepartment: any = {
    id: "",
    name: "",
  }
  updateValue!: string;
  editDepartment() {
    this.updateDepartment.id = id;
    console.log(this.updateDepartment);
    if (this.updateDepartment.name && this.updateValue != this.updateDepartment.name) {
      this.api.editDepartment(this.updateDepartment).subscribe({
        next: (res) => {
          this.dialogRef.close();
          this.openSnackBarSuccess();
        },
        error: (err) => {
          console.log(err);
        }
      })
    } else if (this.updateValue == this.updateDepartment.name) {
      this.openSnackBarError("😜Duplicated previous name");
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
    this.api.getOneDepartment(id).subscribe({
      next: (res) => {
        if (res.success) {
          console.log(res);
          this.updateValue = res.data[0].name;
          this.updateDepartment.name = res.data[0].name
        }
      }
    })
  }


}
//**Delete Dialog */
@Component({
  selector: 'app-employee-department',
  templateUrl: 'dialog-delete-employee-department.html'
})
export class DialogDeleteDepartment {
  email = new FormControl('', [Validators.required, Validators.required]);
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  duration = 5;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private api: ApiService, public dialogRef: MatDialogRef<DialogEmployeeDepartment>, private _snackBar: MatSnackBar) { }
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    return;
  }


  deleteDepartment() {
    this.api.deleteDepartment(id).subscribe({
      next: (res) => {
        console.log(res);
        this.openSnackBarDelete('Deleted Successfully')
        this.dialogRef.close();
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
