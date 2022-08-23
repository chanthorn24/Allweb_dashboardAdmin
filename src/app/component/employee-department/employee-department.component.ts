import { Dialog } from '@angular/cdk/dialog';
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

let ELEMENT_DATA: Department[] = [

];
@Component({
  selector: 'app-employee-department',
  templateUrl: './employee-department.component.html',
  styleUrls: ['./employee-department.component.css']
})
export class EmployeeDepartmentComponent implements AfterViewInit {
  // dialog: any;
  displayedColumns: string[] = ['id', 'name', 'actions'];
  // dataSource = ELEMENT_DATA;
  dataSource!: MatTableDataSource<Department>;

  constructor(private dialog: MatDialog, private api: ApiService) { }
  @ViewChild(MatTable) table!: MatTable<Department>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngOnInit(): void {

  }
  ngAfterViewInit() {
    this.getDepartment();
  }
  // openDialog() {
  //   this.dialog.open(DialogEmployeeDepartment)
  // }
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogEmployeeDepartment, {
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getDepartment();
    });
  }
  getDepartment() {
    this.api.getDepartment().subscribe({
      next: (res) => {
        console.log(res);
        this.dataSource = new MatTableDataSource<Department>(res.data);
        this.dataSource.paginator = this.paginator;
        console.log(this.paginator);
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