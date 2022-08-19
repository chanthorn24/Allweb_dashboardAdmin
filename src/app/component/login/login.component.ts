import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private api: ApiService, private jwtHelper :JwtHelperService) { }

  email1 = new FormControl('', [Validators.required, Validators.email]);
  ngOnInit(): void {
    if (this.authService.isUserLoggedIn()) {
      this.router.navigate(['/']);
    }
  }

  public user: any = {
    email: "",
    paassword: "",
  }

  public tokenData!: any;

  hide = true;

  getErrorMessage() {
    if (this.email1.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email1.hasError('email') ? 'Not a valid email' : '';
  }

  getApiData() {

  }
  login() {
    if (this.user.email && this.user.password) {
      this.api.login(this.user).subscribe({
      next: (res) => {
          if (res.success) {
              window.sessionStorage.setItem('token', JSON.stringify(res.token));
              this.tokenData = JSON.stringify(this.jwtHelper.decodeToken(res.token));
              window.location.reload();
              setInterval(() => {
                this.router.navigateByUrl('/');
              }, 3000);
          } else {
            alert("Email or Password incorrect!")
          }

      },
      error: (err) => {
        console.log(err);
      }
    })
    }
  }
}
