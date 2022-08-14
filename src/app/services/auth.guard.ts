  import { Injectable } from '@angular/core';
  import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';

@Injectable({
     providedIn: 'root'
  })
  export class AuthGuard implements CanActivate {
    constructor(private router: Router) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      if (this.isLoggedIn()) {
        return true;
      }
        // navigate to login page as user is not authenticated
      this.router.navigate(['/login']);
      return false;
  }
  public isLoggedIn(): boolean {
    let status = false;
      if (sessionStorage.getItem('token')) {
        status = true;
      }
      else {
        status = false;
      }
     return status;
  }

  public autoLogOut(timeExpire: number) {
    setTimeout(() => {
      this.logout();
    }, timeExpire)
  }

  public logout() {
    localStorage.removeItem("token");
    this.router.navigate(["/login"]);
  }
}