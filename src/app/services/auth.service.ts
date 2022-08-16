import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from '../model/interface';

@Injectable()
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(
    private router: Router
  ) {}

  login(user: User){
    if (user.userName !== '' && user.password !== '' ) {
      this.loggedIn.next(true);
      this.router.navigate(['/']);
    }
  }

  logout() {
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
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
    let user = "ADMIN_ROLE";
    if (user === "ADMIN_ROLE" || user === "RECRUITER_ROLE") {
        status = true;
      }
      else {
        status = false;
      }
     return status;
  }
}
