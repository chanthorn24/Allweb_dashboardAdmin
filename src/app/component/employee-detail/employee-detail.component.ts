import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { parse } from 'date-fns';
import { Observable, Observer } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

export interface ProfileTab {
  label: string;
  content: string;
}

let getUser: any = {
  firstName: "",
  lastName: "",
  department: "",
  position: "",
  joinDate: "",
  email: "",
  address: "",
  gender: "",
  dateOfBirth: ""
};
let departmensts: any = {};
let positions: any = {};

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {
  asyncTabs!: Observable<ProfileTab[]>;

  //employee info
  employee_id!: string;
  employees: any = [];

  constructor(
    private actRoute: ActivatedRoute,
    private api: ApiService,
    private dialog: MatDialog,
  ) {
    this.employee_id = this.actRoute.snapshot.params['id'];

    this.asyncTabs = new Observable((observer: Observer<ProfileTab[]>) => {
      setTimeout(() => {
        observer.next([
          { label: 'Profile', content: '1' },
          { label: 'Project', content: '2' },
        ]);
      }, 500);
    });
  }
  openPersonaInfoDialog() {
    const dialogRef = this.dialog.open(DialogPersonalInfo, {
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      //call to get function
      this.getOneUser();
    });
  }
  getOneUser() {
    this.api.getOneUser(this.employee_id).subscribe({
      next: (res) => {
        this.employees = res.data;
        getUser = res.data[0]
        console.log(getUser);
        console.log(this.employees);

      },
      error: (error) => {
        console.log(error);
      }
    })
  }
  getDepartments() {
    this.api.getDepartment().subscribe({
      next: (res) => {
        if (res.success) {
          departmensts = res.data;
        }
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
  getPositions() {
    this.api.getPosition().subscribe({
      next: (res) => {
        if (res.success) {
          positions = res.data;
        }
      },
      error: (error) => {
        console.log(error);
      }
    });
  }


  ngOnInit(): void {
    this.getOneUser();
    this.getDepartments();
    this.getPositions();
  }
}
@Component({
  selector: 'dialog-personal-info-employee.html',
  templateUrl: 'dialog-personal-info-employee.html',
})
export class DialogPersonalInfo implements OnInit {

  public personal = {
    id: getUser.id,
    firstName: getUser.firstName,
    lastName: getUser.lastName,
    emp_department_id: getUser.department_id,
    emp_position_id: getUser.position_id,
    joinDate: "",
    email: getUser.email,
    address: getUser.address,
    gender: getUser.gender,
    dateOfBirth: "",
  }
  dateOfBirth = parse(getUser.dateOfBirth.date.slice(0, 19), 'yyyy-M-d HH:mm:ss', new Date());
  joinDate = parse(getUser.joinDate.date.slice(0, 19), 'yyyy-M-d HH:mm:ss', new Date());
  public departments = departmensts;
  public positions = positions;
  constructor(
    private api: ApiService,
    private snackBar: SnackbarService,
    private dialogRef: DialogRef<EmployeeDetailComponent>,
  ) { }

  //format date
  formatDate(date: any) {
    let formatted_date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    return formatted_date;
  }

  //update data user
  submit() {
    if (
      this.personal.firstName &&
      this.personal.lastName &&
      this.personal.address &&
      this.personal.email &&
      this.personal.gender &&
      this.personal.emp_position_id &&
      this.personal.emp_department_id
    ) {
      this.personal.joinDate = this.formatDate(this.joinDate);
      this.personal.dateOfBirth = this.formatDate(this.dateOfBirth);
      this.api.updateUser(this.personal).subscribe({
        next: (res) => {
          if (res.success) {
            //open snackbar
            this.snackBar.openSnackBarSuccess(res.message);
            this.dialogRef.close();
          }
        },
        error: (error) => {
          this.snackBar.openSnackBarFail(error.message);
        }
      })
    } else {
      this.snackBar.openSnackBarWarn('No valid Input');
    }
  }

  ngOnInit(): void {
    console.log(getUser);

  }
}