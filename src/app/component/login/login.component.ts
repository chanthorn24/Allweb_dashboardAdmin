import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  email1 = new FormControl('', [Validators.required, Validators.email]);
  ngOnInit(): void {
    if (this.authService.isUserLoggedIn()) {
      this.router.navigate(['/']);
    }
  }

  title = 'human-resource-management-system';
  email = "";
  password = "";
  r_email = "";
  r_password = "";
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
    // console.log(this.email, this.password);
    // for (let user of this.users) {
    //   console.log(user.title, user.userId);
    // }
  }
}
