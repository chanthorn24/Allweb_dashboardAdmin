import { Injectable } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from '../model/interface';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(
    private router: Router,
    private jwtHelper: JwtHelperService
  ) { }

  login(user: User) {
    if (user.userName !== '' && user.password !== '') {
      this.loggedIn.next(true);
      this.router.navigate(['/']);
    }
  }

  logout() {
    this.loggedIn.next(false);
    window.sessionStorage.clear();
    window.location.reload();
    setInterval(() => {
      this.router.navigate(['/login']);
    }, 3000);
  }

  isUserLoggedIn() {
    if (sessionStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }
  }

  public isAdmin(): boolean {
    let status = false;
    let user = this.getRole();
    if (user === "ADMIN_ROLE" || user === "RECRUITER_ROLE") {
      status = true;
    }
    else {
      status = false;
    }
    return status;
  }

  public getEmail(): string {
    let token = window.sessionStorage.getItem('token');
    let tokenData = this.jwtHelper.decodeToken(token ?? "");

    return tokenData.email;
  }

  public getRole(): string {
    let token = window.sessionStorage.getItem('token');
    let tokenData = this.jwtHelper.decodeToken(token ?? "");

    return tokenData.roles.role;
  }
}
