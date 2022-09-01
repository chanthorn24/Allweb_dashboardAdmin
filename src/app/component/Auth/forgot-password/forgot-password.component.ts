import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  duration = 5;
  constructor(
    private authService: AuthService,
    private router: Router,
    private api: ApiService,
    private _snackBar: MatSnackBar
  ) { }
  public forgotPassword: any = {
    email: ""
  }

  ngOnInit(): void {
    if (this.authService.isUserLoggedIn()) {
      this.router.navigateByUrl('/');
    }
  }
  submit() {
    if (this.forgotPassword.email && !this.email.errors) {
      this.api.forgotPassword(this.forgotPassword).subscribe({
        next: (res) => {
          console.log(res);
          if (res.success) {
            console.log("success");
            this.openSnackBarSuccess()
          }
        },
        error: (err) => {
          console.log(err);
          console.log("failed");
          this.openSnackBarError();
        }
      })
    }
  }
  openSnackBarSuccess() {
    this._snackBar.open('Successfully Sent!', 'Cancel', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.duration * 1000,
      panelClass: ['blue-snackbar']
    });
  }
  openSnackBarError() {
    this._snackBar.open('Incorrect Email!!', 'Cancel', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.duration * 1000,
      panelClass: ['red-snackbar']
    });
  }
  email = new FormControl('', [Validators.required, Validators.email]);
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

}

