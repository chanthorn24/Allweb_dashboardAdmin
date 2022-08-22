import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-employee-department',
  templateUrl: './employee-position.component.html',
  styleUrls: ['./employee-position.component.css']
})
export class EmployeePositionComponent implements OnInit {
  // dialog: any;

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }
  openDialog() {
    this.dialog.open(DialogEmployeePosition)
  }

}

@Component({
  selector: 'app-employee-position',
  templateUrl: 'dialog-employee-position.html'
})
export class DialogEmployeePosition {
  email = new FormControl('', [Validators.required, Validators.required]);

  constructor(private api: ApiService, public dialogRef: MatDialogRef<DialogEmployeePosition>) { }
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
          //close
          this.dialogRef.close([]);
        },
        error: (err) => {
          console.log(err);
        }
      })
    }

  }
}