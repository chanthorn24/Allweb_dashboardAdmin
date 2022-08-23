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
  old_password!: string;
  new_password!: string;
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
      this.api.changePassword(this.changePassword).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.log(err);
        }
      })
    }
  }
  openSnackBarWarning(data: any) {
    this._snackBar.open(data, 'Cancel', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.duration * 1000,
      panelClass: ['warning-snackbar']
    });
  }

  ngOnInit(): void {
    this.changePassword.email = this.authApi.getEmail();
  }
}
