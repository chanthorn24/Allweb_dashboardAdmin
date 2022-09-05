import { DialogRef } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  hide: boolean = true;
  constructor(
    private dialog: MatDialog,
    private snackBar: SnackbarService,
    private api: ApiService,
    private authApi: AuthService,
  ) { }


  public changePassword = {
    email: "",
    old_password: "",
    new_password: "",
  }
  apply() {

    if (this.changePassword.old_password && this.changePassword.new_password) {
      if (this.changePassword.old_password != this.changePassword.new_password) {
        this.api.changePassword(this.changePassword).subscribe({
          next: (res) => {
            console.log(res);
            if (res.success) {
              this.openDialog();
            }
          },
          error: (err) => {
            console.log(err);
            this.snackBar.openSnackBarFail('Incorrect password');
          }
        })
      } else {
        this.snackBar.openSnackBarWarn('Old and new password have to be different')
      }
    } else {
      this.snackBar.openSnackBarWarn('No valid input');
    }

  }
  reset() {
    this.changePassword.old_password = '';
    this.changePassword.new_password = '';
  }

  //open edit Dialog
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogChangePassword, {
      autoFocus: false,
    });
    //after close
    dialogRef.afterClosed().subscribe(result => {
      this.reset();
    });
  }

  ngOnInit(): void {
    this.changePassword.email = this.authApi.getEmail();
  }
}

@Component({
  selector: 'dialog-change-password',
  templateUrl: './dialog-change-password.html',
})
export class DialogChangePassword {

  constructor(private authService: AuthService, private dialogRef: DialogRef) { }

  logout() {
    this.authService.logout();
    this.close();
  }
  close() {
    this.dialogRef.close();
  }
}