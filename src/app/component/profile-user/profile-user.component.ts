import { Dialog, DialogRef } from '@angular/cdk/dialog';
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
      this.getUserInfo();
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

  dataChecked: boolean = true;

  test!: boolean;
  favoriteSeason!: string;
  seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];


  // is_married = false;
  updatePersonalInfo() {
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
    console.log(this.personal.is_married);

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
export class DialogBankInformation implements OnInit {
  constructor(
    private dialogRef: DialogRef<DialogBankInformation>,
    private api: ApiService,
    private snackBar: SnackbarService,
  ) { }
  selectBank!: string;

  formGroup = new FormGroup({
    bank_name: new FormControl(''),
    bank_no: new FormControl(''),
    bank_id: new FormControl(''),
  });
  public updateBankAccount = {
    id: getUser.account_id,
    name: getUser.bank_name,
    number: getUser.bank_no,
    bank_id: ""
  }
  updateBankInfo() {
    console.log(this.selectBank);
    console.log(this.updateBankAccount.bank_id);
    if (
      this.updateBankAccount.name
      && this.updateBankAccount.number
      && this.updateBankAccount.bank_id
    ) {
      this.api.updateBankAccount(this.updateBankAccount).subscribe({
        next: res => {
          console.log(res);
          this.snackBar.openSnackBarSuccess('Updated Bank Information successfully');
          this.dialogRef.close();
        },
        error: err => {
          console.log(err);
        }
      });
    } else {
      this.snackBar.openSnackBarWarn('No valid input');
    }
  }
  public banks: any = {
    id: "",
    name: ""
  }
  getAllBank() {
    this.api.getAllBank().subscribe({
      next: res => {
        console.log(res);
        this.banks = res.message;
        console.log(this.banks);
      },
      error: err => {
        console.log(err);
      }
    })
  }
  ngOnInit(): void {
    this.getAllBank();
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
