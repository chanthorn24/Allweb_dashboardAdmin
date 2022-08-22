import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ApiService } from 'src/app/services/api.service';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];
@Component({
  selector: 'app-employee-department',
  templateUrl: './employee-department.component.html',
  styleUrls: ['./employee-department.component.css']
})
export class EmployeeDepartmentComponent implements OnInit {
  // dialog: any;
  displayedColumns: string[] = ['position', 'department', 'weight', 'duration', 'symbol', 'status', 'actions'];
  dataSource = ELEMENT_DATA;
  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }
  openDialog() {
    this.dialog.open(DialogEmployeeDepartment)
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