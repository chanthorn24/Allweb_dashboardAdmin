import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatRadioChange } from '@angular/material/radio';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

let getUser: any = {};
let degrees: any;
let famRowId: any;
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
  getAllDegree() {
    this.api.getSchoolDegree().subscribe({
      next: (res) => {
        if (res.success) {
          degrees = res.data;
          console.log(res);
        }
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  ngOnInit(): void {
    this.getAllDegree();
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

  FamilyDialog(id: any) {
    famRowId = id;
    console.log(famRowId);
    const dialogRef = this.dialog.open(DialogFamiliyInformation, {
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getUserInfo();
    });

  }
  addFamilyDialog() {
    const dialogRef = this.dialog.open(DialogFamiliyInformation, {
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getUserInfo();
    });

  }

  addEducationDialog() {
    const dialogRef = this.dialog.open(DialogEducationInformation, {
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getUserInfo();
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
export class DialogFamiliyInformation implements OnInit {
  constructor(
    private dialogRef: DialogRef<DialogBankInformation>,
    private api: ApiService,
    private snackBar: SnackbarService,
  ) { }
  index = famRowId - 1;
  public families = {
    id: getUser.family[this.index].id,
    family: getUser.family,
    name: getUser.family[this.index].name,
    phone: getUser.family[this.index].phone,
    family_relationship_id: getUser.family[this.index].relationship_id,
  }
  ngOnInit(): void {
    console.log(this.families);

  }
  updateFamilyInfo() {
    if (this.families.name && this.families.phone && this.families.family_relationship_id) {
      this.api.updateFamily(this.families).subscribe({
        next: (res) => {
          if (res.success) {

            this.snackBar.openSnackBarSuccess(res.message);
            this.dialogRef.close();

          }
        },
        error: (error) => {
          this.snackBar.openSnackBarFail(error.message);
        }
      });
    } else {
      this.snackBar.openSnackBarWarn('No valid input');
    }
  }


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
  public updateBankAccount = {
    id: getUser.account_id,
    name: getUser.bank_name,
    number: getUser.bank_no,
    bank_id: "",
    user_id: "",
  }

  submit() {
    //if user already has a  bank info
    if (getUser.bank) {
      this.updateBankInfo();
    }
    else {
      this.createBankInfo();
    }
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
  createBankInfo() {
    this.updateBankAccount.user_id = getUser.id;
    console.log(this.updateBankAccount);

    if (this.updateBankAccount.name && this.updateBankAccount.number && this.updateBankAccount.bank_id) {
      console.log("ere", this.updateBankAccount);
      this.api.createBankAccount(this.updateBankAccount).subscribe({
        next: (res) => {
          if (res.success) {
            this.snackBar.openSnackBarSuccess('Created Successfully');
            this.dialogRef.close();
          }
        },
        error: (err) => {
          this.snackBar.openSnackBarFail(err.message);
        }
      })
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
        this.banks = res.data;
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
export class DialogEducationInformation implements OnInit {
  constructor(
    private dialogRef: DialogRef<DialogBankInformation>,
    private api: ApiService,
    private snackBar: SnackbarService,
  ) { }

  public education = {
    id: getUser.id,
    school_degree_id: "",
    school: getUser.school,
    schooDegrees: degrees
  }
  submit() {
    if (this.education.school && this.education.school_degree_id) {
      this.api.createSchool(this.education).subscribe({
        next: (res) => {
          console.log(res);
          if (res.success) {
            this.snackBar.openSnackBarSuccess('Created family information successfully');
            this.dialogRef.close();
          }
        },
        error: (err) => {
          this.snackBar.openSnackBarFail("Something went wrong")
        }
      })
    } else {
      this.snackBar.openSnackBarWarn('No valid input ');
    }
  }
  ngOnInit(): void {

  }
}
