import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthGuard } from './services/auth.guard';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'dashboard';
  isLoggedIn$!: Observable<boolean>;
  userRole!: string;

  constructor(
    private authService: AuthService,
    private authGuard: AuthGuard
  ) { }


  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn;
    this.userRole = this.authService.getRole();
    console.log(this.userRole);

  }

  loginStatus: boolean = this.authGuard.isLoggedIn();

  onLogout() {
    this.authService.logout();
  }


}
