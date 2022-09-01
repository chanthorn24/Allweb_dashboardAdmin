import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  hide: boolean = true;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  duration = 5;
  constructor(
    private _snackBar: MatSnackBar,
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
            this.openSnackBarWarning('Password Changed Successfully', 'blue-snackbar');
          },
          error: (err) => {
            console.log(err);
            this.openSnackBarWarning('Old password is incorrect', 'red-snackbar');
          }
        })
      } else {
        this.openSnackBarWarning('Old and New Password has to be different', 'warn-snackbar');
      }
    }

  }

  openSnackBarWarning(data: any, className: any) {
    this._snackBar.open(data, 'Cancel', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.duration * 1000,
      panelClass: [className]
    });
  }

  ngOnInit(): void {
    this.changePassword.email = this.authApi.getEmail();
  }
}
