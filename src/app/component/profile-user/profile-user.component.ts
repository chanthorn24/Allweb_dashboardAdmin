import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

let getUser: any = {};
@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.css']
})
export class ProfileUserComponent implements OnInit {

  constructor(private dialog: MatDialog) { }
  @Input() employees!: any;


  ngOnInit(): void {
    getUser = this.employees[0];

    console.log(this.employees);
    console.log(getUser);
  }
  editPersonalDialog() {
    const dialogRef = this.dialog.open(DialogPersonalInformation, {
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(result => {
      // this.getLeaveType();
    });
  }
  editBankDialog() {
    const dialogRef = this.dialog.open(DialogBankInformation, {
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(result => {
      // this.getLeaveType();
    });
  }
  editFamilyDialog() {
    const dialogRef = this.dialog.open(DialogPersonalInformation, {
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(result => {
      // this.getLeaveType();
    });
  }
  addFamilyDialog() {
    const dialogRef = this.dialog.open(DialogFamiliyInformation, {
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(result => {
      // this.getLeaveType();
    });
  }

  editEducationDialog() {
    const dialogRef = this.dialog.open(DialogEducationInformation, {
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(result => {
      // this.getLeaveType();
    });
  }
  addEducationDialog() {
    const dialogRef = this.dialog.open(DialogEducationInformation, {
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(result => {
      // this.getLeaveType();
    });
  }


}
/**
 * Personal Information
 */
@Component({
  selector: 'personal-information-dialog',
  templateUrl: 'personal-information-dialog.html'
})
export class DialogPersonalInformation implements OnInit {
  constructor(private snackBar: SnackbarService, private api: ApiService, private dialogRef: MatDialogRef<DialogPersonalInformation>) { }

  formGroup = new FormGroup({
    phone: new FormControl(''),
    nationality: new FormControl(''),
    religion: new FormControl(''),
    is_married: new FormControl(''),
  })
  updatePersonalInfo() {
    if (this.personal.phone && this.personal.nationality) {
      this.api.updateUser(this.personal).subscribe({
        next: res => {
          console.log(res);
          this.dialogRef.close();
          this.snackBar.openSnackBarSuccess("Profile updated successfully");

        },
        error: err => {
          console.log(err);
        }
      })
    }



  }
  public personal: any = {
    id: getUser.id,
    phone: getUser.phone,
    nationality: getUser.nationality,
    religion: getUser.religion,
    is_married: getUser.is_married,
  }

  ngOnInit(): void {

  }
}
/**
 * family Information
 */
@Component({
  selector: 'family-information-dialog',
  templateUrl: 'family-information-dialog.html'
})
export class DialogFamiliyInformation {

}
/**
 * Bank Information
 */
@Component({
  selector: 'Bank-information-dialog',
  templateUrl: 'Bank-information-dialog.html'
})
export class DialogBankInformation {

}
/**
 * Education Information
 */
@Component({
  selector: 'Bank-information-dialog',
  templateUrl: 'education-information-dialog.html'
})
export class DialogEducationInformation {

}
