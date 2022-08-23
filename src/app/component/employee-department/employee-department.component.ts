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
  dataSource = new MatTableDataSource<Department>(ELEMENT_DATA);

  constructor(private dialog: MatDialog, private api: ApiService) { }
  @ViewChild(MatTable) table!: MatTable<Department>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngOnInit(): void {

  }
  ngAfterViewInit() {
    this.getDepartment();
    // this.dataSource.paginator = this.paginator;
    this.table.renderRows();
  }
  openDialog() {
    this.dialog.open(DialogEmployeeDepartment)
  }
  getDepartment() {
    this.api.getDepartment().subscribe({
      next: (res) => {
        console.log(res);
        res.data.forEach((element: any) => {
          ELEMENT_DATA.push({ id: element.id, name: element.name })
          this.dataSource.paginator = this.paginator;
          this.table.renderRows();
        });

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
          console.log(res);
          //snackbar
          this.openSnackBarSuccess();
          //close
          this.dialogRef.close([]);
          //
          location.reload();
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