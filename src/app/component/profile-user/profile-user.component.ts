import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatRadioChange } from '@angular/material/radio';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

let getUser: any = {};
@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.css']
})
export class ProfileUserComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    private api: ApiService,
  ) { }
  @Input() employees!: any;

  getUserInfo() {
    console.log("update");
    let user_id = this.employees[0].id;
    this.api.getOneUser(user_id).subscribe({
      next: (res) => {
        if (res.success) {
          this.employees = res.data;
          console.log(this.employees);
        }

      }
    })

  }

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
      this.getUserInfo();
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
  constructor(
    private snackBar: SnackbarService,
    private api: ApiService,
    private dialogRef: MatDialogRef<ProfileUserComponent>
  ) { }

  formGroup = new FormGroup({
    phone: new FormControl(''),
    nationality: new FormControl(''),
    religion: new FormControl(''),
    is_married: new FormControl(''),
  })
  is_married = false;
  updatePersonalInfo() {
    console.log(this.is_married);

    console.log(this.personal.is_married);
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
  changeGender(e: any) {
    console.log(e.target.value);
    // this.personal.is_married = e.target.value;
    if (e.target.value === 'true') {
      this.personal.is_married = true;
    } else {
      this.personal.is_married = false;
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
  constructor(private dialog: MatDialog,
    private api: ApiService,) { }

  formGroup = new FormGroup({
    bank_name: new FormControl(''),
    bank_no: new FormControl(''),
    bank: new FormControl(''),
  });
  public updateBank = {
    id: getUser.id,
    bank_name: getUser.bank_name,
    bank_no: getUser.bank_no,
    bank: getUser.bank
  }
  updateBankInfo() {
    if (this.updateBank.bank && this.updateBank.bank_no && this.updateBank.bank_name) {
      this.api.getOneUser(this.updateBank.id).subscribe({
        next: res => {
          console.log(res);
        },
        error: err => {
          console.log(err);
        }
      })

    }
  }


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
