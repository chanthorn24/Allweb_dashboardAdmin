import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  hide = true;
  link!: string;
  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private jwtHelper: JwtHelperService,
    private api: ApiService,
  ) {


  }
  token!: any;

  //user change password
  resetCollection: any = {
    password: "",
    email: "",
    repeat_password: ""
  }


  resetNewPassword() {

    if (this.resetCollection.password === this.resetCollection.repeat_password) {
      this.api.resetPassword(this.resetCollection).subscribe({
        next: (res) => {
          if (res.success) {
            this.router.navigateByUrl("/login");
          }
        },
        error: (error) => {
          console.log(error);

        }
      });
    } else {
      alert("error")
    }

  }

  ngOnInit(): void {
    if (this.authService.isUserLoggedIn()) {
      this.router.navigateByUrl('/');
    }
    this.route.queryParams
      .subscribe(params => {
        this.token = params['verify'];

        if (!this.jwtHelper.isTokenExpired(this.token)) {
          let tokenData = this.jwtHelper.decodeToken(this.token);
          this.resetCollection.email = tokenData.email;
        } else {
          alert("Expire")
        }
      }
      );

  }

}
